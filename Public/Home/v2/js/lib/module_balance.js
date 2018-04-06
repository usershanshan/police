/**
 * balance
 */
define(function(require, exports,module){
    var $, HuobiAjax, HB, coin_type, BALANCE, waitBalance,GetBalance,DOM,mNum;
    $ = require('jquery');
    HuobiAjax = require('./module_ajax');
    HB = require('./module_hb_extend');
    mNum = require('./module_number');
    coin_type = $("input[name='coin_type']").val();
    BALANCE = {};
    DOM =  {};
    HUOBI['BALANCE'] = BALANCE;
    DOM['dom'] = $(document);
    DOM['convert_total_cny']  = $('.convert_total_cny');
    DOM['convert_total_usd'] = $('.convert_total_usd');
    DOM['convert_total_btc'] = $('.convert_total_btc');
    DOM['convert_net_cny']   = $('.convert_net_cny');
    DOM['convert_net_usd']   = $('.convert_net_usd');
    DOM['convert_net_btc']   = $('.convert_net_btc');
    DOM['cny_available']     = $('.cny_cny_available');
    DOM['cny_btc_available'] = $('.cny_btc_available');
    DOM['cny_ltc_available'] = $('.cny_ltc_available');
    DOM['cny_frozen']        = $('.cny_cny_frozen');
    DOM['cny_btc_frozen']    = $('.cny_btc_frozen');
    DOM['cny_ltc_frozen']    = $('.cny_ltc_frozen');
    DOM['cny_loan']          = $('.cny_cny_loan');
    DOM['cny_btc_loan']      = $('.cny_btc_loan');
    DOM['cny_ltc_loan']      = $('.cny_ltc_loan');
    DOM['cny_risk_rate']     = $('.cny_risk_rate');
    DOM['cny_total']         = $('.cny_total');
    DOM['cny_net_asset']     = $('.cny_net_asset');
    DOM['usd_available']     = $('.usd_usd_available');
    DOM['usd_btc_available'] = $('.usd_btc_available');
    DOM['usd_frozen']        = $('.usd_usd_frozen');
    DOM['usd_btc_frozen']    = $('.usd_btc_frozen');
    DOM['usd_loan']          = $('.usd_usd_loan');
    DOM['usd_btc_loan']      = $('.usd_btc_loan');
    DOM['usd_risk_rate']     = $('.usd_risk_rate');
    DOM['usd_total']         = $('.usd_total');
    DOM['usd_net_asset']     = $('.usd_net_asset');
    DOM['fee_rate']          = $('.fee_rate');
    DOM['head_balance']      = $('#head_balance');
    DOM['cny_c_a_panel']     = $('cny_cny_available_panel');

    waitBalance = function (dtd,callback) {
        GetBalance = new HuobiAjax({"data": {"m": 'user_balance'}, "refresh": 2000, damp:true}, function (data) {
            if (data.code == 'success') {
                Process(data['data']);
            }
        });
        HB({'name': 'AJAX', 'value': {'GetBalance': GetBalance}});
        function Process(data) {
            if (typeof data['ext'] !== "object") {
                return
            }
            BALANCE['cny_available'] = data.ext.CNY.CNY.available * 1;
            BALANCE['cny_cny_available'] = data.ext.CNY.CNY.available * 1;
            BALANCE['cny_btc_available'] = data.ext.CNY.BTC.available * 1;
            BALANCE['cny_ltc_available'] = data.ext.CNY.LTC.available * 1;
            BALANCE['cny_frozen'] = data.ext.CNY.CNY.frozen * 1;
            BALANCE['cny_btc_frozen'] = data.ext.CNY.BTC.frozen * 1;
            BALANCE['cny_ltc_frozen'] = data.ext.CNY.LTC.frozen * 1;
            BALANCE['cny_loan'] = data.ext.CNY.loan.CNY * 1;
            BALANCE['cny_btc_loan'] = data.ext.CNY.loan.BTC * 1;
            BALANCE['cny_ltc_loan'] = data.ext.CNY.loan.LTC * 1;
            BALANCE['cny_risk_rate'] = data.ext.CNY.risk_rate * 1;
            BALANCE['cny_total'] = data.ext.CNY.total * 1;
            BALANCE['cny_net_asset'] = data.ext.CNY.net_asset * 1;
            BALANCE['cny_btc_burst'] = data.ext.CNY['burst_price']['BTC'] * 1;
            BALANCE['cny_ltc_burst'] = data.ext.CNY.burst_price.LTC * 1;

            BALANCE['usd_available'] = data.ext.USD.USD.available * 1;
            BALANCE['usd_usd_available'] = data.ext.USD.USD.available * 1;
            BALANCE['usd_btc_available'] = data.ext.USD.BTC.available * 1;
            BALANCE['usd_frozen'] = data.ext.USD.USD.frozen * 1;
            BALANCE['usd_btc_frozen'] = data.ext.USD.BTC.frozen * 1;
            BALANCE['usd_loan'] = data.ext.USD.loan.USD * 1;
            BALANCE['usd_btc_loan'] = data.ext.USD.loan.BTC * 1;
            BALANCE['usd_risk_rate'] = data.ext.USD.risk_rate * 1;
            BALANCE['usd_total'] = data.ext.USD.total * 1;
            BALANCE['usd_btc_burst'] = data.ext.USD.burst_price.BTC * 1;
            BALANCE['usd_net_asset'] = data.ext.USD.net_asset * 1;

            BALANCE['convert_total_cny'] = data.ext.equivalent.CNY.total * 1;
            BALANCE['convert_net_cny'] = data.ext.equivalent.CNY.net_asset * 1;
            BALANCE['convert_total_usd'] = data.ext.equivalent.USD.total * 1;
            BALANCE['convert_net_usd'] = data.ext.equivalent.USD.net_asset * 1;
            BALANCE['convert_total_btc'] = data.ext.equivalent.BTC.total * 1;
            BALANCE['convert_net_btc'] = data.ext.equivalent.BTC.net_asset * 1;
            BALANCE['fee_rate'] = data.ext.fee_rate;
            DOM['dom'].trigger('__GetBalance', data['ext']);
            InDom();
            callback&&callback();
        }

        function InDom(){
            $.each(DOM,function(i,v){

                var _l = v.length,
                    _b = (i.indexOf("btc")>0 || i.indexOf("ltc")>0) ? mNum(BALANCE[i],4) : mNum(BALANCE[i],2);
                if(_l === 1){

                    v.attr('data-flaunted') == '0' ? v.html('---').attr('data-flaunt',_b) : v.html(_b).attr('data-flaunt', _b);

                }else if(_l > 1){

                    v.each(function(){
                        var _t =  $(this);
                        _t.attr('data-flaunted') == '0' ? _t.html('---').attr('data-flaunt', _b) : _t.html(_b).attr('data-flaunt', _b);
                    });

                }else{

                }
            });

            if (BALANCE['cny_risk_rate']) {
                $('.cny_loan_rate_yes').show();
                $('.cny_loan_rate_no').hide();
            } else {
                $('.cny_loan_rate_yes').hide();
                $('.cny_loan_rate_no').show();
            }
            if (BALANCE['usd_risk_rate']) {
                $('.usd_loan_rate_yes').show();
                $('.usd_loan_rate_no').hide();
            } else {
                $('.usd_loan_rate_yes').hide();
                $('.usd_loan_rate_no').show();
            }
            dtd.resolve();
            //人民币账户预估爆仓价
            if (BALANCE['cny_btc_burst'] > 0 || BALANCE['cny_ltc_burst'] > 0) {
                if (BALANCE['cny_btc_burst'] > 0) {
                    $('.cny_loan_burst_price_btc').find('.price').html(BALANCE['cny_btc_burst']).end().show().siblings('.cny_loan_burst').hide();
                } else if (BALANCE['cny_ltc_burst'] > 0) {
                    $('.cny_loan_burst_price_ltc').find('.price').html(BALANCE['cny_ltc_burst']).end().show().siblings('.cny_loan_burst').hide();
                }
            } else {
                $('.cny_loan_burst_price_no').show().siblings('.cny_loan_burst').hide();
            }
            //美元账户预估爆仓价
            if (BALANCE['usd_btc_burst'] > 0 ) {
				$('.usd_loan_burst_price_btc').find('.price').html(BALANCE['usd_btc_burst']).end().show().siblings('.usd_loan_burst').hide();
            } else {
                $('.usd_loan_burst_price_no').show().siblings('.usd_loan_burst').hide();
            }
        }
        return dtd;
    };

    module.exports = waitBalance;
});
