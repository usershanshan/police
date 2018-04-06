<?php
namespace Home\Api;

class InPayApi
{

    private $srcCode;

    private $priKey;

    private $mchId;

    private $fastUrl;

    private $signSn;

    private $accoutNo;

    private $idType;

    private $accountName;

    private $mobile;

    private $idNumber;

    private $bankName;

    private $tradeUrl;
    
    private $cardType;
    
    private $totalFee;
    
    private $tradeType;
    
    private $goodsName;

    public function __construct($accoutNo, $mobile, $accountName, $idNumber, $bankName,$totalFee)
    {
        header("Content-type:text/html;charset=utf-8");
        $this->srcCode = 'DMPPfMb1515479070U8Oqx';//写死
        $this->priKey = 'Iq1hykV5td1515479070HOBjD6LsSKy';
        $this->mchId = '2200106';//写死
        $this->fastUrl = 'http://api.doompay.com/pay/fast/sign';//第一次支付请求url
        $this->tradeUrl = 'http://api.doompay.com/trade/pay';
        $this->idType = '身份证';//写死
        $this->tradeType = '70103';//快捷支付
        $this->goodsName = '测试商品';//写死
        $this->cardType = '借记卡';//卡列别写死
        $this->accountName = $accountName;
        $this->idNumber = $idNumber;
        $this->bankName = $bankName;
        $this->accoutNo = $accoutNo;
        $this->mobile = $mobile;
        $this->totalFee = $totalFee;
    }
    /**
    * 准备支付（预下单）
    * @date: 2018年1月12日
    * @author: [姜鹏]867633862@qq.com
    * @return:
    */
    public function payFast()
    {
        $data = [
            'src_code' => $this->srcCode,//商户唯一标识==写死
            'mch_id' => $this->mchId,//商户号==写死
            'total_fee' => $this->totalFee,//总金额
            'bankName' =>  $this->bankName,//银行名称
            'cardType' =>  $this->cardType,//卡类别
            'accoutNo' => $this->accoutNo,//银行卡号
            'accountName' => $this->accountName,//开户名称
            'idType' => $this->idType,//证件类型==写死
            'idNumber' => $this->idNumber,//身份证号
            'Mobile' => $this->mobile,//预留手机号
        ];
        $data['sign'] = $this->_getMyPayInSing($data);//签名
        $result = $this->_curl($this->fastUrl, $data);
        $result = json_decode($result);
        if ($result->respcd != 0000) {
            return ['code'=>-1,'status'=>'error','msg'=>$result->respmsg];
        }
        return ['code'=>1,'status'=>'success','msg'=>'信息审核通过,已发送短信验证码至您的手机,请注意查收','data'=>$result->data];
    }
    /**
    * 下单交易(发起交易请求)
    * @date: 2018年1月12日
    * @author: [姜鹏]867633862@qq.com
    * @return:
    */
    public function tradePay($signSn,$code)
    {
        $data = [
            'src_code' => $this->srcCode,
            'mchid' => $this->mchId,
            'total_fee' => $this->totalFee,
            'goods_name' => $this->goodsName,//测试商品
            'trade_type' => $this->tradeType,
            'time_start' => date('YmdHis', time()),
            'out_trade_no' => $this->_createNonceStr()//随机订单号
        ];
        $extend = [
            'accoutNo' => $this->accoutNo,
            'idType' => $this->idType,
            'Mobile' => $this->mobile,
            'cardType' => $this->cardType,
            'accountName' => $this->accountName,
            'idNumber' => $this->idNumber,
            'bankName' => $this->bankName,
            'code' => $code,
            'signSn' => $signSn//商户交易订单号
        ];
        $data['extend'] = json_encode($extend,JSON_UNESCAPED_UNICODE);
        $data['sign'] = $this->_getMyPayInSing($data);
        $result = $this->_curl($this->tradeUrl, $data);

        $result = json_decode($result,true);
        if ($result['respcd'] != 0000) {
            return ['code'=>-1,'status'=>'error','msg'=>$result['respmsg']];
        }
        return ['code'=>1,'status'=>'success','msg'=>'充值申请成功,等待确认','data'=>$result['data']];
    }
    /**
    * sign加密
    * @date: 2018年1月12日
    * @author: [姜鹏]867633862@qq.com
    * @return:
    */
    private function _getMyPayInSing($data)
    {
        ksort($data);
        foreach ($data as $k => $v) {
            $str .= '&' . $k . '=' . $v;
        }
        $str = ltrim($str, '&');
        // $data = http_build_query( $data );
        $data = $str . '&key=' . $this->priKey;
        return strtoupper(md5($data));
    }
    /**
    * curl
    * @date: 2018年1月12日
    * @author: [姜鹏]867633862@qq.com
    * @return:
    */
    private function _curl($url, $data)//做什么的
    {
        $curl = curl_init(); // 启动一个CURL会话
        curl_setopt($curl, CURLOPT_PROXY, $GLOBALS['proxy']);
        curl_setopt($curl, CURLOPT_URL, $url); // 要访问的地址
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检查
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 1); // 从证书中检查SSL加密算法是否存在
        curl_setopt($curl, CURLOPT_USERAGENT, USER_AGENT); // 模拟用户使用的浏览器
        @curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // 使用自动跳转
        curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer
        curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data); // Post提交的数据包
        curl_setopt($curl, CURLOPT_COOKIEFILE, COOKIE_FILE); // 读取上面所储存的Cookie信息
        curl_setopt($curl, CURLOPT_TIMEOUT, 120); // 设置超时限制防止死循环
        curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 获取的信息以文件流的形式返回
        $tmpInfo = curl_exec($curl); // 执行操作
        if (curl_errno($curl)) {
            echo 'Errno' . curl_error($curl);
        }
        curl_close($curl); // 关键CURL会话
        return $tmpInfo; // 返回数据
    }
    /**
    * 随机订单号码
    * @date: 2018年1月12日
    * @author: [姜鹏]867633862@qq.com
    * @return:
    */
    private function _createNonceStr()
    {
        $yCode = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J');
        $orderSn = $yCode[intval(date('Y')) - 2011] . strtoupper(dechex(date('m'))) . date('d') . substr(time(), -5) . substr(microtime(), 2, 5) . sprintf('%02d', rand(0, 99));
        return $orderSn;
    }
}