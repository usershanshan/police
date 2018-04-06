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


class VotesModel
{
    public function red_add($price){
        $user_id = session('USER_INFO')['id'];
        $user_arr = M('user')->field(['phone'])->where(['id'=>$user_id])->find();
        $r = D('Input')->addInput($user_id,7,$price,'red',$user_arr['phone'],$order_id = '0');
        return $r;
    }



}