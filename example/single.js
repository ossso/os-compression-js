const OSCompressionJS = require('../index')();
new OSCompressionJS().single({
    src: './example/src/',
    build: './example/dist/single/',
    files: [
    	'index.js', // 支持文件夹
    	'tools.js'
    ]
});

// 指定文件就没有随机目录的生成