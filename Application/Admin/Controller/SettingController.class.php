<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/1/23
 * Time: 10:07
 */

namespace Admin\Controller;


class SettingController extends AdminBaseController
{
    //设置
   public function edit(){
       $setting = M('setting');
       $info = $setting->where(['display'=>1])->find();
       if(!$info){//初始化
           $insert['inputtime'] = time();
           $insert['display'] = 1;
           $insert['new_key'] = 1;//新手活动。默认开启
           $insert['new_value'] = 2000;//新手活动，默认给2000红包
           $insert['e_profit'] = 50;//止盈率
           $insert['price'][] = 10000;
           $insert['price'][] = 20000;
           $insert['price'][] = 30000;
           $insert['price'][] = 50000;
           $insert['price'][] = 100000;
           $insert['price'][] = 200000;
           $insert['price'][] = 300000;
           $insert['price'][] = 500000;
           $insert['price'] = json_encode($insert['price']);//点买金额json
           $insert['multiple'][] = ['times'=>8,'e_loss'=>80,'delay_loss'=>6.5];
           $insert['multiple'][] = ['times'=>6,'e_loss'=>85,'delay_loss'=>10.67];
           $insert['multiple'][] = ['times'=>5,'e_loss'=>85,'delay_loss'=>14];
           $insert['multiple'] = json_encode($insert['multiple']);//倍数  和对应质损率  json
           $insert['routine'] = 45.5;//交易综合费
           $insert['delay_price'] = 18;//递延费，每万
           $insert['allot_profit'] = 0.9;//盈利分配比率
           $insert['allot_loss'] = 0.9;//亏损分配比率
           $insert['limit_day'] = 60;
           $insert['cash_day'] = 3;
           $insert['cash_month'] = 500000;
           $insert['cash_charge'] = 6;
           $insert['cash_key'] = 1;//提现开关线下
           $insert['new_red'] = 45;//新手体验红包   点买之后获取
           $insert['new_profit'] = 20;//新手点买止盈率
           $insert['new_dprice'] = 2000;//新手点买金额
           $insert['line'] = 2;//股票购买线下

           $r = $setting->add($insert);
           if(!$r){
               $this->Error('数据初始化错误');
           }
           $info = $setting->where(['display'=>1])->find();

       }
       $info_key = I('get.');
       unset($info_key['/Admin/Setting/edit_html']);
       if($info_key){
            $info = [];
            $info_field = I('get.');
            unset($info_field['/Admin/Setting/edit_html']);
            foreach($info_field as $k=>$v){

                if(preg_match('/^price\d*/', $k)){
                    if($v == '#无' ||!$v){
                        continue;
                    }
                    $info['price'][] = $v;
                    continue;
                }
                if(preg_match('/^times\d*/',$k) ){
                    if($v == '#无' ||!$v ){
                        continue;
                    }
                    $num = substr($k,5);
                    $info['multiple'][$num]['times'] = $v;
                    continue;
                }
                if(preg_match('/^e_loss\d*/',$k) ){
                    if($v == '#无' ||!$v){
                        continue;
                    }
                    $num = substr($k,6);
                    $info['multiple'][$num]['e_loss'] = $v;
                    continue;
                }
                if(preg_match('/^delay_loss\d*/',$k) ){
                    if($v == '#无' ||!$v){
                        continue;
                    }
                    $num = substr($k,10);
                    $info['multiple'][$num]['delay_loss'] = $v;
                    continue;
                }
                $info[$k]=$v;

            }

            if(!isset($info['new_key']) || empty($info['new_key'])){
               $this->ajaxError('请选择是否开启推荐红包活动');
            }
            if($info['new_key']){
               if( !isset($info['new_value']) || empty($info['new_value'])){
                   $this->ajaxError('请填写推荐红包金额');
               }
            }
            if(!$info['price']){
                $this->ajaxError('请设置点买金额');
            }
            foreach($info['price'] as $k=>$v){
                if(num_str($v,'price')){
                    $this->ajaxError('请正确填写点买金额');
                }
            }
            $info['price'] = json_encode($info['price']);
            if(!$info['multiple']){
                $this->ajaxError('请设置点卖倍数');
           }
           foreach($info['multiple'] as $k=>$v){
                if(num_str($v['times'],'num')){
                    $this->ajaxError('请正确输入点卖倍数');
                }
                if(num_str($v['e_loss'],'price')){
                    $this->ajaxError('请正确填写止损率');
                }
                if(num_str($v['delay_loss'],'price')){
                    $this->ajaxError('请正确填写递延条件');
                }
           }
           $info['multiple'] = json_encode($info['multiple']);
            $require = [
               'e_profit'=>'请填写止盈率',
               //'price'=>'点买金额',
               //'multiple'=>'点买倍数',
               'routine'=>'请填写交易综合费',
               'delay_price'=>'请填写递延费',
               'allot_profit'=>'请填写盈利分配比率',
               'allot_loss'=>'请填写亏损分配比率',
               'limit_day'=>'请填写最大持仓天数',
               'cash_day'=>'请填写每天免费提现次数',
               'cash_month'=>'请填写每月免费提现额度',
               'cash_charge'=>'请填写提现超出部分手续费率（千分之一）',
               'cash_key'=>'请选择提现渠道',
               'new_red'=>'请输入新手红包金额',
               'new_profit'=>'请输入新手体验止盈率',
               'new_dprice'=>'新手体验点买金额',
               'line'=>'请选择股票点买渠道'
            ];
            $res = required($require,$info);
            if($res['Error']){
               $this->ajaxError($res['Msg']);
            }
            if(num_str($info['new_value'],'price')){
               $this->ajaxError('请正确填写推荐红包金额');
            }
            if(num_str($info['routine'],'price')){
               $this->ajaxError('请正确填写综合交易费');
            }
            if(num_str($info['delay_price'],'price')){
               $this->ajaxError('请正确填写递延费');
            }
            if(num_str($info['allot_profit'],'price')){
               $this->ajaxError('请正确填写盈利分配比率');
            }
            if(num_str($info['allot_loss'],'price')){
               $this->ajaxError('请正确填写亏损分配比率');
            }
            if(num_str($info['limit_day'],'num')){
                $this->ajaxError('请正确填写最大持仓天数');
            }
            if(num_str($info['cash_day'],'num')){
                $this->ajaxError('请正确填写每天免费提现次数');
            }
            if(num_str($info['cash_month'],'price')){
                $this->ajaxError('请正确填写每月免费提现额度');
            }
            if(num_str($info['cash_charge'],'price')){
                $this->ajaxError('请正确填写超出部分手续费率（千分之一）');
            }
             if(num_str($info['new_red'],'price')){
                 $this->ajaxError('请正确填写新手红包金额');
             }
             if(num_str($info['new_profit'],'price')){
                 $this->ajaxError('请正确填写新手体验止盈率');
             }
             if(num_str($info['new_dprice'],'price')){
                 $this->ajaxError('请正确填写新手体验点买金额');
             }

             $info['updatetime'] = time();
             $r = M('setting')->where(['display'=>1])->save($info);
             if($r){
                 $this->ajaxSuccess('修改成功');
             }else{
                 $this->ajaxError('修改失败');
             }







            //接参，修改,修改成功清缓存






       }else{

            $info['price'] = json_decode($info['price'],true);
            $info['multiple'] = json_decode($info['multiple'],true);
           //推荐注册活动
            if($info['new_key']){
               $this->assign('new_key_y','selected');
           }else{
               $this->assign('new_key_n','selected');
           }
            //提现渠道
           if($info['cash_key'] == 2){
               $this->assign('cash_key_y','selected');
           }else{
               $this->assign('cash_key_n','selected');
           }
           //提现渠道
           if($info['new_red'] == 2){
               $this->assign('new_red_y','selected');
           }else{
               $this->assign('new_red_n','selected');
           }

           //点买渠道
           if($info['line'] == 1){
               $this->assign('line_y','selected');
           }else{
               $this->assign('line_n','selected');
           }


            $this->assign('info',$info);
            $this->display();
       }

   }

   public function preview(){
       $arr = [];
       $setting = M('setting');
       $info = $setting->where(['display'=>1])->find();
       if(!$info){//初始化
           $insert['inputtime'] = time();
           $insert['display'] = 1;
           $insert['new_key'] = 1;//新手活动。默认开启
           $insert['new_value'] = 2000;//新手活动，默认给2000红包
           $insert['e_profit'] = 50;//止盈率
           $insert['price'][] = 10000;
           $insert['price'][] = 20000;
           $insert['price'][] = 30000;
           $insert['price'][] = 50000;
           $insert['price'][] = 100000;
           $insert['price'][] = 200000;
           $insert['price'][] = 300000;
           $insert['price'][] = 500000;
           $insert['price'] = json_encode($insert['price']);//点买金额json
           $insert['multiple'][] = ['times'=>8,'e_loss'=>80,'delay_loss'=>6.5];
           $insert['multiple'][] = ['times'=>6,'e_loss'=>85,'delay_loss'=>10.67];
           $insert['multiple'][] = ['times'=>5,'e_loss'=>85,'delay_loss'=>14];
           $insert['multiple'] = json_encode($insert['multiple']);//倍数  和对应质损率  json
           $insert['routine'] = 45.5;//交易综合费
           $insert['delay_price'] = 18;//递延费，每万
           $insert['allot_profit'] = 0.9;//盈利分配比率
           $insert['allot_loss'] = 0.9;//亏损分配比率
           $insert['limit_day'] = 60;
           $insert['cash_day'] = 3;
           $insert['cash_month'] = 500000;
           $insert['cash_charge'] = 6;
           $insert['cash_key'] = 1;//提现开关线下
           $insert['new_red'] = 45;//新手体验红包   点买之后获取
           $insert['new_profit'] = 20;//新手点买止盈率
           $insert['new_dprice'] = 2000;//新手点买金额
           $insert['line'] = 2;//股票购买线下

           $r = $setting->add($insert);
           if(!$r){
               $this->Error('数据初始化错误');
           }
           $info = $setting->where(['display'=>1])->find();

       }

       $info['price'] = json_decode($info['price'],true);
       $info['multiple'] = json_decode($info['multiple'],true);
       if($info['price']){
           foreach($info['price'] as $k=>$v){//点买金额
               if($info['multiple']){
                   foreach($info['multiple'] as $kk=>$vv){//！！！点买金额  和 倍数要唯一




                       $arr[$v][$vv['times']]['profit'] =round(cmpute(cmpute($v,'*', $info['e_profit']),'/',100,0)) ;//出发止盈
                       $arr[$v][$vv['times']]['bond'] = round(cmpute($v,'/', $vv['times']),0);//保证金
                       $arr[$v][$vv['times']]['loss'] = round(cmpute(cmpute($arr[$v][$vv['times']]['bond'] ,'*', $vv['e_loss']),'/',100),0);//触发止损
                       $arr[$v][$vv['times']]['routine'] = number_format(cmpute(cmpute($v,'/',10000) ,'*' ,$info['routine']),2);
                       $arr[$v][$vv['times']]['delay_loss'] = round(cmpute(cmpute($v ,'*', $vv['delay_loss']),'/',100),0);
                       $arr[$v][$vv['times']]['delay_price_z'] = number_format(cmpute(cmpute($v,'/',10000),'*',$info['delay_price']),2);//递延费用
                       $arr[$v][$vv['times']]['delay_price'] = number_format($info['delay_price'],2);





                   }
               }
           }
       }
       $this->assign('list',$arr);
       $this->display();
   }
}