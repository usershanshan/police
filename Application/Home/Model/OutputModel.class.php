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


class OutputModel extends Model
{


    /**
     * 生成加钱记录，并加钱
     * @param $order_id 订单号
     * @param $user_id 用户id
     * @param $pid 同级id
     * @param $type 对应备注
     * @param $price 钱
     * @param $account 什么账户
     *
     *
     */
    public function addOutput($user_id,$pid,$type,$price,$account,$phone,$order_id='0'){
        $output = M('output');
        $insert['pid'] = $pid;
        $insert['inputtime'] = time();
        $insert['display'] = 1;
        $insert['user_id'] = $user_id;
        $insert['order_id'] = $order_id;
        $insert['phone'] = $phone;
        switch($type){
            case 1:
                $insert['type'] = '申请点买——管理费';
                break;
            case 2:
                $insert['type'] = '申请点买——保证金';
                break;
            case 3:
                $insert['type'] = '递延费';
                break;
        }
        $insert['price'] = $price;
        $insert['account'] = $account == 'money'?1:2;//加到那个账户
        $r['list_id'] = $output->add($insert);//在支出表中生成记录
        $r[] = M('user')->where(['id'=>$user_id])->setDec($account,$price);//加钱

        $insert_report['user_id'] = $user_id;
        $insert_report['list_id'] = $r['list_id'];
        $insert_report['type'] = 1;
        $insert_report['inputtime'] =  $insert['inputtime'];
        $insert_report['display'] = 1;

        $r[] = M('report')->add($insert_report);
        if(in_array(false,$r)){
            $r = false;
        }else{
            $r = true;
        }
        return $r;
    }





}