/**
 * Created by Andy on 2015/6/29.
 * ��Ԫ������ data-init-placeholder="true" ����
 */

;(function(){
    function InitPlaceHolders() {

        if ('placeholder' in document.createElement('input')) {
            /*����ie*/
            if(/trident/.test(window.navigator.userAgent.toLowerCase())){
                $(':text').each(function () {
                    var _p = $(this);
                    if(_p.prop('readonly') || _p.prop('disabled')){
                        _p.focus(function(){
                            _p.blur()
                        })
                    }
                });
            }
          return
        }

        var Ph_val = '',
            Txy = [],
            init = false,
            support = 'placeholder' in document.createElement('input');
        input_each();
        $('body').click(function(){
            input_each()
        });
        function input_each() {
            $('input').each(function () {
                var _t = $(this),
                    _h = _t.outerHeight(true),
                    _pl= _t.css('paddingLeft'),
                    _fs= _t.css('fontSize'),
                    _ti= _t.css('textIndent'),
                    _p = _t.parent();

                init = _t.data('init-placeholder');
                _p.css({"position": "relative"});
                if (_t.attr('placeholder') && init || !support) {
                    Txy = [_t.offset().top, _t.offset().left];
                    if(_t.attr('placeholder')){
                        Ph_val = _t.attr('placeholder');
                    }else{
                        Ph_val = '';
                    }
                    if(_t.prev('.placeholder').length<=0){
                        _t.before(function () {
                            return '<div class="placeholder" style="position: absolute;">' + Ph_val + '</div>'
                        });
                    }
                    if (_t.val() == '') {
                        _t.prev('.placeholder').css({'display':'inline-block', 'line-height':_h+'px', 'padding-left':_pl, 'font-size':_fs, 'text-indent':_ti})
                    } else {
                        _t.prev('.placeholder').hide()
                    }
                    _t.attr('placeholder', '');

                    _t.prev('.placeholder').click(function () {
                        _t.focus();
                    });
                    _t.bind('input onpropertychange change keyup focus blur', function () {
                            if (_t.val() != '') {
                                _t.prev('.placeholder').hide()
                            } else {
                                _t.prev('.placeholder').css({'display':'inline-block', 'line-height':_h+'px', 'padding-left':_pl, 'font-size':_fs, 'text-indent':_ti})
                            }
                        });
                }
            });
        }
    }

    "function" == typeof define ? define(function() {
        return InitPlaceHolders
    }) : "undefined" != typeof exports ? module.exports = InitPlaceHolders : window.InitPlaceHolders = InitPlaceHolders;

})();
