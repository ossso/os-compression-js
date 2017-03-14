const fs = require('fs');
const path = require('path');
const uglifyjs = require("uglify-js");
const dateFormat = require('dateformat');
const crypto = require('crypto');
let md5 = function(str) {
    let md5 = crypto.createHash('md5');
    md5.update(str);
    return md5.digest('hex');
}

/**
 * 压缩JS小工具
 * start方法传入options自动读取文件和文件夹下内容
 * single方法传入options压缩指定文件
 * 自动记录操作日志 保存目录__dirname/logs/
 */
class OSCompressionJS {
    constructor() {
        this.data = {};
        this.status = {};
        this.path = __dirname;

        this.data.filePath = {};
        this.data.num = 0;
        this.data.write = 0;
        this.data.write_success = 0;

        // 默认参数
        this.set = {
            src: 'src', // 源文件夹
            build: 'dist', // 压缩文件夹
            exclude: false, // 跳过文件数组，需要相对路径
            buildExclude: false, // 跳过文件单独编译的对象，参考example/auto_3
            random: true, // 是否生成随机的文件夹
            name: 'OSCompressionJS', // 项目名称
            author: '橙色阳光', // 项目作者
        };

        this.data.log = [];
    }

    /**
 	 * 启动全局读取压缩
     * @param {object} options 运行配置，参考this.set
     */
    start(options) {
        this.set = Object.assign({},this.set,options);
        this.log('------------------');
        this.log('压缩:'+this.set.src);
        let now = new Date();
        let date = dateFormat(now,"yyyy/mm/dd HH:MM:ss");
        this.log('时间:'+date);
        this.log('------------------');
        if (this.set.random) {
            let buildRandomName = (this.set.buildPre || '') + md5(date).toString().slice(0,6);
            this.log('Build Random Name:'+buildRandomName);
            this.set.build = path.join(this.set.build,buildRandomName);
        }
        this.loadPath()
            .buildExclude();
    }

    /**
     * 递归分析路径与文件
     * 递归查询路径是否为文件夹，如果是就继续往下找
     * @param  {string} loadpath 判断路径
     * @param  {string} pathname 文件名 - 用于编译与日志
     */
    loadFilePath(loadpath,pathname) {
        let _this = this;
        fs.readdir(loadpath,function(err,files) {
            if (err) throw new Error(err);
            for (let i = 0, n = files.length; i < n; i++) {
                let paths = path.join(loadpath,files[i]);
                // 判断路径是不是文件夹
                if (fs.statSync(paths).isDirectory()) {
                    _this.loadFilePath(paths,path.join(pathname,files[i]));
                } else {
                    // 跳过非JS文件
                    if (files[i].lastIndexOf('.js') != files[i].length - 3) continue;
                    let filename = path.join(pathname,files[i]);
                    // 设置的主动跳过文件
                    if (_this.exclude(filename)) continue;
                    _this.data.num++;
                    _this.log('No.'+_this.data.num+' Find File: '+filename);
                    // 读取文件，并压缩
                    _this.readFile(path.join(loadpath,files[i]),filename);
                }
            }
        });
        return this;
    }

    /**
     * 读取路径启动
     */
    loadPath() {
        let loadpath = path.join(this.path,this.set.src);
        this.loadFilePath(loadpath,'');
        return this;
    }

    /**
     * 压缩js
     * @param  {string} code     压缩数据
     * @param  {string} filename 文件名
     */
    compression(code,filename) {
        let result = uglifyjs.minify(code,{
            fromString: true
        });
        if (result.code) {
            let pathname = path.join(this.set.build,filename);
            this.write(result.code,pathname,filename);
            let scale = parseFloat((1-result.code.length/code.length)*100).toFixed(2)+'%';
            this.log('UglifyJS File: '+filename+'\n 原大小:'+code.length+'\n 压缩后:'+result.code.length+'\n 压缩率:'+scale);
        } else {
            this.log('压缩失败:'+filename);
        }
        return this;
    }

    /**
     * 读取文件，并执行压缩
     * @param  {string} paths    路径
     * @param  {string} filename 文件名
     */
    readFile(paths,filename) {
        let _this = this;
        fs.readFile(paths,'utf8',function(err,data) {
            if (err) console.log(err);
            _this.compression(data,filename);
        });
        return this;
    }

    /**
     * 查询是否跳过
     * @param  {string} filename 文件名
     */
    exclude(filename) {
        if (this.set.exclude) {
            return (this.set.exclude.indexOf(filename) > -1);
        }
        return false;
    }

    /**
     * 单独执行压缩的文件，多用于跳过的文件
     */
    buildExclude() {
        if (this.set.buildExclude) {
            let list = this.set.buildExclude;
            for (let i = 0, n = list.length; i < n; i++) {
                let paths = path.join(this.path,this.set.src,list[i].src);
                if (fs.existsSync(paths)) {
                    let filename = list[i].build.replace(/\[hash\]/g,md5(list[i].build+(new Date()).getTime()));
                    this.readFile(paths,filename);
                } else {
                    this.log('Path:['+list[i].src+']不存在');
                }
            }
        }
        return this;
    }

    /**
     * 压缩一个或者少量的几个js文件
     * @param {object} options 配置
     * @param {string} options.src 源文件夹
     * @param {string} options.build 压缩文件夹
     * @param {array} options.files 压缩文件数组
     */
    single(options) {
        this.set.src = options.src;
        this.set.build = options.build;
        for (let i = 0, n = options.files.length; i < n; i++) {
            let paths = path.join(this.path,this.set.src,options.files[i]);
            // 判断路径是不是文件夹
            if (fs.statSync(paths).isDirectory()) {
            	this.loadFilePath(paths,options.files[i]);
            } else {
                this.readFile(paths,options.files[i]);
            }
        }
        return this;
    }

    /**
     * 写文件 默认以覆盖的方式
     * @param {string} content 内容
     * @param {string} pathname 存放路径 需要完整路径
     * @param {string} oldname 源文件名 用于日志
     */
    write(content,pathname,oldname) {
        this.data.write++;
        let _this = this;
        let savepath = path.join(this.path,pathname);
        let now = new Date();
        let date = dateFormat(now,"yyyy/mm/dd HH:MM:ss");
        let _path = path.parse(pathname).base;
        let banner = '/**\n * '+_path+' \n * '+this.set.name+' Script Modules Compression To: '+date+'\n * Author By '+this.set.author+' \n * Powered By OSCompressionJS & UglifyJS \n */\n';
        content = banner + content;
        this.handlerPath(savepath);
        fs.writeFile(savepath,content,{flag: 'w'},function(err) {
            if (err) {
                _this.log(err);
                return;
            }
            _this.log('write['+savepath+']');
            _this.data.write_success++;
            _this.log_save();
        });
        return this;
    }

    /**
     * 处理实际文件路径，生成对应的文件夹
     * @param  {string} dir
     */
    handlerPath(dir) {
        let judgePath = function(_path,cb) {
            let paths = path.parse(_path);
            if (!fs.existsSync(paths.dir)) {
                judgePath(paths.dir,function() {
                    fs.mkdirSync(paths.dir)
                });
            }
            if (typeof cb === 'function') {
                cb();
            }
        }
        judgePath(dir);
        return this;
    }

    /**
     * 记录Log
     * @param  {string} msg
     */
    log(msg) {
        console.log(msg);
        this.data.log.push(msg);
        return this;
    }


    /**
     * 日志保存，自动保存在当前目录的log中
     */
    log_save() {
        if (this.data.write != this.data.write_success) return this;
        this.log('-----end save-----');
        let content = this.data.log.join("\n")+"\n\n";
        let now = new Date();
        let date = dateFormat(now,"yyyy-mm-dd");
        let savepath = path.join(this.path,'./logs','./log_'+date+'.txt');
        this.handlerPath(savepath);
        fs.writeFile(savepath,content,{flag: 'a'},function(err) {
            if (err) console.log(err);
        });
        return this;
    }
}

// 对外暴露
module.exports = function(options) {
    if (typeof options === 'undefined') {
        return OSCompressionJS;
    }
    let auto = new OSCompressionJS();
    auto.start(options);
    return auto;
};
