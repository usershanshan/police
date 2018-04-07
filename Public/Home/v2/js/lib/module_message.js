/**
 * Created by Andy on 2015/6/2.
 */

define(function (require, exports, module) {
    var A = require('./module_ajax'),
        M = require('./module_tmpl');

    //获取新消息
    function GetMsg(options,callback){
        var op   = options || {},
            temp = op.temp,
            wrap = document.getElementById(op.wrap);

        if(!temp || !wrap){
            return
        }

        A({"data":{"m":"message","action":"get_new"}},function(data){
            var _code = data.code;
            switch (_code) {
                case 'loading':
                    if (wrap.innerHTML == '') {
                        wrap.innerHTML ='<div class="align_center p_all_30"><i class="icon_loading"><span>'+data.msg+'</span></i></div>';
                    }
                    break;
                case 'error':
                    wrap.innerHTML ='<div class="align_center p_all_30">'+data.msg+'</div>';
                    break;
                case 'success':
                    if(data['data'].code===0){
                        wrap.innerHTML = M(temp, data['data']);
                        callback&&callback(data['data'].new_count)
                    }else{
                        wrap.innerHTML = '<div class="align_center p_all_30">code:'+data['data'].code +','+ data['data'].msg +'</div>';
                    }
                    break;
            }
        });
    }

    //标记已读消息
    function ReadMsg(options,callback){
        var op  = options || {},
            ids = typeof op.id == 'object' ? op.id.join(',') : op.id;

        A({"data":{m:"message",action:"read_part","msgids":ids}},function(data){
            var _code = data.code;
            switch (_code) {
                case 'loading':
                    callback && callback(data);
                    break;
                case 'error':
                    wrap.innerHTML = '<div class="align_center p_t_30">'+data.msg+'</div>';
                    break;
                case 'success':
                    callback && callback(data['data']);
                    break;
            }
        });
    }

    //删除消息
    function DelMsg(options, callback){
        var op     = options || {},
            ids    = typeof op.id == 'object' ? op.id.join(',') : op.id;

        A({"data":{m:"message",action:"s","msgids":ids}},function(data){
            var _code = data.code;
            switch (_code) {
                case 'loading':
                    callback && callback(data)
                    break;
                case 'error':
                    callback && callback(data)
                    break;
                case 'success':
                    callback && callback(data['data']);
                    break;
            }
        });
    }

    exports.GetMsg   = GetMsg;
    exports.ReadMsg  = ReadMsg;
    exports.DelMsg   = DelMsg;
});