!function() {
/**
 * 这只是一个Demo而已
 */
var demo = function(cb) {
    !!cb&&cb();
};

demo(function() {
    console.log('这只是一个Demo');
});
}();