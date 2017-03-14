# 压缩JS小工具
-------------
这是一个压缩JS文件的小工具，可以自动寻找指定目录下的所有JS，并通过UglifyJS进行压缩；  
当然，你也可以压缩一些指定的JS文件，通过简单的配置，即可使用；   
默认开启生成随机路径的配置，可以选择关闭，更多请参考example  

 - Node.js v6+

```bash
npm install
```


## 自动寻径配置  
```javascript
let auto = require('./index')({
    src: './src/', // 源文件路径
    build: './dist/', // 目标路径
    buildPre: 'pc_', // 随机路径名前缀
    name: '模块名称'
});
```


## 指定文件配置  
```javascript
const OSCompressionJS = require('./index')();
new OSCompressionJS().single({
    src: './src/',
    build: './dist/',
    files: [
    	'index.js',
    	'tools.js'
    ]
});
```