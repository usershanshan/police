$(function () {
    var ie6 = /msie 6/i.test(navigator.userAgent)
    , dv = $('.top-nav'), st;
    dv.attr('otop', dv.offset().top); //存储原来的距离顶部的距离
    $(window).scroll(function () {
        st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
        if (st >= parseInt(dv.attr('otop'))) {
            if (ie6) {//IE6不支持fixed属性，所以只能靠设置position为absolute和top实现此效果
                dv.css({ position: 'absolute', top: st });
            }
            else if (dv.css('position') != 'fixed') dv.css({ 'position': 'fixed', top: 0 , });
        } else if (dv.css('position') != 'static') dv.css({ 'position': 'static' });
    });
});


// 判断导航条上下 
function scroll( fn ) {
    var beforeScrollTop = document.documentElement.scrollTop,
        fn = fn || function() {};
    window.addEventListener("scroll", function() {
        var afterScrollTop = document.body.scrollTop,
            delta = afterScrollTop - beforeScrollTop;
        if( delta === 0 ) return false;
        fn( delta > 0 ? "down" : "up" );
        beforeScrollTop = afterScrollTop;
    }, false);
}
// 判断设备
var ua = navigator.userAgent.toLocaleLowerCase();
var pf = navigator.platform.toLocaleLowerCase();
var isAndroid = (/android/i).test(ua)||((/iPhone|iPod|iPad/i).test(ua) && (/linux/i).test(pf))
    || (/ucweb.*linux/i.test(ua));
var isIOS =(/iPhone|iPod|iPad/i).test(ua) && !isAndroid;
var isWinPhone = (/Windows Phone|ZuneWP7/i).test(ua);

var mobileType = {
    pc:!isAndroid && !isIOS && !isWinPhone,
    ios:isIOS,
    android:isAndroid,
    winPhone:isWinPhone
};
$(document).ready(function () {
    $(window).scroll(function () {
        var a = document.getElementById("eq").offsetTop;
        if (a >= $(window).scrollTop() && a < ($(window).scrollTop()+$(window).height())) {
                // console.log("div在可视范围");
                if(mobileType.pc==true){
                	scroll(function(direction) { 
                        if(direction=="down"){
                            var eqTop = $('#eq').position().top;
                                eqTop=eqTop-0.2;
                                if(eqTop<=-50){
                                    $('#eq').css('top',-50+'px');
                                }else{
                                    $('#eq').css('top',eqTop+'px');

                                }
                                
                                // console.log(eqTop);
                        }else{
                            var eqTop = $('#eq').position().top;
                            eqTop=eqTop+0.2;
                            if(eqTop>=700){
                                $('#eq').css('top',700+'px');
                            }else{
                                $('#eq').css('top',eqTop+'px'); 
                            }
                            
                            // console.log(eqTop+'px');
                        }
                        // console.log(direction) 
                    });
                }else{
                	scroll(function(direction) { 
                        if(direction=="down"){
                            var eqTop = $('#eq').position().top;
                                eqTop=eqTop-0.1;
                                if(eqTop<=100){
                                    $('#eq').css('top',100+'px');
                                }else{
                                    $('#eq').css('top',eqTop+'px');

                                }
                                
                                // console.log(eqTop);
                        }else{
                            var eqTop = $('#eq').position().top;
                            eqTop=eqTop+0.1;
                            if(eqTop>=190){
                                $('#eq').css('top',190+'px');
                            }else{
                                $('#eq').css('top',eqTop+'px'); 
                            }
                            
                            // console.log(eqTop+'px');
                        }
                        // console.log(direction) 
                    });
                }
            }
        });
});


$(document).ready(function () {
    $(window).scroll(function () {
        var a = document.getElementById("eq2").offsetTop;
        if (a >= $(window).scrollTop() && a < ($(window).scrollTop()+$(window).height())) {
                // console.log("div在可视范围");
                if(mobileType.pc==true){
                	scroll(function(direction) { 
                        if(direction=="down"){
                            var eqTop = $('#eq2').position().top;
                                eqTop=eqTop-0.1;
                                if(eqTop<=500){
                                    $('#eq2').css('top',500+'px');
                                }else{
                                    $('#eq2').css('top',eqTop+'px');

                                }
                                
                                // console.log(eqTop);
                        }else{
                            var eqTop = $('#eq2').position().top;
                            eqTop=eqTop+0.1;
                            if(eqTop>=1500){
                                $('#eq2').css('top',1500+'px');
                            }else{
                                $('#eq2').css('top',eqTop+'px'); 
                            }
                            
                            // console.log(eqTop+'px');
                        }
                        // console.log(direction) 
                    });
                }else{
                	scroll(function(direction) { 
                        if(direction=="down"){
                            var eqTop = $('#eq2').position().top;
                                eqTop=eqTop-0.1;
                                if(eqTop<=160){
                                    $('#eq2').css('top',160+'px');
                                }else{
                                    $('#eq2').css('top',eqTop+'px');

                                }
                                
                                // console.log(eqTop);
                        }else{
                            var eqTop = $('#eq2').position().top;
                            eqTop=eqTop+0.1;
                            if(eqTop>=350){
                                $('#eq2').css('top',350+'px');
                            }else{
                                $('#eq2').css('top',eqTop+'px'); 
                            }
                            
                            // console.log(eqTop+'px');
                        }
                        // console.log(direction) 
                    });
                }
            }
        });
});

$(document).ready(function () {
    $(window).scroll(function () {
        var a = document.getElementById("eq3").offsetTop;
        if (a >= $(window).scrollTop() && a < ($(window).scrollTop()+$(window).height())) {
                // console.log("div在可视范围");
                if(mobileType.pc==true){
                	scroll(function(direction) { 
                        if(direction=="down"){
                            var eqTop = $('#eq3').position().top;
                                eqTop=eqTop-0.2;
                                if(eqTop<=-50){
                                    $('#eq3').css('top',-50+'px');
                                }else{
                                    $('#eq3').css('top',eqTop+'px');

                                }
                                
                                // console.log(eqTop);
                        }else{
                            var eqTop = $('#eq3').position().top;
                            eqTop=eqTop+0.2;
                            if(eqTop>=700){
                                $('#eq3').css('top',700+'px');
                            }else{
                                $('#eq3').css('top',eqTop+'px'); 
                            }
                            
                            // console.log(eqTop+'px');
                        }
                        // console.log(direction) 
                    });
                }else{
                	scroll(function(direction) { 
                        if(direction=="down"){
                            var eqTop = $('#eq3').position().top;
                                eqTop=eqTop-0.1;
                                if(eqTop<=80){
                                    $('#eq3').css('top',80+'px');
                                }else{
                                    $('#eq3').css('top',eqTop+'px');

                                }
                                
                                // console.log(eqTop);
                        }else{
                            var eqTop = $('#eq3').position().top;
                            eqTop=eqTop+0.1;
                            if(eqTop>=190){
                                $('#eq3').css('top',190+'px');
                            }else{
                                $('#eq3').css('top',eqTop+'px'); 
                            }
                            
                            // console.log(eqTop+'px');
                        }
                        // console.log(direction) 
                    });
                }
            }
        });
});


$(document).ready(function () {
    $(window).scroll(function () {
        var a = document.getElementById("eq4").offsetTop;
        if (a >= $(window).scrollTop() && a < ($(window).scrollTop()+$(window).height())) {
                // console.log("div在可视范围");
                if(mobileType.pc==true){
                	scroll(function(direction) { 
                        if(direction=="down"){
                            var eqTop = $('#eq4').position().top;
                                eqTop=eqTop-0.1;
                                if(eqTop<=500){
                                    $('#eq4').css('top',500+'px');
                                }else{
                                    $('#eq4').css('top',eqTop+'px');

                                }
                                
                                // console.log(eqTop);
                        }else{
                            var eqTop = $('#eq4').position().top;
                            eqTop=eqTop+0.1;
                            if(eqTop>=1500){
                                $('#eq4').css('top',1500+'px');
                            }else{
                                $('#eq4').css('top',eqTop+'px'); 
                            }
                            
                            // console.log(eqTop+'px');
                        }
                        // console.log(direction) 
                    });
                }else{
                	scroll(function(direction) { 
                        if(direction=="down"){
                            var eqTop = $('#eq4').position().top;
                                eqTop=eqTop-0.1;
                                if(eqTop<=160){
                                    $('#eq4').css('top',160+'px');
                                }else{
                                    $('#eq4').css('top',eqTop+'px');

                                }
                                
                                // console.log(eqTop);
                        }else{
                            var eqTop = $('#eq4').position().top;
                            eqTop=eqTop+0.1;
                            if(eqTop>=350){
                                $('#eq4').css('top',350+'px');
                            }else{
                                $('#eq4').css('top',eqTop+'px'); 
                            }
                            
                            // console.log(eqTop+'px');
                        }
                        // console.log(direction) 
                    });
                }
            }
        });
});


