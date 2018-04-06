/**
 * 行情
 */

define(function(require, exports){

    var PC         = require('./page_common'),
        mAJAX = require('./module_ajax'),
        mNum = require('./module_number'),    //数字处理
        V  = require('./module_validator'),
        //SMSSender  = require('./module_sms_sender'), //短信
        BitCookie    = require('./module_cookie'),
        M = require('./module_md5'),
        dL = $('.form_market_login'),
        TmpL = require('./module_tmpl'),
        $_ws_hq_url_cny = "http://10.66.242.59:8080",//"https://hq.huobi.",
        $_ws_hq_url_usd = "https://hq.bityes.com",
        $_ws_hq_url_futures = "https://hq.bitvc.com",
        RATE = 0,
        SYMBOL_BTC = "btccny",
        SYMBOL_LTC = "ltccny",
        SYMBOL_LTC_USD = "ltcusd",
        SYMBOL_USD = "btcusd",
        SYMBOL_WEEK = "btccnyweek",
        SYMBOL_NEXT_WEEK = "btccnyweek2",
        SYMBOL_QUARTER = "btccnyquarter2";
    var BTC_NOW_PRICE_CNY = 0,
        BTC_NOW_PRICE_USD = 0,
        LTC_NOW_PRICE_CNY = 0,
        LTC_NOW_PRICE_USD = 0,
        BTC_NOW_PRICE_FUTURES = 0,
        BTC_NOW_PRICE_QUARTER = 0;
    var BTC_NOW_PRICE_OKCOIN = 0,
        BTC_NOW_PRICE_CHINA = 0,
        BTC_NOW_PRICE_BITSTAMP = 0,
        BTC_NOW_PRICE_BTCE = 0,
        BTC_NOW_PRICE_BITFINEX = 0,
        LTC_NOW_PRICE_OKCOIN = 0,
        LTC_NOW_PRICE_CHINA = 0,
        LTC_NOW_PRICE_BTCE = 0,
        LTC_NOW_PRICE_BITFINEX = 0;

    var connect = require('./module_connect');
    var io = require('./module_socket_io');
    require('./module_socket_api');
    require('./fl_key_map');
    require('./module_highcharts');
    require('./fl_lib_min');


    var BtnSubmit = '';
    //绑定表单验证器
    V({
        forms:dL,
        tip:'.form_tip',
        changes:function(obj){
            //console.log(obj);
            var _obj = $(obj),
                _group = $(obj).parents('.market_input_group');
            if(_obj.attr('data-write')){
                PC.RapidWrite({"input":_obj})
            }
            _group.find('.form_tip').hide();
            _group.find('.group_help').show();
            dL.find('[name="password"]').attr('data_md5',0);
            dL.find('[name="confirm_password"]').attr('data_md5',0);
        },
        beforeSubmit:function(_form){
            var _pwd = _form.find('[name="password"]'),
                _cPwd= _form.find('[name="confirm_password"]'),
                _btn      = _form.find(':submit');
            BtnSubmit = _btn.text();
            _btn.prop('disabled',true).text(L('请稍后...'));

            if(_pwd.attr('data_md5') != 1){
                _pwd.val(M.hbmd5(_pwd.val()));
                _pwd.attr('data_md5',1)
            }
            if(_cPwd.attr('data_md5') != 1) {
                _cPwd.val(M.hbmd5(_cPwd.val()));
                _cPwd.attr('data_md5',1)
            }
        },single: function (data) {
            var _obj = $(data[0]),
                _group = _obj.parent('.market_input_group'),
                _result = data[1];
            //console.log(_group.html());
            if (_result > 0) {
                _group.find('.form_tip').show();
               // _group.find('.group_help').hide()
            } else {
                _group.find('.form_tip').hide();
            }
        },
        callback:function(_data,_form){

            var _tip = _form.find('.form_tip'),
                _btn  = _form.find(':submit');
            _btn.prop('disabled',false).text(BtnSubmit);

            if(_data.code!=0){
                var _p = $('#by_phone'),
                    _v = $('#vcode_p'),
                    _c1 = $('#vcode1');
                _c2 = $('#vcode2');

                if(_data.code == 3){
                    _v.show()
                }
                _c1.attr('src',"/account/captcha?r=" + Math.random());
                _c2.attr('src',"/account/captcha?r=" + Math.random());
                if(_data.code == 15){
                    _tip.eq(2).html(_data.msg).addClass('v_error').show()
                }else{
                    _tip.eq(1).html(_data.msg).addClass('v_error').show()
                }

            } else {
                if(_data.url) {
                    //console.log(_data);
                    window.location.reload();
                }
            }
        }
    });

    $("#logout").click(function(){
        $.ajax({
            type: "post", async: false, cache: false, dataType: "json",
            url: '/account/logout.php',
            success: function (result) {
                if(result.code == 0){
                    window.location.reload();
                }
            }
        });
    });



    //RATE = getRate();
    var out_url = "http://10.66.242.59:8080/json/base.json";//PROTOCOL+"//www.huobi.com/pc/codes/exchange.do?codes=okcoinbtc,okcoinltc,chinabtc,chinaltc,bitstampbtc,btc-ebtc,btc-eltc,bitfinex_btc,bitfinex_ltc&currency2=cny";

/*
    $.ajax({
        type: "get", async: false, cache: false, dataType: "jsonp", 
        url: out_url,
        success: function (result) {
            //console.log(result);
            //s =  result.rate;
        }
    });
*/
    var t;
    var _GetRate;
    function getOut(){
        var r = null;
        /*
        $.getJSON(out_url+"&callback=?",function(json){
            RATE = json[0]['rate'];
            //console.log(json);
            //outMarket(json);
            var jsonlength = json.length;
            for(var i = 0; i<jsonlength; i++){
                outMarket1(json[i]);
            }
        });
        */
        
            _GetRate =  $.ajax({
            type: "get", async: false, cache: false, dataType: "json",
            url: out_url,
            success: function (result) {
                console.log(result);
                RATE =  result[1]['rate'];
                $(".rate").html(RATE);
                //console.log(RATE);
                var jsonlength = result.length;
                for(var i = 0; i<jsonlength; i++){
                    outMarket1(result[i]);
                }
            }
        });

        
        t = setTimeout(getOut, 3000);
    }
    getOut();
    function outMarket1(json){
        RATE =  json['rate'];
        var rose = 0,
            tmp_price,price_1,price_2,price_html,price_h_1,price_h_2,price_l_1,price_l_2;
        var coin_mark = "฿";
        //console.log(price_1);
        switch(json['code']){
            case "okcoinbtc":
                tmp_price = BTC_NOW_PRICE_OKCOIN;
                BTC_NOW_PRICE_OKCOIN = json['cprice'];
                break;
            case "chinabtc":
                tmp_price = BTC_NOW_PRICE_CHINA;
                BTC_NOW_PRICE_CHINA = json['cprice'];
                break;
            case "bitstampbtc":
                tmp_price = BTC_NOW_PRICE_BITSTAMP;
                BTC_NOW_PRICE_BITSTAMP = json['cprice'];
                break;
            case "btc-ebtc":
                tmp_price = BTC_NOW_PRICE_BTCE;
                BTC_NOW_PRICE_BTCE = json['cprice'];
                break;
            case "bitfinex_btc":
                tmp_price = BTC_NOW_PRICE_BITFINEX;
                BTC_NOW_PRICE_BITFINEX = json['cprice'];
                break;
            case "okcoinltc":
                tmp_price = LTC_NOW_PRICE_OKCOIN;
                LTC_NOW_PRICE_OKCOIN = json['cprice'];
                break;
            case "chinaltc":
                tmp_price = LTC_NOW_PRICE_CHINA;
                LTC_NOW_PRICE_CHINA = json['cprice'];
                break;
            case "btc-eltc":
                tmp_price = LTC_NOW_PRICE_BTCE;
                LTC_NOW_PRICE_BTCE = json['cprice'];
                break;
            case "bitfinex_ltc":
                tmp_price = LTC_NOW_PRICE_BITFINEX;
                LTC_NOW_PRICE_BITFINEX = json['cprice'];
                break;
        }

        var domList = $("#"+json['code']+"_list");
        //console.log(domList);

        if(json['oprice'] != null){
            rose = mNum((json['cprice'] - json['oprice'])/json['oprice']*100, 2);
        }
        //console.log(rose);
        if(rose != 0){

            if(rose > 0){
                domList.find(".rose").removeClass("market_red market_green");
                domList.find(".rose").addClass('market_red');
            }else{
                domList.find(".rose").removeClass("market_red market_green");
                domList.find(".rose").addClass('market_green');
            }
            domList.find(".rose").html(rose+"%");
        }
        //console.log(json);
        if(json['cprice2'] != 0){
            price_1 = mNum(json['cprice2'], 2);
            price_2 = mNum(json['cprice'], 2);
            price_h_1 = mNum(json['hprice']*RATE, 2);
            price_h_2 = mNum(json['hprice'], 2);
            price_l_1 = mNum(json['lprice']*RATE, 2);
            price_l_2 = mNum(json['lprice'], 2);
        }else{
            price_1 = mNum(json['cprice'], 2);
            price_2 = mNum(json['cprice']/RATE, 2);
            price_h_1 = mNum(json['hprice'], 2);
            price_h_2 = mNum(json['hprice']/RATE, 2);
            price_l_1 = mNum(json['lprice'], 2);
            price_l_2 = mNum(json['lprice']/RATE, 2);
        }
        if(json['cprice'] > tmp_price){
            price_html = '<em class="bg_red">¥'+price_1+' / $'+price_2+' <i class="icon_rose"></i></em>';

        }else if(json['cprice'] < tmp_price){
            price_html = '<em class="bg_green">¥'+price_1+' / $'+price_2+' <i class="icon_fall"></i></em>';
        }


        if(json['cprice'] > tmp_price){
            price_html = '<em class="bg_red"></em><em class="z_100"><span class="font_">¥'+price_1+'</span> / <span class="font_h">$'+price_2+'</span> <i class="icon_up"></i></em>';
            domList.find(".now_price").html(price_html);
            domList.find(".now_price").find("i").animate({top:'0',opacity:'1'},500);
            domList.find(".now_price").find(".bg_red").animate({opacity:'0'},1000);

        }else if(json['cprice'] < tmp_price){
            price_html = '<em class="bg_green"></em><em class="z_100"><span class="font_">¥'+price_1+'</span> / <span class="font_h">$'+price_2+'</span> <i class="icon_down"></i></em>';
            domList.find(".now_price").html(price_html);
            domList.find(".now_price").find("i").animate({top:'0',opacity:'1'},500);
            domList.find(".now_price").find(".bg_green").animate({opacity:'0'},1000);
        }else{
            domList.find(".now_price").find(".font_").html('¥'+price_1);
            domList.find(".now_price").find(".font_h").html('$'+price_2); 
        }

        domList.find(".high").html('¥'+price_h_1);
        domList.find(".low").html('¥'+price_l_1);

        if(price_1 < 500){
            coin_mark = "Ł";
        }
        //console.log(price_html);
        //domList.find(".now_price").html(price_html);
        //domList.find(".high").html('¥'+price_h_1+" / $"+price_h_2);
        //domList.find(".low").html('¥'+price_l_1+" / $"+price_l_2);
        domList.find(".total").html(coin_mark + " " + mNum(json['amount'], 2));
    }

    //console.log(RATE);
    var socketIsRunning = 1,
        socket_api = SOCKET_API(),
        over_btc_cny = socket_api['marketOverview'](SYMBOL_BTC),
        line_btc_cny = socket_api['reqKLine'](SYMBOL_BTC,"1min"),
        line_ltc_cny = socket_api['reqKLine'](SYMBOL_LTC,"1min"),
        line_btc_usd = socket_api['reqKLine'](SYMBOL_USD,"1min"),
        over_ltc_cny = socket_api['marketOverview'](SYMBOL_LTC),
        over_ltc_usd = socket_api['marketOverview'](SYMBOL_LTC_USD),
        over_btc_usd = socket_api['marketOverview'](SYMBOL_USD),
        over_btc_week = socket_api['marketOverview'](SYMBOL_WEEK),
        over_btc_next_week = socket_api['marketOverview'](SYMBOL_NEXT_WEEK),
        over_btc_quarter = socket_api['marketOverview'](SYMBOL_QUARTER),
        socket_cny = connect($_ws_hq_url_cny);
    //console.log(current_depth);
    socket_cny.msg(over_btc_cny.msg);
    socket_cny.reg(over_btc_cny.msgType, function(data) {
        if (data.symbolId == SYMBOL_BTC) {
            //console.log(data);
            pushMarketData(data.payload,'market_cny','cny');
            $("#price_cny").html("¥ "+mNum(data.payload.priceNew, 2));
        }
    });








var ti;
var AjaxUri  = CONST['PROTOCOL'] + '//' + CONST['AJAX_API_DOMAIN'];

var ajax_cny = new mAJAX({
        "type":'get',
        "data":{},        
        'url': 'http://10.66.242.59:8080/json/test.json',
        'refresh': 60000
    }, function (data) {
       // console.log("data : [ "+data+" ]");
        toPreFormat(data,"chart_cny","￥")
    }),
    ajax_usd = new mAJAX({
        "type":'get',
        "data":{},        
        'url':"http://10.66.242.59:8080/json/test11.json",//AjaxUri+'/usdmarket/btc_kline_001_json.js',
        'refresh': 60000
    }, function (data) {
        toPreFormat(data,"chart_usd","$")
    }),
    ajax_ltc = new mAJAX({
        "type":'get',
        "data":{},        
        'url':"http://10.66.242.59:8080/json/test.json",//AjaxUri+'/staticmarket/ltc_kline_001_json.js',
        'refresh': 60000
    }, function (data) {
        toPreFormat(data,"chart_cny_ltc","￥")
    }),
    ajax_usd_ow = new mAJAX({
        "type":'get',
        "data":{},        
        "datatype":"json",
        "url":"http://10.66.242.59:8080/json/test2.json",//AjaxUri+'/usdmarket/ticker_btc_json.js',
        "refresh": 2000
    }, function (data) {
        var _this;
            if (data.code == 'success') {
            _this = data.data;
                var d = {
                    "symbolId":"btcusd",
                    "priceNew":_this.ticker.last,
                    "priceOpen":_this.ticker.open,
                    "priceHigh":_this.ticker.high,
                    "priceLow":_this.ticker.low,
                    "priceAsk":_this.ticker.sell,
                    "priceBid":_this.ticker.buy,
                    "totalVolume":_this.ticker.vol,
                    "totalAmount":_this.ticker.vol
                    }
                
                _GetRate.then(function(){
                    pushMarketData(d,'market_usd','usd');
                    $("#price_usd").html("$ "+mNum(d.priceNew, 2));
                });
            }
    }),
    ajax_btc_ow = new mAJAX({
        "type":'get',
        "data":{},        
        "datatype":"json",
        "url":"http://10.66.242.59:8080/json/test2.json",//AjaxUri+'/staticmarket/ticker_btc_json.js',
        "refresh": 2000
    }, function (data) {
        var _this
            if (data.code == 'success') {
            _this = data.data;
                var d = {
                    "symbolId":"btccny",
                    "priceNew":_this.ticker.last,
                    "priceOpen":_this.ticker.open,
                    "priceHigh":_this.ticker.high,
                    "priceLow":_this.ticker.low,
                    "priceAsk":_this.ticker.sell,
                    "priceBid":_this.ticker.buy,
                    "totalVolume":_this.ticker.vol,
                    "totalAmount":_this.ticker.vol
                    }
                
                _GetRate.then(function(){
                    pushMarketData(d,'market_cny','cny');
                    $("#price_usd").html("$ "+mNum(d.priceNew, 2));
                });
            }
    }),
    ajax_ltc_ow = new mAJAX({
        "type":'get',
        "data":{},        
        "datatype":"json",
        "url":"http://10.66.242.59:8080/json/test2.json",//AjaxUri+'/staticmarket/ticker_ltc_json.js',
        "refresh": 2000
    }, function (data) {
        var _this
            if (data.code == 'success') {
            _this = data.data;
                var d = {
                    "symbolId":"ltccny",
                    "priceNew":_this.ticker.last,
                    "priceOpen":_this.ticker.open,
                    "priceHigh":_this.ticker.high,
                    "priceLow":_this.ticker.low,
                    "priceAsk":_this.ticker.sell,
                    "priceBid":_this.ticker.buy,
                    "totalVolume":_this.ticker.vol,
                    "totalAmount":_this.ticker.vol
                    }
                
                _GetRate.then(function(){
                    pushMarketData(d,'ltc_market_cny','ltc');
                    $("#price_usd").html("$ "+mNum(d.priceNew, 2));
                });
            }
    });

ajax_cny.Stop();
ajax_usd.Stop();
ajax_ltc.Stop();
ajax_usd_ow.Stop();
ajax_btc_ow.Stop();
ajax_ltc_ow.Stop();
function date2time(d){
    return new Date(d.substr(0,4),d.substr(4,2)-1,d.substr(6,2),d.substr(8,2),d.substr(10,2))*1;
}
function toPreFormat(data,key,syb){
    var cdata,d = {
            "symbolId": "btccny",
            "period": "1min",
            "time": [],
            "priceOpen":[],
            "priceHigh":[],
            "priceLow": [],
            "priceLast":[],
            "amount": [],
            "volume":[],
            "count": []
        }
    
    if (data.code == 'success') {
       
        //data.data = JSON.parse(data.data);
         console.log("++++++: "+data.data.length);
        for(var i = 0,l = data.data.length,_this;i < l;i++){
            _this = data.data[i];
            d.time.push(date2time(_this[0])/1000);
            d.priceOpen.push(_this[1]);
            d.priceHigh.push(_this[2]);
            d.priceLow.push(_this[3]);
            d.priceLast.push(_this[4]);
            d.volume.push(_this[5]);
            d.amount.push(12);
            d.count.push(16);
             console.log("xxxx: "+d.priceOpen);
        }
        cdata = formartChart({payload:d});
        console.log(">>>>>>: "+cdata);
        makeChart(key, cdata,syb);
    }
    
}

socket_cny.Daemon(function (d) {
    if (d >= 3000) {
       socketIsRunning = 0;
       ajax_cny.Play();
       ajax_usd.Play();
       ajax_ltc.Play();
       ajax_usd_ow.Play();
       ajax_btc_ow.Play();
       ajax_ltc_ow.Play();
    }else{
       socketIsRunning = 1;
       ajax_cny.Stop();
       ajax_usd.Stop();
       ajax_ltc.Stop();
       ajax_usd_ow.Stop();
       ajax_btc_ow.Stop();
       ajax_ltc_ow.Stop();
    }
});

if(socketIsRunning){


    function getLine(){
        //console.log(111)
        socket_cny.msg(line_btc_cny.msg);
        socket_cny.reg(line_btc_cny.msgType, function(data) {
            //console.log(data);
            var val = formartChart(data);

            if (data.payload.symbolId == SYMBOL_BTC) {
                makeChart('chart_cny', val, "￥");
            }
            if (data.payload.symbolId == SYMBOL_LTC) {
                var val = formartChart(data);
                makeChart('chart_cny_ltc', val, "￥");
            }
            if (data.payload.symbolId == SYMBOL_USD) {

                makeChart('chart_usd', val, "$");
            }
        });
        setTimeout(function(){
            socket_cny.msg(line_ltc_cny.msg);
            socket_cny.reg(line_ltc_cny.msgType, function(data) {
                //console.log(data);
                var val = formartChart(data);
                if (data.payload.symbolId == SYMBOL_LTC) {
                    makeChart('chart_cny_ltc', val, "￥");
                }
                if (data.payload.symbolId == SYMBOL_BTC) {
                    makeChart('chart_cny', val, "￥");
                }
                if (data.payload.symbolId == SYMBOL_USD) {
                    makeChart('chart_usd', val, "$");
                }
            });
        },300);
        setTimeout(function(){
            socket_cny.msg(line_btc_usd.msg);
            socket_cny.reg(line_btc_usd.msgType, function(data) {
                var val = formartChart(data);
                if (data.payload.symbolId == SYMBOL_USD) {
                    makeChart('chart_usd', val, "$");
                }
                if (data.payload.symbolId == SYMBOL_BTC) {
                    makeChart('chart_cny', val, "￥");
                }
                if (data.payload.symbolId == SYMBOL_LTC) {
                    makeChart('chart_cny_ltc', val, "￥");
                }

            });
        },500);
        ti = setTimeout(getLine, 60000);
    }
    getLine();
    socket_cny.msg(over_ltc_cny.msg);
    socket_cny.reg(over_ltc_cny.msgType, function(data) {
        if (data.symbolId == SYMBOL_LTC) {
            //console.log(data);
            pushMarketData(data.payload,'ltc_market_cny','cny','ltc');
            $("#price_cny_ltc").html("¥ "+mNum(data.payload.priceNew, 2));
        }

    });

    socket_cny.msg(over_btc_usd.msg);
    socket_cny.reg(over_btc_usd.msgType, function(data) {
        if (data.symbolId == SYMBOL_USD) {
            //console.log(data);
            pushMarketData(data.payload,'market_usd','usd');
            $("#price_usd").html("$ "+mNum(data.payload.priceNew, 2));
        }
    });
}else{

}
    function formartChart(data){
        var list = data.payload.priceLast;
        var time = data.payload.time;
        var length = list.length;
        var val = [];
        for(var i=200; i<length;i++){
            var arr = [(time[i]*1+3600*8)*1000, list[i]];
            val.push(arr);
        }
        return val;
    }



    var is_data = 0;
   
    function  getBtcWeek(){
        $.ajax({
            type: "get", async: false, cache: false, dataType: "json",
            url: "http://10.66.242.59:8080",//"http://market.bitvc.com/futures/ticker_btc_week.js",
            success: function (data) {
               var _data = {
                    'symbolId': 'btccny',
                    'priceHigh': data.high*1,
                    'priceLow': data.low*1,
                    'priceNew': data.last*1,
                    'priceOpen': data.open*1,
                    'totalVolume':data.vol*1
                 };
                pushMarketData(_data,'market_futures','cny');
                $("#price_futures").html("¥ "+mNum(_data.priceNew, 2));
            }
        });
        setTimeout(function(){
            getBtcWeek()
        },2000)
    }
    _GetRate.then(function(){
        getBtcWeek();
    });
    /*
    socket_futures.msg(over_btc_next_week.msg);
    socket_futures.reg(over_btc_next_week.msgType, function(data) {
        if (data.symbolId == SYMBOL_NEXT_WEEK) {
            console.log(data);
            pushMarketData(data.payload,'market_futures','cny');
            $("#price_futures").html("¥ "+mNum(data.payload.priceNew, 2));
        }
    });
    */
/*    socket_futures.msg(over_btc_quarter.msg);
    socket_futures.reg(over_btc_quarter.msgType, function(data) {
        if (data.symbolId == SYMBOL_QUARTER) {
            //console.log(data);
            pushMarketData(data.payload,'market_quarter','cny');
        }
    });*/
    function getRate(){
        var s = false;
        $.ajax({
            type: "get", async: false, cache: false, dataType: "json",
            url: "http://market.bitvc.com/futures/exchange_rate.js",
            success: function (result) {
                s =  result.rate;
            }
        });
        return s;
    }
    function pushMarketData(data,id,type,coin){
        if(!arguments[2]) type = "cny";
        if(!arguments[3]) coin = "btc";

        if(RATE == 0){
            try
            {
                pushMarketData(data,id,type,coin);
            }
            catch(err)
            {
            }

            return;
        }

        //console.log(11);
        var mark = "¥",
            coin_mark = "฿",
            negative = "-",
            tmp_price,
            price_1,
            price_2,
            price_h_1,
            price_h_2,
            price_l_1,
            price_l_2,
            price_html,
            color = "";
        if(type == 'usd'){
            mark = "$";
        }
        if(coin == "ltc"){
            coin_mark = "Ł";
        }
        switch(id){
            case "market_cny":
                tmp_price = BTC_NOW_PRICE_CNY;
                BTC_NOW_PRICE_CNY = data.priceNew;
                break;
            case "market_usd":
                tmp_price = BTC_NOW_PRICE_USD;
                BTC_NOW_PRICE_USD = data.priceNew;
                break;
            case "ltc_market_cny":
                tmp_price = LTC_NOW_PRICE_CNY;
                LTC_NOW_PRICE_CNY = data.priceNew;
                break;
            case "ltc_market_usd":
                tmp_price = LTC_NOW_PRICE_USD;
                LTC_NOW_PRICE_USD = data.priceNew;
                break;
            case "market_futures":
                tmp_price = BTC_NOW_PRICE_FUTURES;
                BTC_NOW_PRICE_FUTURES = data.priceNew;
                break;
            case "market_quarter":
                tmp_price = BTC_NOW_PRICE_QUARTER;
                BTC_NOW_PRICE_QUARTER = data.priceNew;
                break;
        }
        var rose = mNum((data.priceNew - data.priceOpen)/data.priceOpen*100, 2);
        if(id == "market_cny" || id == "market_usd" || id == "market_futures" || id == "ltc_market_cny"){
            var domMarket = $("#"+id);
            if(data.priceNew > tmp_price){
                domMarket.find(".now_price").removeClass("market_red market_green");
                //domMarket.find(".rose").removeClass("market_red market_green");
                domMarket.find(".total").removeClass("market_red market_green");
                domMarket.find(".now_price").addClass('market_red');
                //domMarket.find(".rose").addClass('market_red');
                domMarket.find(".total").addClass('market_red');
                domMarket.find(".now_price").html(mark +""+ mNum(data.priceNew, 2) + ' <i class="icon_up"></i>');
                domMarket.find(".now_price").find("i").animate({top:'0px',opacity:'0'},"slow");
            }else if(data.priceNew < tmp_price){
                domMarket.find(".now_price").removeClass("market_red market_green");
                //domMarket.find(".rose").removeClass("market_red market_green");
                domMarket.find(".total").removeClass("market_red market_green");
                domMarket.find(".now_price").addClass('market_green');
                //domMarket.find(".rose").addClass('market_green');
                domMarket.find(".total").addClass('market_green');
                domMarket.find(".now_price").html(mark +""+ mNum(data.priceNew, 2) + ' <i class="icon_down"></i>');
                domMarket.find(".now_price").find("i").animate({top:'12px',opacity:'0'},"slow");
            }

            if(rose >= 0){
                domMarket.find(".rose").removeClass("market_red market_green");
                domMarket.find(".rose").addClass('market_red');
                negative = "";
            }else{
                domMarket.find(".rose").removeClass("market_red market_green");
                domMarket.find(".rose").addClass('market_green');
            }
            domMarket.find(".rose").html("<b>"+rose+"</b>%");
            domMarket.find(".total").html(coin_mark + " " + mNum(data.totalAmount, 4));
            /*
            domMarket.find(".low").html(mark +" "+ mNum(data.priceLow, 2));
            domMarket.find(".high").html(mark +" "+ mNum(data.priceHigh, 2));
            */
        }

        var domList = $("#"+id+"_list");
        if(rose >= 0){
            domList.find(".rose").removeClass("market_red market_green");
            domList.find(".rose").addClass('market_red');
            negative = "";
        }else{
            domList.find(".rose").removeClass("market_red market_green");
            domList.find(".rose").addClass('market_green');
        }
        domList.find(".rose").html(rose+"%");
        //console.log(RATE);
        if(type == "usd"){
            price_1 = mNum(data.priceNew*RATE, 2);
            price_2 = mNum(data.priceNew, 2);
            price_h_1 = mNum(data.priceHigh*RATE, 2);
            price_h_2 = mNum(data.priceHigh, 2);
            price_l_1 = mNum(data.priceLow*RATE, 2);
            price_l_2 = mNum(data.priceLow, 2);
        }else{
            price_1 = mNum(data.priceNew, 2);
            price_2 = mNum(data.priceNew/RATE, 2);
            price_h_1 = mNum(data.priceHigh, 2);
            price_h_2 = mNum(data.priceHigh/RATE, 2);
            price_l_1 = mNum(data.priceLow, 2);
            price_l_2 = mNum(data.priceLow/RATE, 2);
        }


        if(data.priceNew > tmp_price){
            price_html = '<em class="bg_red"></em><em class="z_100"><span class="font_">¥'+price_1+'</span> / <span class="font_h">$'+price_2+'</span> <i class="icon_up"></i></em>';
            domList.find(".now_price").html(price_html);
            domList.find(".now_price").find("i").animate({top:'0',opacity:'1'},500);
            domList.find(".now_price").find(".bg_red").animate({opacity:'0'},1000);

        }else if(data.priceNew < tmp_price){
            price_html = '<em class="bg_green"></em><em class="z_100"><span class="font_">¥'+price_1+'</span> / <span class="font_h">$'+price_2+'</span> <i class="icon_down"></i></em>';
            domList.find(".now_price").html(price_html);
            domList.find(".now_price").find("i").animate({top:'0',opacity:'1'},500);
            domList.find(".now_price").find(".bg_green").animate({opacity:'0'},1000);
        }else{
            domList.find(".now_price").find(".font_").html('¥'+price_1);
            domList.find(".now_price").find(".font_h").html('$'+price_2);
        }


        //domList.find(".high").html('¥'+price_h_1+" / $"+price_h_2);
        //domList.find(".low").html('¥'+price_l_1+" / $"+price_l_2);

        domList.find(".high").html(mark + price_h_1);
        domList.find(".low").html(mark + price_l_1);

        var totla = 0;
        if(id == 'market_futures' || id == 'market_quarter'){
            totla = data.totalVolume;
        }else{
            totla = data.totalAmount
        }

        domList.find(".total").html(coin_mark + " " + mNum(totla, 2));

    }
    $(".modify").click(function(){
        var status = $(this).attr("data-type");
        var domParent = $(this).parent().parent();
        if(status == "closed"){
            $(this).attr("title","完成");
            $(this).removeClass("icon_menu").addClass("icon_ok");
            $(this).attr("data-type","open");
            domParent.addClass('edit');
        }
        if(status == "open"){
            $(this).attr("title","编辑");
            $(this).removeClass("icon_ok").addClass("icon_menu");
            $(this).attr("data-type","closed");
            domParent.removeClass('edit');
            domParent.find(".added").find("ul").each(function(){
                var c_id = $(this).attr('id');
                if(c_id == "btc-ebtc_list"){
                    c_id = 'btcebtc_list';
                }
                if(c_id == "btc-eltc_list"){
                    c_id = 'btceltc_list';
                }
                BitCookie.Cookie(c_id,1);
            });
            domParent.find(".notadded").find("ul").each(function(){
                var c_id = $(this).attr('id');
                if(c_id == "btc-ebtc_list"){
                    c_id = 'btcebtc_list';
                }
                if(c_id == "btc-eltc_list"){
                    c_id = 'btceltc_list';
                }
                BitCookie.Cookie(c_id,0);
            });
        }
    });
    function move_html(obj,cls){
        if(cls == 'notadded'){
            obj.attr('class','icon_add');
            obj.bind("click",function(){
                move_html(obj,'added');
            });
        }else if(cls == 'added'){
            obj.attr('class','icon_reduc');
            obj.bind("click",function(){
                move_html(obj,'notadded');
            });
        }
        //console.log(cls);
        obj.parent().parent().parent().appendTo(obj.parent().parent().parent().parent().parent().find('.'+cls));
    }
    $(".icon_reduc").click(function(){
        move_html($(this),'notadded');
    });
    $(".icon_add").click(function(){
        move_html($(this),'added');
    });
    //编辑
    /*
    $(".modify").click(function(){
        var status = $(this).attr("data-type");
        var domParent = $(this).parent().parent().parent();
        if(status == "closed"){
            $(this).html('<i class="icon_menu_b"></i> <span class="font_orange">完成</span>');
            $(this).attr("data-type","open");
            domParent.addClass('edit');
            domParent.find(".display_box").find(".table_box").show();
        }
        if(status == "open"){
            $(this).html('<i class="icon_menu_a"></i> 编辑');
            $(this).attr("data-type","closed");
            domParent.removeClass('edit');
            domParent.find(".display_box").find(".table_box").each(function(){
                var c_id = $(this).attr('id');
                console.log(c_id);
                if(c_id == "btc-ebtc_list"){
                    c_id = 'btcebtc_list';
                }
                if(c_id == "btc-eltc_list"){
                    c_id = 'btceltc_list';
                }
                if(!$(this).hasClass('bg_title')){
                    $(this).hide();
                    BitCookie.Cookie(c_id,0);
                }else{
                    BitCookie.Cookie(c_id,1);
                }
            });
        }
    });

    $(".checkbox").click(function(){
        var domParent =  $(this).parent().parent().parent();

        $(this).removeClass('icon_check_a icon_check_b');
        if(domParent.hasClass('bg_title')){
            $(this).addClass('icon_check_a');
            domParent.removeClass('bg_title');

        }else{
            $(this).addClass('icon_check_b');
            domParent.addClass('bg_title');
        }
    });
*/
    function makeChart(id,data,mark){
        $('#'+id).highcharts({
            chart: {
                zoomType: 'x',
                backgroundColor:'',
                margin: [10, 0, 0, 0]
            },
            colors: ['#1a8cd3', '#0d496e', '#2e3037'],
            title: {
                text: ""
            },
            subtitle: {
                text: ""
            },
            xAxis: {
                type: 'datetime',
                lineWidth:0,
                minorTickWidth: 0,
                tickWidth:0,
                showFirstLabel: false,
                tickAmount:3,
                labels: {
                    enabled: false
                }

            },
            yAxis: {
                gridLineColor: '',
                showFirstLabel: false,
                tickAmount:3,
                labels: {
                    align: 'left',
                    x: -100,
                    style: {
                        color: '#939393',
                        fontWeight: 'bold'
                    }
                },
                title: {
                    text: ""
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, Highcharts.Color('#093855').setOpacity(1).get('rgba')],
                            [1, Highcharts.Color('#2e3037').setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 1
                    },
                    lineWidth: 2,
                    states: {
                        hover: {
                            lineWidth: 2
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: mark,
                data: data
            }]
        });
    }
    if($(".bottom_fixed").length > 0){
        var HuobiAjax = require('./module_ajax');
        var QUOTA = new HuobiAjax({"data": {"m": 'get_market_info'},"refresh":5000}, function (data) {
            var _code = data.code;
            if (data.code == 'success') {
                var result = data['data'];
                if(result.code == 0){
                    quota = result.data['cny_sum'];
                    var yi  = parseInt(quota/100000000),
                        wan = parseInt((quota - yi*100000000)/10000);
                    var yi_arr = yi.toString().split("");
                    var wan_arr = wan.toString().split("");
                    var yi_html = "";
                    var wan_html = "";
                    for(var i = 0; i < 4; i++){
                        yi_html = yi_html + "<span>" + yi_arr[i] + "</span>";
                        wan_html = wan_html + "<span>" + wan_arr[i] + "</span>";
                    }
                    $("#yi").html(yi_html);
                    $("#wan").html(wan_html);
                    //console.log(yi,wan);
                }
            }
        });
        QUOTA.Play();
        //关闭悬浮
        $(".icon_close").click(function(){
            $(this).parents(".fixed").css("display","none");
        });
    }

});
