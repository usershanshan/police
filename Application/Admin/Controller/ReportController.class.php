<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/2/1
 * Time: 9:14
 */

namespace Admin\Controller;
use Home\Logic\SendCodeLogic;


class ReportController extends AdminBaseController
{
    private $SendCode_Login;
    public function __construct()
    {
        parent::__construct();
        $this->SendCode_Login = new SendCodeLogic(C('PHONE_USER'),C('PHONE_PASS'),C('PHONE_SEND_NAME'));
        $this->PHONE_REG_NAME = C('PHONE_REG_NAME');
        $this->PHONE_REG_MSG  = C('PHONE_REG_MSG');
    }
    public function orderList(){
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
        $where['display'] = 1;
        //搜索=========================================================================================
            //对应 用户的订单
        if(I('get.uid')){
            $where['user_id'] = I('get.uid');
        }
            //订单状态搜索  1-持仓  2-已结算
        if(I('get.status_q')){
            $where['status_q'] = I('get.status_q');
            if($where['status_q'] == 1){
                $q_1 = 'selected';
            }elseif($where['status_q' == 2]){
                $q_2 = 'selected';
            }
            $this->assign('q_1',$q_1);
            $this->assign('q_2',$q_2);
        }
            //订单状态   1-已下单  2-未下单
        if(I('get.status_h')){
           $where['status_h'] = I('get.status_h');
            if($where['status_h'] == 1){
                $h_1 = 'selected';
            }elseif($where['status_h'] == 2){
                $h_2 = 'selected';
            }elseif($where['status_h'] == 3){
                $h_3 = 'selected';
            }elseif($where['status_h'] == 4){
                $h_4 = 'selected';
            }elseif($where['status_h'] == 5){
                $h_5 = 'selected';
            }
            else{
                $h_6 = 'selected';
            }
            $this->assign('h_3',$h_3);
            $this->assign('h_1',$h_1);
            $this->assign('h_2',$h_2);
            $this->assign('h_4',$h_4);
            $this->assign('h_5',$h_5);
            $this->assign('h_6',$h_6);

        }

        if(I('get.uid')){
            $where['user_id'] = I('get.uid');
        }

        if(I('get.phone')){
            $where['phone'] = I('get.phone');
        }
        //订单搜索
        if(I('get.id')){
            $where['id'] = I('get.id');
        }


        //============================================================================================

        $data = getlist('order',$page,$pagesize,$where,['inputtime'=>'desc'],['buy_note','updatetime','id','inputtime','name','gid','num','user_id','phone','d_price','times','buy_price','sel_price','al_balance','ac_balance','status_q','status_h']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
                $data['list'][$k]['updatetime'] = $v['updatetime']?date('Y-m-d H:i:s',$v['updatetime']):'——';
                $data['list'][$k]['do_status_q'] = $v['status_q']==1?'持仓中':'已结算';
                if($v['status_h'] == 1){
                    $data['list'][$k]['do_status_h'] = '未结款';
                }elseif($v['status_h'] == 2){
                    $data['list'][$k]['do_status_h'] = '已结款';
                }elseif($v['status_h'] == 3){
                    $data['list'][$k]['do_status_h'] = '已驳回';
                }elseif($v['status_h'] == 4){
                    $data['list'][$k]['do_status_h'] = '止盈确认';
                }elseif($v['status_h'] == 5){
                    $data['list'][$k]['do_status_h'] = '止损确认';
                }else{
                    $data['list'][$k]['do_status_h'] = '平仓确认';
                }
                $data['list'][$k]['sel_price'] = $v['sel_price']?$v['sel_price']:'——';
                $data['list'][$k]['al_balance'] = $v['al_balance']?$v['al_balance']:'——';
                $data['list'][$k]['num'] = $v['num']?$v['num']:'——';
                $data['list'][$k]['buy_price'] = $v['buy_price']?$v['buy_price']:'——';
            }
        }


        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();

    }

    public function orderInfo(){
        $order_id = I('get.order_id');
        $order = M('order');
        $order_arr = $order->where(['id'=>$order_id])->find();
        if(!$order_arr){
            $this->Error('参数错误');
        }
        $order_arr['inputtime'] = date('Y-m-d H:i:s',$order_arr['inputtime']);
        $order_arr['updatetime'] = $order_arr['updatetime']?date('Y-m-d H:i:s',time()):'';
        $order_arr['do_status_q'] = $order_arr['status_q'] == 1?'持仓中':'已结算';
        if($order_arr['status_h'] == 1){
            $order_arr['do_status_h'] = '未购买';
        }elseif($order_arr['status_h'] == 2){
            $order_arr['do_status_h'] = '已购买';
        }elseif($order_arr['status_h'] == 3){
            $order_arr['do_status_h'] = '已驳回';
        }elseif($order_arr['status_h'] == 4){
            $order_arr['do_status_h'] = '止盈确认';
        }elseif($order_arr['status_h'] == 5){
            $order_arr['do_status_h'] = '止损确认';
        }else{
            $order_arr['do_status_h'] = '平仓确认';
        }
        $order_arr['ac_bond'] = json_decode($order_arr['ac_bond'],true);
        $order_arr['ac_routine'] = json_decode($order_arr['ac_routine'],true);
        $order_arr['delay_loss'] = round($order_arr['delay_loss'],2);
        $this->assign('info',$order_arr);
        $this->display();

    }

    //订单购买
    public function buy(){
        if(IS_POST){
            $order_id = I('post.id');
            $buy_price = I('post.buy_price');
            if(!$buy_price){
                $this->ajaxError('请输入购买金额');
            }
            if(num_str($buy_price,'price')){
                $this->ajaxError('请正确输入购买金额');
            }
            $order_arr = M('order')->field(['d_price','profit','loss','delay_loss'])->where(['id'=>$order_id])->find();

            $update['buy_price'] = $buy_price;
            $update['num'] =  floor($order_arr['d_price']/($update['buy_price']*100))*100;//购买股票数
            $update['status_h'] = 2;
            //止盈价格================================================================================
            $update['profit_price'] = round(($update['buy_price']*$update['num'] +$order_arr['profit'])/$update['num'],2);//股票价格*股票数量+止盈价格（点买金额*止盈率）  除以  购买股票数

            //=======================================================================================

            //止损价格================================================================================
            $update['loss_price'] = round(($update['buy_price']*$update['num'] - $order_arr['loss'])/$update['num'],2);//股票价格*股票数量-止损价格（保证金*止损率  不同倍数不同） 除以 购买股票数

            //=======================================================================================


            //递延股票单价============================================================================
            $update['delay_loss_price'] = round(($update['buy_price']*$update['num'] - $order_arr['delay_loss'])/$update['num'],2);//股票价格*股票数量-递延条件（浮动盈亏）  除以  股票购买数量

            //======================================================================================

            $order = M('order');
            $r = $order->where(['id'=>$order_id])->save($update);
            if($r){
                $this->ajaxSuccess('操作成功');
            }else{
                $this->ajaxError('操作失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            $this->display();
        }

    }
    //驳回。退钱
    public function reject(){
        $id = I('post.id');
        $output = M('output');
        $output_arr = M('output')->where(['order_id'=>$id])->select();
        M()->startTrans();
        foreach($output_arr as $k=>$v){
           $r[] =  D('Home/Input')->addInput($v['user_id'],$v['account']+4,$v['price'],$v['account'] == 1?'money':'red',$v['phone'],$v['order_id']);//退钱
        }
        $r[] = M('order')->where(['id'=>$id])->save(['status_h'=>3]);//订单修改
        if(in_array(false,$r)){
            M()->rollback();
            $this->ajaxError('驳回失败');
        }else{
            M()->commit();
            $this->ajaxSuccess('驳回成功');
        }


    }

    //订单购买——批量
    public function batchBuy(){
        $ids = I('post.ids');
        if(!$ids){
            $this->ajaxError('请先选择一项进行操作');
        }

        $r = M('order')->where(['id'=>['in',$ids]])->save(['status_h',2]);
        if($r){
            $this->ajaxSuccess('操作成功');
        }else{
            $this->ajaxError('操作失败');
        }

    }

    public function inputList(){
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
        $where['display'] = 1;
        //搜索=========================================================================================
        //对应 用户的订单
        if(I('get.uid')){
            $where['user_id'] = I('get.uid');
        }

        if(I('get.phone')){
            $where['phone'] = ['LIKE','%'.I('get.phone').'%'];
        }


        //============================================================================================

        $data = getlist('input',$page,$pagesize,$where,['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
                $data['list'][$k]['do_account'] = $v['account'] == 1?'账户余额':'现金红包';
                $data['list'][$k]['order_id'] = $v['order_id']?$v['order_id']:'--';
            }
        }


        $this->assign('list',$data['list']);
        $this->assign('page',$data['page']);
        $this->display();
    }


    public function outputList(){
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
        $where['display'] = 1;
        //搜索=========================================================================================
        //对应 用户的订单
        if(I('get.uid')){
            $where['user_id'] = I('get.uid');
        }

        if(I('get.phone')){
            $where['phone'] = ['LIKE','%'.I('get.phone').'%'];
        }


        //============================================================================================

        $data = getlist('output',$page,$pagesize,$where,['inputtime'=>'desc']);
        $arr = [];
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $arr[$v['pid']]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
                $arr[$v['pid']]['user_id'] = $v['user_id'];
                $arr[$v['pid']]['phone'] = $v['phone'];
                $arr[$v['pid']]['price'] += $v['price'];
                $arr[$v['pid']]['type'] = $v['type'];
                $arr[$v['pid']]['account'] = $v['account'] == 1?'账户余额':'现金红包';
                $arr[$v['pid']]['order_id'] = $v['order_id'];
            }
        }


        $this->assign('list',$arr);
        $this->assign('page',$data['page']);
        $this->display();
    }


    public function outputInfo(){
        $pid = I('get.pid');
        $data = M('output')->where(['pid'=>$pid])->select();
        if($data){
            foreach($data as $k=>$v){
                $data[$k]['account'] = $v['account'] == 1?'账户余额':'现金红包';
            }
        }
        $this->assign('list',$data);
        $this->display();
    }

    //提现列表
    public function cashList(){
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
        $statsu_k = [];

        //搜索
        $where['display'] = 1;
        if(I('get.uid')){
            $where['user_id'] = I('get.uid');
        }
        if(I('get.phone')){
            $where['phone'] = ['LIKE',"%{I('get.phone')}%"];
        }

        if(I('get.status')){
            $where['status'] = I('get.status');
            $status_k[I('get.status')] = 'selected';
        }
        $this->assign('status_k',$status_k);

        $data = getlist('cash',$page,$pagesize,$where,['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s'.$v['inputtime']);
                $data['list'][$k]['do_type'] = $v['type'] == 1?'线下提现':'线上提现';
                $data['list'][$k]['updatetime'] = $v['updatetime']?date('Y-m-d H:i:s',$v['updatetime']):'--';
                switch($v['status']){
                    case 1:
                        $data['list'][$k]['do_status'] = '申请中';
                        break;
                    case 2:
                        $data['list'][$k]['do_status'] = '已通过';
                        break;
                    case 3:
                        $data['list'][$k]['do_status'] = '已驳回';
                        break;
                }
            }
        }

        $this->assign('page',$data['page']);
        $this->assign('list',$data['list']);
        $this->display();
    }


    //线下提现状态改变   ++++核准
    public function cash_status_y(){
        $id = I('post.id');
        $cash = M('cash');
        $r = $cash->where(['id'=>$id])->save(['updatetime'=>time(),'status'=>2]);
        if($r){
            $this->ajaxSuccess('提现核准成功');
        }else{
            $this->ajaxError('提现核准失败');
        }
    }


    //线下提现状态改变   ++++驳回
    public function cash_status_x(){
        $id = I('post.id');
        $cash = M('cash');
        $cash_arr = $cash->where(['id'=>$id])->find();
        M()->startTrans();
        $r[] = M('user')->where(['id'=>$cash_arr['user_id']])->setInc('money',$cash_arr['ac_price']);//退钱
        $r[] = $cash->where(['id'=>$id])->save(['updatetime'=>time(),'status'=>3]);//改状态
        if(!in_array(false,$r)){
            M()->commit();
            $this->ajaxSuccess('提现驳回成功');
        }else{
            M()->rollback();
            $this->ajaxError('提现驳回失败');
        }
    }

    //充值列表
    public function depositList(){
        $page = I('get.p')?I('get.p'):1;
        $pagesize = I('get.pagesize')?I('get.pagesize'):10;
        $where['display'] = 1;

        if(I('get.uid')){
            $where['user_id'] = I('get.uid');
        }
        if(I('get.phone')){
            $where['phone'] = ['LIKE',"%{I('get.phone')}%"];
        }

        if(I('get.status')){
            $where['status'] = I('get.status');
            $status_k[I('get.status')] = 'selected';
        }
        $this->assign('status_k',$status_k);

        $data = getlist('deposit',$page,$pagesize,$where,['inputtime'=>'desc'],$field='*');
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('Y-m-d H:i:s',$v['inputtime']);
                $data['list'][$k]['updatetime'] = $v['updatetime']?date('Y-m-d H:i:s',$v['updatetime']):'--';
                switch($v['type']){
                    case 1:
                        $data['list'][$k]['do_type'] = '线下充值';
                        break;
                    case 2:
                        $data['list'][$k]['do_type'] = '线上充值';
                        break;
                    case 3:
                        $data['list'][$k]['do_type'] = '支付宝充值';
                        break;
                }

                switch($v['status']){
                    case 1:
                        $data['list'][$k]['do_status'] = '申请中';
                        break;
                    case 2:
                        $data['list'][$k]['do_status'] = '已充值';
                        break;
                    case 3:
                        $data['list'][$k]['do_status'] = '充值失败';
                        break;
                }

            }
        }

        $this->assign('page',$data['page']);
        $this->assign('list',$data['list']);
        $this->display();
    }


    //线下核准
    public function deposit_y(){
        $id = I('post.id');
        $deposit = M('deposit');
        $deposit_arr =  $deposit->where(['id'=>$id])->find();
        M()->startTrans();
        $r[] = M('user')->where(['id'=>$deposit_arr['user_id']])->setInc('money',$deposit_arr['price']);//加钱
        $r[] = $deposit->where(['id'=>$id])->save(['status'=>2]);
        $key = $result = $this->SendCode_Login->sandHuaXinCode1($deposit_arr['phone'],'您充值单号为'.$id.'充值申请，已被核准');


        if(in_array(false,$r)){
            M()->rollback();
            $this->ajaxError('充值失败');
        }else{
            M()->commit();
            $this->ajaxSuccess('充值成功');
        }

    }


    //线下驳回
    public function deposit_x(){
        $id = I('post.id');
        $deposit = M('deposit');
        $r[] = $deposit->where(['id'=>$id])->save(['status'=>3]);

        if(in_array(false,$r)){

            $this->ajaxError('充值失败');
        }else{

            $this->ajaxSuccess('充值成功');
        }

    }

    //支付宝添加金额
    public function zhifubao(){

        if(IS_POST){
            $id = I('post.id');
            $price = I('post.price');
            $status = I('post.status');
            if($status == ''){
                $this->ajaxError('请选择支付状态');
            }
            if($status == 2){
                if(!$price){
                    $this->ajaxError('请输入用户支付宝充值金额');
                }
                if(num_str($price,'price')){
                    $this->ajaxError('请正确输入支付宝充值金额');
                }
            }

            $update['status'] = $status;
            $update['price'] = $status == 2?$price:'';
            $deposit = M('deposit');
            M()->startTrans();
            $r[] = $deposit->where(['id'=>$id])->save($update);
            if($status == 2){
                $info  =  $deposit->where(['id'=>$id])->find();
                $r[] = M('user')->where(['id'=>$info['user_id']])->setInc('money',$price);//加钱
            }
            if(!in_array(false,$r)){
                M()->commit();
                $this->ajaxSuccess('修改成功');
            }else{
                echo json_encode($r);
                die;
                M()->rollback();
                $this->ajaxError('修改失败');
            }
        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            $this->display();
        }


    }
    //卖出
    public function sel(){
        if(IS_POST){
            $input = D('Home/input');
            $setting = M('setting')->field(['allot_profit','allot_loss'])->where(['display'=>1])->find();
            $id = I('post.id');
            $sel_price = I('post.sel_price');
            if(!$sel_price){
                $this->ajaxError('请输入卖出金额');
            }
            if(num_str($sel_price,'price')){
                $this->ajaxError('请正确输入卖出金额');
            }

            $order_arr = M('order')->field(['num','buy_price','ac_price','bond','user_id','phone','id','day'])->where(['id'=>$id])->find();
            if($order_arr['day']<2){
                $this->ajaxError('持仓天数小于T+1，不可进行点卖');
            }

            $update['sel_price'] = $sel_price;
            $update['status_h'] = 2;

            $update['al_balance'] = $update['sel_price']*$order_arr['num'] - $order_arr['buy_price']*$order_arr['num'];
            if($update['al_balance'] >=0){//总收益大于0
                $update['ac_balance']  = $update['al_balance'] * $setting['allot_profit'];//盈利分配系数
                $update['ac_price'] = $order_arr['ac_price'] - ($order_arr['bond'] + $update['ac_balance']);//减少客户实际支出，后台算账
                $update['j_bond'] = $order_arr['bond'];//解冻保证金
            }else{
                $update['ac_balance'] = $update['al_balance'] * $setting['allot_loss'];//乘系数了
                if( $order_arr['bond'] + $update['ac_balance'] < 0){
                    $update['ac_balance'] = -$order_arr['bond'];//损失以保障金为底
                }
                $update['j_bond'] = $order_arr['bond'] +$update['ac_balance'];
                $update['ac_price'] = $order_arr['ac_price'] - $update['j_bond'];
            }
            M()->startTrans();
            $r[] = M('order')->where(['id'=>$id])->save($update);
            if($update['j_bond']>0){
                $r[] = $input->addInput($order_arr['user_id'],2,$update['j_bond'],'money',$order_arr['phone'],$order_arr['id']);
            }
            if($update['ac_balance']>0){
                $r[] = $input->addInput($order_arr['user_id'],3,$update['ac_balance'],'money',$order_arr['phone'],$order_arr['id']);
            }
            if(in_array(false,$r)){
                M()->rollback();
                $this->ajaxError('点卖失败');
            }else{
                M()->commit();
                $this->ajaxSuccess('点卖成功');
            }

        }else{
            $id = I('get.id');
            $this->assign('id',$id);
            $this->display();
        }
    }

    //更改订单状态
    public function act(){
        $id = I('id');
        $r = M('order')->where(['display'=>1,'id'=>$id])->save(['status_h'=>2]);
        if($r){
            $this->ajaxSuccess('更改订单状态成功');
        }else{
            $this->ajaxError('更改订单状态失败');
        }
    }

    public function new_order(){
        //有待处理订单
        $order = M('order')->where(['display'=>1,'status_q'=>['IN',[1,2]],'status_h'=>1])->find();
        if($order){
            $this->ajaxSuccess('数据获取成功',['order_no'=>$order['id'],'href'=>U('orderList',array('status_h'=>1))]);
        }

    }

    public function new_cash(){
        //有待处理订单
        $order = M('cash')->where(['display'=>1,'status'=>1])->find();
        if($order){
            $this->ajaxSuccess('数据获取成功',['order_no'=>$order['id'],'href'=>U('cashList',array('status'=>1))]);//未处理订单
        }

    }

    public function new_deposit(){
        //有待处理订单
        $order = M('deposit')->where(['display'=>1,'status'=>1])->find();
        if($order){
            $this->ajaxSuccess('数据获取成功',['order_no'=>$order['id'],'href'=>U('depositList',array('status'=>1))]);//未处理订单
        }

    }

    public function tishi(){
        $order = M('order')->where(['display'=>1,'status_q'=>['IN',[1,2]],'status_h'=>['IN',[1]]])->find();
        if($order){
            $this->ajaxSuccess('数据获取成功',['order_no'=>$order['id'],'href'=>U('orderList',array('status_h'=>1)),'title'=>'您有新的股票订单处理']);
        }
        $order = M('order')->where(['display'=>1,'status_q'=>['IN',[2]],'status_h'=>['IN',[4]]])->find();
        if($order){
            $this->ajaxSuccess('数据获取成功',['order_no'=>$order['id'],'href'=>U('orderList',array('status_h'=>4)),'title'=>'您有新的止盈订单待确认']);
        }
        $order = M('order')->where(['display'=>1,'status_q'=>['IN',[2]],'status_h'=>['IN',[5]]])->find();
        if($order){
            $this->ajaxSuccess('数据获取成功',['order_no'=>$order['id'],'href'=>U('orderList',array('status_h'=>5)),'title'=>'您有新的止损订单待确认']);
        }
        $order = M('order')->where(['display'=>1,'status_q'=>['IN',[2]],'status_h'=>['IN',[6]]])->find();
        if($order){
            $this->ajaxSuccess('数据获取成功',['order_no'=>$order['id'],'href'=>U('orderList',array('status_h'=>6)),'title'=>'您有新的递延订单待确认']);
        }
        $order = M('cash')->where(['display'=>1,'status'=>1])->find();
        if($order){
            $this->ajaxSuccess('数据获取成功',['order_no'=>$order['id'],'href'=>U('cashList',array('status'=>1)),'title'=>'您有新的提现订单处理']);//未处理订单
        }
        $order = M('deposit')->where(['display'=>1,'status'=>1])->find();
        if($order){
            $this->ajaxSuccess('数据获取成功',['order_no'=>$order['id'],'href'=>U('depositList',array('status'=>1)),'title'=>'您有新的充值订单处理']);//未处理订单
        }

    }







}