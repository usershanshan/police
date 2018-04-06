<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/3/1
 * Time: 10:30
 */

namespace Home\Controller;

use Home\Model\VotesModel;


class VoteController extends AfterLandingController
{
    public function __construct()
    {
        parent::__construct();
        $this->checkInLogin();//不登录先登陆

    }

    //获取
    public function vote(){
        $user_id = $this->userId();//用户id
        $user_arr = M('user')->field(['phone'])->where(['id'=>$user_id])->find();
        $id = I('post.id');//活动id

        $vote_arr = M('vote_act')->where(['display'=>1,'id'=>$id])->find();
        list($year,$month,$day) = explode('-',date('Y-m-d',time()));
        $today =  mktime ($hour = null, $minute = null, $second = null, $month, $day, $year);
        $record_num = M('vote_record')->where(['user_id'=>$user_id,'display'=>1,'inputtime'=>['GT',$today]])->count();//今日已抽
        $vote_arr['record_num'] = $record_num;
        $order_num = M('order')->where(['inputtime'=>['GT',$today],'status_h'=>'2'])->count();//线下，已付款  获得新得抽奖机会

        $vote_arr['phone'] = onPhone($user_arr['phone']);
        if($vote_arr['free'] >= 0){//每日免费次数   非无限
            if($vote_arr['day'] >= 0){//每日上限  非无限
                //今日可抽奖次数
                $vote_arr['vote_num'] = ($vote_arr['day'] >= ($vote_arr['free'] +$order_num))?($vote_arr['free'] +$order_num):$vote_arr['day'];
                //今日剩余抽奖次数
                $vote_arr['res_num'] = $vote_arr['vote_num'] - $vote_arr['record_num'];

            }else{
                $vote_arr['vote_num'] = $vote_arr['free'] +$order_num;
                $vote_arr['res_num'] = $vote_arr['vote_num'] - $vote_arr['record_num'];

            }
        }else{//每日免费次数是无限得，  上限必须是无限，添加得时候做判断
            $vote_arr['vote_num'] = '无限';
            $vote_arr['res_num'] = '无限';
        }

        $option_arr = M('vote_option')->where(['display'=>1,'act_id'=>$id])->select();

        $this->ajaxSuccess('获取数据成功',['list'=>$option_arr,'vote'=>$vote_arr]);

    }

    //抽奖按钮
    public function vote_button(){
        $user_id = $this->userId();//用户id
        $user_arr = M('user')->field(['phone'])->where(['id'=>$user_id])->find();
        $id = I('post.id');//活动id
        $vote_arr = M('vote_act')->where(['display'=>1,'id'=>$id])->find();
        list($year,$month,$day) = explode('-',date('Y-m-d',time()));
        $today =  mktime ($hour = null, $minute = null, $second = null, $month, $day, $year);
        $record_num = M('vote_record')->where(['user_id'=>$user_id,'display'=>1,'inputtime'=>['GT',$today]])->count();//今日已抽
        $vote_arr['record_num'] = $record_num;
        $order_num = M('order')->where(['inputtime'=>['GT',$today],'status_h'=>'2'])->count();//线下，已付款  获得新得抽奖机会
        if($vote_arr['free'] >=0){//每日免费次数   非无限
            if($vote_arr['day'] >= 0){//每日上限  非无限
                //今日可抽奖次数
                $vote_arr['vote_num'] = ($vote_arr['day'] >= ($vote_arr['free'] +$order_num))?($vote_arr['free'] +$order_num):$vote_arr['day'];
                //今日剩余抽奖次数
                $vote_arr['res_num'] = $vote_arr['vote_num'] - $vote_arr['record_num'];

            }else{
                $vote_arr['vote_num'] = $vote_arr['free'] +$order_num;
                $vote_arr['res_num'] = $vote_arr['vote_num'] - $vote_arr['record_num'];

            }
        }else{//每日免费次数是无限得，  上限必须是无限，添加得时候做判断
            $vote_arr['vote_num'] = 1;
            $vote_arr['res_num'] = 1;//可以抽
        }

        if($vote_arr['res_num'] >0 ){//可以抽奖
            $option_arr = M('vote_option')->where(['display'=>1,'act_id'=>$id])->select();//选项数组
            foreach($option_arr as $k=>$v){
                $option_arrr[$v['id']] = $v;
            }

            $function_arr = M('vote_function')->where(['display'=>1])->select();
            foreach($function_arr as $k=>$v){
                $function_arrr[$v['id']] = $v;
            }

            $option_arr = $option_arrr;

            if($vote_arr['type'] == 1){//数字型
                $count = M('vote_option')->field(['SUM(chance)','SUM(record)'])->where(['display'=>1,'act_id'=>$id])->where('record<chance ')->find();
                $count = $count['sum(chance)'] - $count['sum(record)'];
            }else{
                $count = M('vote_option')->field(['SUM(chance)'])->where(['display'=>1,'act_id'=>$id])->find()['sum(chance)'];
            }

            if(!$count){
                $this->ajaxError('活动已结束');
            }



            $res = rand(1,$count);//中奖号码
            $sum = 0;//技术君
            foreach($option_arr as $k=>$v){
                if($vote_arr['type'] == 1){//数字型   有奖项抽中，概率变，抽没，概率为0
                    if($v['record'] >= $v['chance'] ){//抽没了
                        continue;
                    }else{
                        $sum += $v['chance'] -$v['record'];
                    }
                }else{//概率型
                    $sum += $v['chance'];
                }



                if($sum >= $res){
                    $res_id = $v['id'];
                    break;
                }
            }


            M()->startTrans();



            if($option_arr[$res_id]['functions']){//抽奖有功能 先加功能
                $r[] =  D('Votes')->$function_arrr[$option_arr[$res_id]['functions']]['functions']($option_arr[$res_id]['functions_field']);

            }



            $insert['display'] = 1;
            $insert['inputtime'] = time();
            $insert['user_id'] = $user_id;
            $insert['phone'] = $user_arr['phone'];
            $insert['act_id'] = $id;
            $insert['option_id'] = $res_id;
            $insert['title'] = $option_arr[$res_id]['title'];
            $insert['status'] = $option_arr[$res_id]['functions']?2:1;//有功能，则已发放  每功能，则未发放
            $insert['show'] = $option_arr[$res_id]['add'];//1-显示  2-不显示

            $r[] = M('vote_record')->add($insert);//添加记录


            $r['record'] = M('vote_option')->where(['id'=>$res_id])->setInc('record',1);//增加抽奖记录
            if(in_array(false,$r)){
                echo json_encode($r);
                die;
                M()->rollback();
                $this->ajaxError('网络繁忙');
            }else{
                M()->commit();
                $this->ajaxSuccess($option_arrr[$res_id]['title'],['id'=>$res_id]);
            }


        }else{
            $this->ajaxError('您当前抽奖机会已用完');
        }
    }

    //个人抽奖记录
    public function record_user(){
        $user_id = $this->userId();//用户id
        $page = I('post.page')?I('post.page'):1;
        $pagesize = I('post.pagesize')?I('post.pagesize'):10;
        $data = getlist('vote_record',$page,$pagesize,['display'=>1,'user_id'=>$user_id], ['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = date('m-d H:i:s',$v['inputtime']);
                $data['list'][$k]['phone'] = onPhone($v['phone']);
            }
        }
        $this->ajaxSuccess('数据获取成功',['list'=>$data['list'],'count'=>$data['count'],'maxpage'=>$data['maxpage']]);



    }
    //滚动
    public function record_roll(){
        $page = I('post.page')?I('post.page'):1;
        $pagesize = I('post.pagesize')?I('post.pagesize'):10;
        $data = getlist('vote_record',$page,$pagesize,['display'=>1], ['inputtime'=>'desc']);
        if($data['count']){
            foreach($data['list'] as $k=>$v){
                $data['list'][$k]['inputtime'] = secsToStr(time()-$v['inputtime'],1);
                $data['list'][$k]['phone'] = onPhone($v['phone']);
            }
        }
        $this->ajaxSuccess('数据获取成功',['list'=>$data['list'],'count'=>$data['count'],'maxpage'=>$data['maxpage']]);
    }



}