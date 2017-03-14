;(function() {
    var RGB2HEX = function(options) {
        this.options = options;
        this.dom = {};
        for (var i in options.dom) {
            this.dom[i] = this.getNode(options.dom[i])
        }
        this.data = {};
        this.hex = {
            "a":10,
            "b":11,
            "c":12,
            "d":13,
            "e":14,
            "f":15
        };
        this.init();
    };

    RGB2HEX.prototype.getNode = function(selector) {
        var _eles = document.querySelectorAll(selector);
        if (_eles.length == 1) {
            return _eles[0];
        }
        return _eles;
    };

    RGB2HEX.prototype.init = function() {
        var that = this;
        this.dom.rgb2hex.addEventListener('click',function() {
            that.handler('rgb');
        },false);
        this.dom.hex2rgb.addEventListener('click',function() {
            that.handler('hex');
        },false);
        return this;
    };

    RGB2HEX.prototype.handler = function(type) {
        if (type == 'rgb') {
            if (!/\d{0,3}/.test(this.dom.rgb_r.value) || this.dom.rgb_r.value.length == 0 || this.dom.rgb_r.value > 255 || this.dom.rgb_r.value < 0) {
                this.tips('R值不合法');
                return this;
            } else if (!/\d{0,3}/.test(this.dom.rgb_g.value) || this.dom.rgb_g.value.length == 0 || this.dom.rgb_g.value > 255 || this.dom.rgb_g.value < 0) {
                this.tips('G值不合法');
                return this;
            } else if (!/\d{0,3}/.test(this.dom.rgb_b.value) || this.dom.rgb_b.value.length == 0 || this.dom.rgb_b.value > 255 || this.dom.rgb_b.value < 0) {
                this.tips('B值不合法');
                return this;
            }
            _rgb = [];
            _rgb.push(this.dom.rgb_r.value);
            _rgb.push(this.dom.rgb_g.value);
            _rgb.push(this.dom.rgb_b.value);
            this.rgb_hex(_rgb);
        } else {
            if (this.dom.hex.value.length == 0) {
                this.tips('HEX值不合法');
                return this;
            } else {
                _hex = this.dom.hex.value;
                if (_hex.indexOf('#') > -1) {
                    _hex = _hex.split('#')[1];
                }
                if (/[^0-9a-fA-F]/.test(_hex)) {
                    this.tips('HEX值不合法');
                    return this;
                }
                if (_hex.length != 3 && _hex.length != 6) {
                    this.tips('HEX值不合法');
                    return this;
                }
                if (_hex.length == 3) {
                    var _arr = _hex.split('');
                    _hex = '';
                    _hex += _arr[0].toString() + _arr[0].toString();
                    _hex += _arr[1].toString() + _arr[1].toString();
                    _hex += _arr[2].toString() + _arr[2].toString();
                }
                this.hex_rgb(_hex);
            }
        }

        return this;
    };

    RGB2HEX.prototype.rgb_hex = function(_rgb) {
        var _hex = [];
        for (var i = 0, n = _rgb.length; i < n; i++) {
            var _v1 = Math.floor(_rgb[i]/16);
            var _v2 = _rgb[i]%16;
            _hex[i*2] = _v1.toString(16).toUpperCase();
            _hex[i*2+1] = _v2.toString(16).toUpperCase();
        }
        this.dom.hex.value = '#'+_hex.join('');
        this.dom.color.style.background = this.dom.hex.value;
        return this;
    };

    RGB2HEX.prototype.hex_rgb = function(_hex) {
        _hex = _hex.split('');
        for (var i = 0, n = _hex.length; i < n; i++) {
            if (/\D/.test(_hex[i])) {
                _hex[i] = this.hex[_hex[i].toString().toLowerCase()];
            }
        }
        var _rgb = [];
        _rgb.push(_hex[0]*16+parseInt(_hex[1]));
        _rgb.push(_hex[2]*16+parseInt(_hex[3]));
        _rgb.push(_hex[4]*16+parseInt(_hex[5]));
        this.dom.rgb_r.value = _rgb[0];
        this.dom.rgb_g.value = _rgb[1];
        this.dom.rgb_b.value = _rgb[2];
        if (this.dom.hex.value.indexOf('#') > -1) {
            this.dom.color.style.background = this.dom.hex.value;
        } else {
            this.dom.color.style.background = '#'+this.dom.hex.value;
        }
        this.dom.rgb.value = 'rgb('+_rgb.join(',')+')';
        return this;
    };

    RGB2HEX.prototype.tips = function(msg) {
        try {
            layer.msg(msg);
        } catch (e) {
            alert(msg);
        }
        return this;
    };

    /**
     * (AMD & CMD compatible)
     * @module zbp
     */
    if (typeof define === "function" && define.amd) {
        define("rgb2hex", [], function() {
            return RGB2HEX;
        });
    } else if (typeof define === "function" && define.cmd) {
        define("rgb2hex", [], function(require, exports, module) {
            module.exports = RGB2HEX;
        });
    } else if (typeof module !== "undefined") {
        module.exports = RGB2HEX;
    } else if (typeof layui !== 'undefined' && typeof layui.define === 'function') {
        layui.define(function(exports) {
            exports('rgb2hex', RGB2HEX);
        });
    } else {
        window.RGB2HEX = RGB2HEX;
    }
})();
