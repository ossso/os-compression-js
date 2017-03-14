let auto = require('../index')({
    src: './example/src/', // 源文件路径
    build: './example/dist/', // 目标路径
    buildPre: 'auto_', // 随机路径名前缀
    name: '模块名称' // 项目名称
});