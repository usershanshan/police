<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/1/29
 * Time: 16:58
 */

namespace Home\Model;
use Think\Model;
use Think\Page;


class InputModel extends Model
{
    //给谁 因为啥 加多钱  加到那个账户
    //account    money   red
    public function addInput($user_id,$type,$price,$account,$phone,$order_id = '0'){
        $input = M('input');
        $insert['inputtime'] = time();
        $insert['display'] = 1;
        $insert['user_id'] = $user_id;
        $insert['phone'] = $phone;
        $insert['order_id'] = $order_id;
        switch($type){
            case 1:
                $insert['type'] = '推荐用户注册，获得奖励';
                break;
            case 2:
                $insert['type'] = '点买结算——退回保障金';
                break;
            case 3:
                $insert['type'] = '点买结算——盈利';
                break;
            case 4:
                $insert['type'] = '推荐用户持仓，获得佣金';
                break;
            case 5:
                $insert['type'] = '点买驳回，退还到账户余额';
                break;
            case 6:
                $insert['type'] = '点买驳回，退还到现金红包';
                break;
            case 7:
                $insert['type'] = '抽奖红包';
                break;
            case 8:
                $insert['type'] = '新手红包';
                break;
        }
        $insert['price'] = $price;
        $insert['account'] = $account == 'money'?1:2;//加到那个账户

        $r['list_id'] = $input->add($insert);//在收入表中生成记录
        $r[] = M('user')->where(['id'=>$user_id])->setInc($account,$price);//加钱
        $insert_report['user_id'] = $user_id;
        $insert_report['list_id'] = $r['list_id'];
        $insert_report['type'] = 2;
        $insert_report['display'] = 1;
        $insert_report['inputtime'] =  $insert['inputtime'];
        $r[] = M('report')->add($insert_report);
        if(in_array(false,$r)){
            $r = false;
        }else{
            $r = true;
        }
        return $r;

    }



}