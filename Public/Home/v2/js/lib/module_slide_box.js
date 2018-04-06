/**
 * Created by Andy on 2015/4/28.
 */
;(function(){

    SlideBox  = function(option,callback){

        var domTig   = option.trigger ? $( option.trigger ) : '',
            domBox   = option.box ? $( option.box ) : '',
            position = option.position ? option.position : '',
            relative = option.relative ? option.relative : option.trigger,
            event    = option.event ? option.event : 'click',
            timeout  = null,
            control  = false;


        domTig.attr('data-widget',relative);
        domBox.attr('data-widget',relative);


        if( domTig && domBox ){
            event == 'hover' && domTig.hover(function(e){
                clearTimeout(timeout);
                timeout = null;
                control  = false;
                Slide(true)
            },function(){
                Timeout();
                $(document).on('mousemove',function(e){
                    control&&Event(e);
                })
            });
            event == 'click' && domTig.click(function(e){
                Slide();
                return false
            })
        }else{
            return
        }

        function Timeout(){
            timeout = setTimeout(function(){
                control = true;
            },50)
        }

        function Slide(o){
            if(domBox.is(':hidden')){
                Down()
            }else if(!o){
                Up();
            }
        }
        function Up(){
            domBox.slideUp(1,
                function(){
                    domTig.removeClass('cur');
                }
            );

        }
        function Down(){
            Position();
            domBox.slideDown(100);
            domTig.addClass('cur');
            callback&&callback(domBox,'down')
        }

        function Position(){
            var _x  = domTig.offset().left,
                _y  = domTig.offset().top,
                _w  = domTig.outerWidth(true),
                _h  = domTig.outerHeight(true),
                _bW = domBox.outerWidth(true),
                _bH = domBox.outerHeight(true);

            switch(position){
                case 'left':
                    domBox.css({
                        "left" : _x,
                        "top"     : _y + _h
                    });
                    break;
                case 'center':
                    domBox.css({
                        "left" : _x - _bW/2 + _w/2,
                        "top"     : _y + _h
                    });
                    break;
                case 'right':
                    domBox.css({
                        "left" : _x - _bW + _w,
                        "top"     : _y + _h
                    });
                    break;
                default :

            }

        }

        function Event(e){
            var eve  = e || window.event,
                elem = eve.target || eve.srcEvent,
                mark;
            while (elem) {
                mark = $(elem).attr('data-widget') && $(elem).attr('data-widget').indexOf(relative) > -1 ;
                if(mark){
                    return
                }
                elem = elem.parentNode;
            }
            Up();
        }
        $('body').on('click',function(e){
            Event(e);
        });
        $(window).resize(function(){
            Up();
        });
    };

    "function" == typeof define ? define(function() {
        return SlideBox
    }) : "undefined" != typeof exports ? module.exports = SlideBox : window.SlideBox = SlideBox;
})();