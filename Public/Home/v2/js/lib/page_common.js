/**
 * Created by Andy on 2015/4/27.
 * 通用脚本
 */


define(function (require, exports, module) {

    // 引用依赖
       var $         = require('jquery'),
       // balance   = UID ? require('./module_balance') : '',
		balance   = (UID && document.getElementById('head_balance')) ? require('./module_balance') : '',
        HB        = require('./module_hb_extend'),
        mSlideBox = require('./module_slide_box'),  //下拉框模块
        mAcc      = require('./module_accurate'),   //精确计算
        mNum      = require('./module_number'),    //数字处理
        mTip      = require('./module_tip'),
        mMsg      = require('./module_message'),
        C         = require('./module_cookie'),
        W         = require('./module_window'),
        P         = require('./module_placeholder'),
        DOM       = {},
        docHidden = 0,
        browserHidden,
        visibilityChange,
        DTD = $.Deferred();

        DOM['#head_nav']          = $('#head_nav');
        DOM['#doc_left_menu']     = $('#doc_left_menu');
        DOM['#message_slide_box'] = $('#message_slide_box');
        DOM['#head_balance']      = $('#head_balance');
        DOM['#flaunt']            = $('#flaunt');
        DOM['#message_slide']     = $('#message_slide');
        DOM['#top_msg_list']      = $('#top_msg_list');
        DOM['#list_hd']           = $('#list_hd');
        DOM['#head_notice']       = $('#head_notice');
        DOM['#close_notice']      = $('#close_notice');
        GLOBAL['flaunt']          = 1;
        GLOBAL['docHidden']       = docHidden;


        //Document Hidden
        if (typeof document.hidden !== "undefined") {
            browserHidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.mozHidden !== "undefined") {
            browserHidden = "mozHidden";
            visibilityChange = "mozvisibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            browserHidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            browserHidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }
        function handleVisibilityChange() {
            if (document[browserHidden]) {
                docHidden = 1;
            } else {
                docHidden = 0;
            }
            GLOBAL['docHidden'] = docHidden;
            $(document).trigger('DoDocHidden')
        }
        if (typeof document.addEventListener !== "undefined" || typeof document[browserHidden] !== "undefined") {
            document.addEventListener(visibilityChange, handleVisibilityChange, false);
        }



    //共享到HUOBI
    HUOBI.CONST = CONST;
    HUOBI.GLOBAL= GLOBAL;
    HUOBI.DOM = DOM;
    //页头弹层
    var _dMenu = $('.menu'),
        _dMask = $('.mask');

    _dMenu.click(function(){
        _dMask.is(':hidden') ? _dMask.show() : _dMask.hide()
    });

    //RapidWrite
    function RapidWrite(options, callback) {
        var _input = options["input"],
            _count = _input.attr('data-write').split(','), /*要写入的元素选择器，运算，数值*/
            _output = $(_count[0]),
            _result;

        switch (_count[1]) {
            case '+':
                _result = _input.val() * 1 ? mAcc.Add(_input.val() * 1, _count[2] * 1) : _count[2] * 1;
                break;
            case 'country':
                _result = _input.val().replace('00', '+');
                break;
            default:
                _result = _input.val();
        }

        _output.html(_result).val(_result);
    }

    var docReadAll = DOM["#message_slide_box"].find('.read_all');

    //用户信息下拉框
    mSlideBox({trigger: '#user_slide', box: '#user_slide_box', event: 'hover',position:'right'});

    //用户消息下拉框
    mSlideBox({trigger: '#message_slide', box: '#message_slide_box', position: 'right', event: 'hover'},function(box,type){
        if(type==='down'){
            mMsg.GetMsg({temp:'top_msg_list_tmpl',wrap:'top_msg_list'},function(leg){
                var _leg = leg ? leg*1 : 0;
                _leg?docReadAll.show():docReadAll.hide();
            })
        }
    });

    //网站map导航下拉
    mSlideBox({trigger: '#menu_slide', box: '#menu_slide_box', position: 'right', event: 'hover'});

    //用户资产下拉条
    mSlideBox({trigger: '#head_balance', box: '#head_balance_box'});

    //顶部语言下拉
    mSlideBox({trigger: '#head_lang', box: '#head_lang_box', position: 'right', event: 'hover'})

    //语言下拉
    mSlideBox({trigger: '#slide_lang', box: '#slide_lang_box'},function(box,type){});

    //隐藏资产
    DOM['#flaunt'].on('click',function(){
        var _this = $(this);
        if(_this.attr('data-visible') !== 'none'){
            flaunt('hide');
            C.Cookie('flaunt',0, {path:'/', expires:36500, domain:COOKIE_DOMAIN});
        }else{
            flaunt('show');
            C.Cookie('flaunt',1, {path:'/', expires:36500, domain:COOKIE_DOMAIN});
        }

        return false
    });

    balance && $.when(balance(DTD,function(){
        DOM['#head_balance'].data('refresh') || HUOBI['AJAX']['GetBalance'].Stop();
    })).done(function(){
        C.Cookie('flaunt') == 0 ? flaunt('hide') : flaunt('show');
        DOM['#head_balance'].length > 0 && !docHidden ? HUOBI['AJAX']['GetBalance'].Play() : HUOBI['AJAX']['GetBalance'].Stop();

        $(document).on('DoDocHidden',function(){
            DOM['#head_balance'].length > 0 && !docHidden ? HUOBI['AJAX']['GetBalance'].Play() : HUOBI['AJAX']['GetBalance'].Stop();
        });
    });


    function flaunt(type){
        $('#doc_head').find('[data-flaunt]').each(function(){
            var _t = $(this);
            if(type === 'show'){
                _t.text(_t.attr('data-flaunt')).attr('data-flaunted','1').css({'font-weight':_t.attr('data-weight')||'400'});
                DOM['#flaunt'].attr('data-visible','visible')[0].className = 'icon_eye';
                GLOBAL['flaunt'] = 1;
            }else{
                _t.text('---').attr('data-flaunted','0').css({'font-weight':700});
                DOM['#flaunt'].attr('data-visible','none')[0].className = 'icon_close_eye';
                GLOBAL['flaunt'] = 0;
            }
        })
    }
    //关闭公告

    DOM['#close_notice'].on('click',function(){
        DOM['#head_notice'].is(':visible') && DOM['#head_notice'].hide()
    });
    // 读取公告
    if ($('#head_notice').length >= 1) {
        var lang = C.Cookie('lang');
        if (lang == null || lang == '') lang = 'zh_CN';
        if (lang == 'en') lang = 'en_US';
        $.ajax({
            cache : false,
            url : '/p/api/contents/top_notice?lang=' + lang.toLowerCase(),
            type : 'get',
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    var topNotice = data.data.top_notice;
                    if (topNotice != undefined) {
                        $('#head_notice .notice_info').show();
                        $('#head_notice .notice_info a').attr("href", topNotice.url);
                        $('#head_notice .notice_info span').html(topNotice.title);
                    } else {
                        $('#head_notice').hide();
                    }
                } else {
                    $('#head_notice').hide();
                }
            },
            error : function() {
                $('#head_notice').hide();
            }
        });
    }

    var _subNav;
    DOM['#head_nav'].find('li').hover(function(){
        _subNav = $(this);
        if(_subNav.find('.sub').length>0){
            _subNav.addClass('open')
        }
    },function(){
        _subNav&&_subNav.removeClass('open')
    });


    //语言切换
    $('#head_lang_box, #slide_lang').on('click','a',function(){
        var _this = $(this),
            _lang = _this.data('lang');
        // 清理 www 域下的 lang cookie，修正切换不了中英文的问题
        C.Cookie('lang','', {path:'/', expires:-1});
        C.Cookie('lang',_lang, {path:'/', expires:36500, domain:COOKIE_DOMAIN});
       // console.log(_lang)
        W.reload(1);
        return false
    });

    //读消息
    var readMsg = [];
    docReadAll.click(function(){
        readMsg = [];
        DOM['#top_msg_list'].find('li').each(function(i,c){
            readMsg.push($(this).data('ids'));
        });
        mMsg.ReadMsg({id:readMsg},function(data){
            if(data.code === 0){
                mMsg.GetMsg({temp:'top_msg_list_tmpl',wrap:'top_msg_list'},function(leg){
                    var _leg = leg ? leg*1 : 0;
                    if(_leg>0){
                        docReadAll.show()
                    }else{
                        DOM['#message_slide'].removeClass('top_msg_new');
                        docReadAll.hide();
                    }
                    DOM['#message_slide'].html(_leg);
                })
            }
        });
        return false
    });

    //-二级导航
    DOM['#doc_left_menu'].on('click', 'dt', function () {
        var _this = $(this),
            _name = _this.attr('data-name');

        if (_this.hasClass('cur')) {
            _this.removeClass('cur').next().removeClass('open');
             C.Cookie('nav_'+_name,'close',{ expires:300, path:'/'})
        } else {
            _this.find('a').length > 0 ? _this.addClass('cur open').siblings().removeClass('cur open') : _this.addClass('cur').siblings();
            _this.next('dd').addClass('open');
             C.Cookie('nav_'+_name,'open',{ expires:300, path:'/'})
        }
    });

    //格式化价格和数量
    InputFix({input:'.format_price',  decimal:2});
    InputFix({input:'.format_amount', decimal:4});

    //输出数字修正
    function InputFix(options){
        var _input  = $(options.input),
            decimal = (options.decimal || 2)*1,
            _reg    = new RegExp('^(([0-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,'+ decimal +'})?$');

        $(document).on('keyup', options.input, function () {
            var _t = $(this),
                _v = _t.val();
            if (_v != '' && !_reg.test(_v)) {
                _t.val(NumFix(_v, decimal))
            }
        });

        function NumFix(num, decimal) {
            var _num;
            if(/\.$/.test(num)){
                return mNum(num)
            }
             _num = mNum(num, decimal);
            return _num;
        }

    }

	// 有翻页的页面翻页后滚到列表位置
	if(DOM['#list_hd'].length > 0){
		if(location.href.match(/pn=\d+/)){
			$("html,body").animate({scrollTop:DOM['#list_hd'].offset().top}, 200);
		}
	}

    mTip({"tip": '.bind_tips'}, function (o,type) {
        //console.log(o[0])
    });

    $(".help_list li").mousemove(function(){
        var long = 104;
        if($(this).data("long")){
            long = 134;
        }
        $(this).find("span").stop().animate({"width":long+"px"},200);
    }).mouseout(function(){
        $(this).find("span").stop().animate({"width":"0px"},200);
    });

    function Udesk(){
        window.open("http://huobi.udesk.cn/im_client?cur_url=" + encodeURIComponent(location.href) + "&pre_url=" + encodeURIComponent
        (document.referrer), "udesk_im", "width=520,height=500,top=200,left=350,resizable=yes");
    }

    //
    $(document).click(function(e){
        var tar = e.target || window.event.srcElement,act = attFathers(tar,"action");
        if(act && act[1].toLowerCase() == "udesk"){
            if (e && e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            } else {
                window.event.cancelBubble = true;
                window.event.returnValue = false;
            }
            Udesk();
        }
    });
    function attFathers(n, a) {
        if (!n || !a || !n.parentNode) return null;
        if (n.getAttribute(a)) {
            return [n,n.getAttribute(a)];
        }
        return attFathers(n.parentNode, a);
    }


    //新手礼
    var novicel = C.Cookie('novice'+UID);
    if(novicel == null){
        $(".gift_01").show();
        $(".gift_02").hide();
    }else{
        $(".gift_02").show();
    }
    $(".fixed_novice").mousemove(function(){
        $(".gift_01").show();
        $(".gift_02").hide();
    }).mouseout(function(){
        //$(".gift_02").css('display','block');
        //$(".gift_01").css('display','none');
    });
    $(".fixed_novice .close").click(function(){
        $(".gift_01").hide();
        $(".gift_02").show();
        C.Cookie('novice'+UID,1,{path:'/', expires:36500, domain:COOKIE_DOMAIN});
    });

    //初始化PlaceHolder
    P();

    //快速写入
    exports.RapidWrite  = RapidWrite;
});
