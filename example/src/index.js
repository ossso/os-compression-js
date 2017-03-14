!function() {
/**
 *  这里面你可以写很多注释
 *  反正压缩以后都会没有的
 */
var demo1 = function() {
    console.log('Demo1');
};
function demo2(cb) {
    console.log('Demo2');
    !!cb&&cb();
}

!function() {
    console.log('Demo3');
    demo2(function() {
        demo1();
    });
}();

}();