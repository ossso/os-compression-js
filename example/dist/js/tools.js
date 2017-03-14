/**
 * tools.js 
 * Auto2 Script Modules Compression To: 2017/03/14 18:15:18
 * Author By Auto Demo 
 * Powered By OSCompressionJS & UglifyJS 
 */
!function(){var t=function(t){this.options=t,this.dom={};for(var e in t.dom)this.dom[e]=this.getNode(t.dom[e]);this.data={},this.hex={a:10,b:11,c:12,d:13,e:14,f:15},this.init()};t.prototype.getNode=function(t){var e=document.querySelectorAll(t);return 1==e.length?e[0]:e},t.prototype.init=function(){var t=this;return this.dom.rgb2hex.addEventListener("click",function(){t.handler("rgb")},!1),this.dom.hex2rgb.addEventListener("click",function(){t.handler("hex")},!1),this},t.prototype.handler=function(t){if("rgb"==t){if(!/\d{0,3}/.test(this.dom.rgb_r.value)||0==this.dom.rgb_r.value.length||this.dom.rgb_r.value>255||this.dom.rgb_r.value<0)return this.tips("R值不合法"),this;if(!/\d{0,3}/.test(this.dom.rgb_g.value)||0==this.dom.rgb_g.value.length||this.dom.rgb_g.value>255||this.dom.rgb_g.value<0)return this.tips("G值不合法"),this;if(!/\d{0,3}/.test(this.dom.rgb_b.value)||0==this.dom.rgb_b.value.length||this.dom.rgb_b.value>255||this.dom.rgb_b.value<0)return this.tips("B值不合法"),this;_rgb=[],_rgb.push(this.dom.rgb_r.value),_rgb.push(this.dom.rgb_g.value),_rgb.push(this.dom.rgb_b.value),this.rgb_hex(_rgb)}else{if(0==this.dom.hex.value.length)return this.tips("HEX值不合法"),this;if(_hex=this.dom.hex.value,_hex.indexOf("#")>-1&&(_hex=_hex.split("#")[1]),/[^0-9a-fA-F]/.test(_hex))return this.tips("HEX值不合法"),this;if(3!=_hex.length&&6!=_hex.length)return this.tips("HEX值不合法"),this;if(3==_hex.length){var e=_hex.split("");_hex="",_hex+=e[0].toString()+e[0].toString(),_hex+=e[1].toString()+e[1].toString(),_hex+=e[2].toString()+e[2].toString()}this.hex_rgb(_hex)}return this},t.prototype.rgb_hex=function(t){for(var e=[],i=0,r=t.length;i<r;i++){var h=Math.floor(t[i]/16),o=t[i]%16;e[2*i]=h.toString(16).toUpperCase(),e[2*i+1]=o.toString(16).toUpperCase()}return this.dom.hex.value="#"+e.join(""),this.dom.color.style.background=this.dom.hex.value,this},t.prototype.hex_rgb=function(t){t=t.split("");for(var e=0,i=t.length;e<i;e++)/\D/.test(t[e])&&(t[e]=this.hex[t[e].toString().toLowerCase()]);var r=[];return r.push(16*t[0]+parseInt(t[1])),r.push(16*t[2]+parseInt(t[3])),r.push(16*t[4]+parseInt(t[5])),this.dom.rgb_r.value=r[0],this.dom.rgb_g.value=r[1],this.dom.rgb_b.value=r[2],this.dom.hex.value.indexOf("#")>-1?this.dom.color.style.background=this.dom.hex.value:this.dom.color.style.background="#"+this.dom.hex.value,this.dom.rgb.value="rgb("+r.join(",")+")",this},t.prototype.tips=function(t){try{layer.msg(t)}catch(e){alert(t)}return this},"function"==typeof define&&define.amd?define("rgb2hex",[],function(){return t}):"function"==typeof define&&define.cmd?define("rgb2hex",[],function(e,i,r){r.exports=t}):"undefined"!=typeof module?module.exports=t:"undefined"!=typeof layui&&"function"==typeof layui.define?layui.define(function(e){e("rgb2hex",t)}):window.RGB2HEX=t}();