let auto = require('../index')({
    src: './example/src/', // 源文件路径 支持NodeJS路径规则
    build: './example/dist/', // 目标路径
    buildPre: 'auto_3_', // 随机的前缀
    random: true, // 是否随机文件夹
    name: 'Auto3',
    exclude: [ // 排除某个JS
        'demo.js'
    ],
    buildExclude: [ // 判读编译排除的
        {
            src: 'demo.js',
            build: 'demo.[hash].js'
        }
    ]
});