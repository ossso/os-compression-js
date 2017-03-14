let auto = require('../index')({
    src: './example/src/', // 源文件路径
    build: './example/dist/js/', // 目标路径
    random: false, // 关闭随机文件夹
    name: 'Auto2', // 项目名称
    author: 'Auto Demo'
});