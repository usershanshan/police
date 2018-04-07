<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/2/11
 * Time: 10:17
 */

namespace Home\Model;
use Think\Model;


class TimeModel extends Model
{
    //查看今天是否是工作日    开盘时间
    public function worktime(){
        list($year,$month,$day) = explode('-',date('Y-m-d',time()));
        $res = M('time')->where(['year'=>$year,'month'=>$month,'day'=>$day])->find();
        if(!$res){
            return ['error'=>1,'msg'=>'系统维护'];
        }
        if($res['type'] != 0){
            return ['error'=>1,'msg'=>'非点卖日期'];
        }

        $config = C();

        $time_s_s = strtotime($config['WEB_TIME_S_S']);
        $time_s_e = strtotime($config['WEB_TIME_S_E']);
        $time_x_s = strtotime($config['WEB_TIME_X_S']);
        $time_x_e = strtotime($config['WEB_TIME_X_E']);

        $time = time();

        if(($time<=$time_s_e && $time >= $time_s_s) || ($time>=$time_x_s && $time<=$time_x_e)){
            return ['error'=>0];
        }else{
            return ['error'=>1,'msg'=>'非点卖时段'];
        }


    }


    //st 股票判断
    public function share_st($name){
        if(substr($name,0,2) =='ST' || substr($name,0,2) =='st'){
            return true;
        }elseif(substr($name,0,3 )== '*ST' || substr($name,0,3 )== '*st'){
            return true;//1 高风险
        }else{
            return false;//普通股票
        }

    }


    public function tingpai($todayStartPri,$traNumber){
        if(!floatval($todayStartPri) && !$traNumber){//开盘价格 为0   成交量为0 确定为 停牌
            return true;//停牌
        }else{
            return false;
        }
    }

    //gid 转换
    public function gid($gid){
        $str1 = substr($gid,0,6);
        $str2 = substr($gid,7,2);
        if($str2 == 'SS' ){
            $str2 = 'sh';
        }else{
            $str2 = 'sz';
        }

        return $str2.$str1;
    }


}