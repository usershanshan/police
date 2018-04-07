/**
 * Created by andyk on 2015/8/14.
 */
;(function(){
    if(!window.HUOBI){
        window.HUOBI = {};
    }
   var HuobiExtend = function (option){
        var _option = option || {},
            _name   = _option.name,
            _value  = _option.value;
        if(HUOBI[_name]){
            $.extend(HUOBI[_name],_value)
        }else{
            HUOBI[_name]={};
            $.extend(HUOBI[_name],_value)
        }
    };

    "function" == typeof define ? define(function() {
        return HuobiExtend
    }) : "undefined" != typeof exports ? module.exports = HuobiExtend : window.HuobiExtend = HuobiExtend;
})();
