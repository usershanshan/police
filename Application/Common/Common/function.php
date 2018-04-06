<?php
use Home\Api\WxApi;


function createTradeTable($id){
    $sql = "SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `fhg_trade".$id."`;
CREATE TABLE `fhg_trade".$id."` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buy_uid` int(11) NOT NULL,
  `sell_uid` int(11) NOT NULL,
  `type` char(20) NOT NULL DEFAULT '0',
  `num` decimal(20,4) NOT NULL DEFAULT '0.0000',
  `price` decimal(20,4) NOT NULL DEFAULT '0.0000',
  `buy_total` decimal(20,4) NOT NULL DEFAULT '0.0000',
  `sell_total` decimal(20,4) NOT NULL,
  `buy_fee` decimal(20,4) NOT NULL,
  `sell_fee` decimal(20,4) NOT NULL,
  `add_time` int(11) NOT NULL,
  `currency_id` int(11) NOT NULL DEFAULT '0',
      PRIMARY KEY (`id`),
      KEY `ctime` (`add_time`),
      KEY `buyuid` (`buy_uid`),
      KEY `selluid` (`sell_uid`),
      KEY `num` (`num`),
      KEY `price` (`price`),
      KEY `total` (`buy_total`),
      KEY `IDX_COINID_PRICE` (`currency_id`,`price`),
      KEY `coinid` (`currency_id`),
      KEY `IDX_COINID_NUM` (`currency_id`,`num`),
      KEY `IDX_COINID_CTIME` (`currency_id`,`add_time`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
	 ";
    M()->execute($sql);
}


/**
 * 通过IP获取对应城市信息(该功能基于淘宝第三方IP库接口)
 * @param $ip IP地址,如果不填写，则为当前客户端IP
 * @return  如果成功，则返回数组信息，否则返回false
 */
function getIpInfo($ip){
    if(empty($ip)) $ip=get_client_ip();  //get_client_ip()为tp自带函数，如没有，自己百度搜索。此处就不重复复制了
    $url='http://ip.taobao.com/service/getIpInfo.php?ip='.$ip;
    $result = file_get_contents($url);
    $result = json_decode($result,true);
    if($result['code']!==0 || !is_array($result['data'])) return false;
    return $result['data'];
}


function chkNum($n){
    $n = trim($n);
    if(empty($n)) return false;
    if(!is_numeric($n)) return false;
    if(floatval($n) <= 0) return false;
    return true;
}

function num($num,$n=0){
    if(intval($n) <= 0) $n = 0;
    $num = floatval($num);
    if($num <=0 ) return 0;

    $arr = explode('.',$num);
    if(count($arr) >= 2){
        if($n >= 1){
            $arr[1] = substr($arr[1],0,$n);
            return floatval($arr[0].'.'.$arr[1]);
        }else{
            return $num;
        }
    }else{
        return floatval($arr[0]);
    }
}

/**
 * 分表后缀规则
 *
 * @param $n 为默认分几个表 $id
 * @return int
 */
function checkSuffix($id,$n=10){
    return $id%$n;
}
/**
 * 简单对称加密算法之加密
 * 
 * @param String $string
 *        	需要加密的字串
 * @param String $skey
 *        	加密EKY
 */
function encode($string = '', $skey = 'cxphp') {
	$strArr = str_split ( base64_encode ( $string ) );
	$strCount = count ( $strArr );
	foreach ( str_split ( $skey ) as $key => $value )
		$key < $strCount && $strArr [$key] .= $value;
	return str_replace ( array (
			'=',
			'+',
			'/' 
	), array (
			'O0O0O',
			'o000o',
			'oo00o' 
	), join ( '', $strArr ) );
}
/**
 * 简单对称加密算法之解密
 * 
 * @param String $string
 *        	需要解密的字串
 * @param String $skey
 *        	解密KEY
 */
function decode($string = '', $skey = 'cxphp') {
	$strArr = str_split ( str_replace ( array (
			'O0O0O',
			'o000o',
			'oo00o' 
	), array (
			'=',
			'+',
			'/' 
	), $string ), 2 );
	$strCount = count ( $strArr );
	foreach ( str_split ( $skey ) as $key => $value )
		$key <= $strCount && isset ( $strArr [$key] ) && $strArr [$key] [1] === $value && $strArr [$key] = $strArr [$key] [0];
	return base64_decode ( join ( '', $strArr ) );
}

/**
 * description: 递归菜单
 * 
 * @param unknown $array        	
 * @param number $fid        	
 * @param number $level        	
 * @param number $type
 *        	1:顺序菜单 2树状菜单
 * @return multitype:number
 */
function get_column($array, $type = 1, $fid = 0, $level = 0) {
	$column = [ ];
	if ($type == 2)
		foreach ( $array as $key => $vo ) {
			if ($vo ['pid'] == $fid) {
				$vo ['level'] = $level;
				$column [$key] = $vo;
				$column [$key] [$vo ['id']] = get_column ( $array, $type = 2, $vo ['id'], $level + 1 );
			}
		}
	else {
		foreach ( $array as $key => $vo ) {
			if ($vo ['pid'] == $fid) {
				$vo ['level'] = $level;
				$column [] = $vo;
				$column = array_merge ( $column, get_column ( $array, $type = 1, $vo ['id'], $level + 1 ) );
			}
		}
	}
	
	return $column;
}


/**
 * 使用正则验证数据
 * 
 * @access public
 * @param string $value
 *        	要验证的数据
 * @param string $rule
 *        	验证规则
 * @return boolean
 */
function regex($value, $rule) {
	$validate = array (
			'email' => '/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/',
			'url' => '/^http(s?):\/\/(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}(:\d+)?(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/',
			'currency' => '/^\d+(\.\d+)?$/',
			'number' => '/^\d+$/',
			'zip' => '/^\d{6}$/',
			'integer' => '/^[-\+]?\d+$/',
			'double' => '/^[-\+]?\d+(\.\d+)?$/',
			'english' => '/^[A-Za-z]+$/',
			// 'name' => '/[^\D]/g',
			'img' => '/\.(jpg|gif|png)$/i',
			'phone' => '#^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$#',
			'password' =>  '/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/',//'/^[\w.]{6,20}$/',
			'bankcard' => '/^(\d{16}|\d{19})$/',
			'username' => '/^[a-zA-Z][a-zA-Z0-9]{6,20}$/' 
	);
	// 检查是否有内置的正则表达式
	if (isset ( $validate [strtolower ( $rule )] ))
		$rule = $validate [strtolower ( $rule )];
	return preg_match ( $rule, $value ) === 1;
}
 
/**
 * post请求
 */
function vpost($url, $data) { // 模拟提交数据函数
	$curl = curl_init (); // 启动一个CURL会话
	curl_setopt ( $curl, CURLOPT_PROXY, $GLOBALS ['proxy'] );
	curl_setopt ( $curl, CURLOPT_URL, $url ); // 要访问的地址
	curl_setopt ( $curl, CURLOPT_SSL_VERIFYPEER, 0 ); // 对认证证书来源的检查
	curl_setopt ( $curl, CURLOPT_SSL_VERIFYHOST, 1 ); // 从证书中检查SSL加密算法是否存在
	curl_setopt ( $curl, CURLOPT_USERAGENT, USER_AGENT ); // 模拟用户使用的浏览器
	@curl_setopt ( $curl, CURLOPT_FOLLOWLOCATION, 1 ); // 使用自动跳转
	curl_setopt ( $curl, CURLOPT_AUTOREFERER, 1 ); // 自动设置Referer
	curl_setopt ( $curl, CURLOPT_POST, 1 ); // 发送一个常规的Post请求
	curl_setopt ( $curl, CURLOPT_POSTFIELDS, $data ); // Post提交的数据包
	curl_setopt ( $curl, CURLOPT_COOKIEFILE, COOKIE_FILE ); // 读取上面所储存的Cookie信息
	curl_setopt ( $curl, CURLOPT_TIMEOUT, 120 ); // 设置超时限制防止死循环
	curl_setopt ( $curl, CURLOPT_HEADER, 0 ); // 显示返回的Header区域内容
	curl_setopt ( $curl, CURLOPT_RETURNTRANSFER, 1 ); // 获取的信息以文件流的形式返回
	$tmpInfo = curl_exec ( $curl ); // 执行操作
	if (curl_errno ( $curl )) {
		echo 'Errno' . curl_error ( $curl );
	}
	curl_close ( $curl ); // 关键CURL会话
	return $tmpInfo; // 返回数据
}

//高精确度函数库
function cmpute($left,$or,$right){
    /*
     *  算法参考
     *  bcadd:	将二个高精确度数字相加。
     *  bccomp:	比较二个高精确度数字。
     *  bcdiv:	将二个高精确度数字相除。
     *  bcmod:	取得高精确度数字的余数。
     *  bcmul:	将二个高精确度数字相乘。
     *  bcpow:	求一高精确度数字次方值。
     *  bcscale:	配置程序中所有 BC 函数库的默认小数点位数。(已在index.php设置 4 位)
     *  bcsqrt:	求一高精确度数字的平方根。
     *  bcsub:	将二个高精确度数字相减。
     */
    switch ($or){
        case "+" :
            return bcadd($left,$right);
            break;
        case "-":
            return bcsub($left,$right);
            break;
        case "*":
            return bcmul($left,$right);
            break;
        case "/":
            return bcdiv($left,$right);
            break;
    }
}

 
function onPhone($phone){
	return substr($phone, 0, 2).'******'.substr($phone, 8);
}

function mbContent($content){
	return mb_substr($content, 0, 30, 'utf-8');
}

function cutstr_html($string){
    $string = strip_tags($string);
    $string = trim($string);
    $string = ereg_replace("\t","",$string);
    $string = ereg_replace("\r\n","",$string);
    $string = ereg_replace("\r","",$string);
    $string = ereg_replace("\n","",$string);
    $string = ereg_replace(" ","",$string);
    return trim($string);
}

function formartOrderStatus($status){
    switch ($status){
        case 1 :
            return '挂单';
            break;
        case 2:
            return '部分成交';
            break;
        case -1:
            return '撤单';
            break;
    }
    return $status;
}



function formartOutCoinStatus($status){
    switch ($status){
        case 0 :
            return '待处理';
            break;
        case 1:
            return '审核通过';
            break;
        case 2:
            return '审核未通过';
            break;
    }
    return $status;
}

function formartUserRealType($type){
    //1身份证2,军官证3护照4台湾居民通行证5港澳居民通行证9其他
    switch ($type){
        case 1 :
            return '身份证';
            break;
        case 2:
            return '军官证';
            break;
        case 3:
            return '护照';
            break;
        case 4:
            return '台湾居民通行证';
            break;
        case 5:
            return '港澳居民通行证';
            break;
        case 9:
            return '其他';
            break; 
    }
    return $type;
}

/**
 * 获取子孙树————无限极
 * @param   array        $data   待分类的数据
 * @param   int/string   $id     要找的子节点id
 * @param   int          $lev    节点等级
 */
 function gettree($data , $id = 0 ) {
    static $son = array();
    foreach($data as $key => $value) {
        if($value['parent'] == $id) {
            $son[] = $value;
            $this->gettree($data , $value['id'] );
        }
    }
    return $son;
}

//正则
function num_str($str,$type,$num=0)
{
    switch ($type) {
        case 'phone':
            //电话号 正则匹配

//        验证手机号码
//        *
//        移动号段：139 138 137 136 135 134 147 150 151 152 157 158 159 178 182 183 184 187 188
//        联通号段：130 131 132 155 156 185 186 145 176
//        电信号段：133 153 177 173 180 181 189
            if (!preg_match('/13[0123456789]{1}\d{8}|15[012356789]{1}\d{8}|14[57]{1}\d{8}|17[3678]{1}\d{8}|18[0123456789]{1}\d{8}/', $str)) {
                return true;
            }
            break;
        case 'char':
            if (mb_strlen($str) > $num) {
                return true;
            }
            break;
        case 'num':
            if (!preg_match('/^\d+$/', $str)) {
                return true;
            }
            break;
        case 'price':
            if (!preg_match(' /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/', $str)) {
                return true;
            }
            break;
        case 'tel':
            if (!preg_match(' /^(\d{2,4}-?)?\d{7,8}$/', $str)) {
                return true;
            }
            break;
        case 'idcard'://身份证
            if(!preg_match('/^\d{17}(\d|[a-zA-Z])$/i',$str))//18位的
            {
                return true;
            }
            break;
        case 'name'://中文姓名
            if(!preg_match('/^[\x{4e00}-\x{9fa5}]{2,4}$/u',$str))
            {
                return true;
            }
            break;
        case 'bank'://银行卡  16-19位
            if(!preg_match('/^[0-9]{16,19}$/',$str))
            {
                return true;
            }
            break;

    }
}

function required($required = array(),$info){
    if(!$required){
        return array('Error'=>0,'Msg'=>'没有设置必填项');
    }
    foreach($required as $requiredkey => $requiredvalue){
        if(!isset($info[$requiredkey]) || empty($info[$requiredkey])){
            return array('Error' => 1,'Msg' => $requiredvalue);
        }
    }
    return array('Error'=> 0, 'Msg'=>'成功');
}

function getlist($mod,$page,$pagesize,$where,$order = ['inputtime'=>'desc'],$field='*'){
     $mod = M($mod);
    $info = $mod->field($field)->where($where)->order($order)->page($page,$pagesize)->select();
    $count = $mod->where($where)->count();
    $maxpage = ceil($count/$pagesize);
    $Page       = new \Think\Page($count,$pagesize);
    $show       = $Page->show();// 分页显示输出
    return ['list'=>$info,'count'=>$count,'page'=>$show,'maxpage'=>$maxpage];
}



//二维码
function qrcode($text=""){
    //include(realpath('D:\phpStudy\WWW\phpqrcode\qrlib.php'));
    //include(realpath('D:\phpStudy\WWW\phpqrcode\phpqrcode.php'));
    vendor("phpqrcode.phpqrcode");
    $data = $text;
    $filename =dirname( dirname(dirname( dirname( __FILE__ ) )) )."\Uploads\qrcode\z"
        .md5($data).".png";
    $errorCorrectionLevel = 'L';
    $matrixPointSize = 2;
    $margin = 5;
    // import("Common.Extend.phppqrcode",'phpqrcode','.php');
    QRcode::png($data);
   // return "/Uploads/qrcode/z".md5($data).".png";
}

//银行卡隐藏
function bankcard($bank_number)
{
    $str1 = substr($bank_number, 0, -4);

    $str2 = substr($bank_number, -4, 4);
    $bank_number = str_repeat('*', strlen($str1)) . $str2;
    $str = '';
    for ($i = 1; $i <= ceil(strlen($bank_number) / 4); $i++) {
        $str .= substr($bank_number, 4 * ($i - 1), 4) . ' ';
    }

    return $str;
}


function gettime(){
     list($year,$month,$day) = explode('-',date('Y-m-d',time()));
     $info['day'] = strtotime($year.'-'.$month.'-'.$day);
     $info['month'] = mktime ($hour = null, $minute = null, $second = null, $month, 1, $year);
     return $info;
}

//秒变  分钟，小时 天数    默认为详细版   1 为 简洁版
function secsToStr($secs,$type = 0) {
    if($secs>=86400){$days=floor($secs/86400);
        $secs=$secs%86400;
        $r=$days.'天';
        if($type){
            return $r;
        }
    }
    if($secs>=3600){$hours=floor($secs/3600);
        $secs=$secs%3600;
        $r.=$hours.'小时';
        if($type){
            return $r;
        }
    }
    if($secs>=60){$minutes=floor($secs/60);
        $secs=$secs%60;
        $r.=$minutes.'分钟';
        if($type){
            return $r;
        }
    }
    $r.=$secs.'秒';
    //if($secs<>1){$r.='s';}
    return $r;
}



//批量更新  唯一变量   不同字段更新，但是要整齐
/**
 * 批量更新  获得sql语句
 * @param   string        $table   表名
 * @param   string   $field    主键
 * @param   array      $update   待更新数组  一维键为主键值 二维键字段名称  二维值字段值
 * @param   int   $type  0=>主键为int  1=>主键为字符串
 */


function batchUpdate($table,$field,$update,$type = 0){

    $sql = "update `{$table}` set ";
    $sql_arr = [];
    $key = true;
    $field_arr = [];
    foreach($update as $k=>$v){//$k  主键值
        $field_arr[] = $k;
        foreach($v as $kk=>$vv){  //$kk 字段名  $vv 值
            if($key){
                $sql_arr[$kk] = " `{$kk}` = case `{$field}` ";
            }
            if($type){
                $sql_arr[$kk] .= " when '{$k}' then $vv ";
            }else{
                $sql_arr[$kk] .= " when {$k} then {$vv} ";
            }

        }
        $key = false;
    }
    foreach( $sql_arr as $k=>$v){
        $sql .= $v.' end,';
    }

    $sql = trim($sql,',')." where `{$field}` in ( ";
    foreach($field_arr as $k=>$v){

        if(!$type){
            $sql.=$v.',';
        }else{
            $sql.="'".$v."',";
        }

    }
    $sql = trim($sql,',').")";
    return $sql;

}












