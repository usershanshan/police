<?php
/**
 * Created by PhpStorm.
 * User: zty
 * Date: 2018/2/11
 * Time: 10:17
 */

namespace Home\Model;
use Think\Model;


class ReportModel extends Model
{
    public function add($list_id,$inputtime,$type,$user_id){
        $insert['user_id'] = $user_id;
        $insert['inputtime'] = $inputtime;
        $insert['display'] = 1;
        $insert['type'] = $type;
        $insert['list_id'] = $list_id;

        $r = M('report')->add($insert);
        return $r;
    }
}