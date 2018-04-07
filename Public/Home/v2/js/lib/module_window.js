/**
 * Created by Andy on 2015/6/4.
 */
;(function(){
    var BitWindow = {
            //重载页面
            reload: function (n) {
                if (!n) n = 1000;
                setTimeout(function () {
                    location.reload();
                }, n);
            },
            //返回上一页
            history: function (n) {
                if (!n) n = -1;
                history.go(n)
            },
            //新窗口
           newWin : function(o){
               window.open(o.url, o.name, 'height='+ o.height||500 +',width='+ o.width || 600 +',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
           }
    };

    "function" == typeof define ? define(function() {
        return BitWindow
    }) : "undefined" != typeof exports ? module.exports = BitWindow : window.BitWindow = BitWindow;

})();