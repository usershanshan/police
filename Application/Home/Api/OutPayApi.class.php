<?php
namespace Home\Api;

class OutPayApi
{
    private $srcCode;
    
    private $priKey;
    
    private $mchId;
    
    private $accoutNo;
    
    private $accountName;
    
    private $bankName;
    
    private $cardType;
    
    private $amt;
    private $withdrawUrl;
    private $bankType;
    
 
    public function __construct($accoutNo, $accountName, $idNumber, $bankName,$amt)
    {
        header("Content-type:text/html;charset=utf-8");
        $this->srcCode = 'DMPPfMb1515479070U8Oqx';
        $this->priKey = 'Iq1hykV5td1515479070HOBjD6LsSKy';
        $this->mchId = '2200106'; 
        
        $this->withdrawUrl = 'http://api.doompay.com/wallet/withdraw';
        $this->bankType = '对私';
        $this->cardType = '储蓄卡';
        $this->accountName = $accountName;
        $this->bankName = $bankName;
        $this->accoutNo = $accoutNo;
        $this->amt = $amt;
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
            'out_sn' => $this->_createOutStr(),
            'account_name' => $this->accountName,
            'bank_type' => $this->bankType,
            'card_type' => $this->cardType,
            'account_no' => $this->accoutNo,
            'amt' => $this->amt,
            'head_bank_name' => $this->bankName,
            'noncestr' => $this->_createNonceStr(),
//             'bank_brch' => '',
//             'bank_prov' => '',
//             'bank_city' => '',
//             'subbranch_name' => '',
        ];
        $data['sign'] = $this->_getMyPayInSing($data);
        $data = $this->_formartArrOrStr($data);
        $encrypt_data = $this->encryptionRsa($data);
        unset($data);
        $data = [
            'src_code'=>$this->srcCode,
            'encrypt_data'=>$encrypt_data,
        ];

        $result = $this->_curl($this->withdrawUrl, $data);
        $result = json_decode($result);
        if ($result->respcd != 0000) {
            return ['code'=>-1,'status'=>'error','msg'=>$result->respmsg];
        }
        return ['code'=>1,'status'=>'success','msg'=>'信息审核通过,已发送短信验证码至您的手机,请注意查收','data'=>$result->data];
    }
    
    private function _formartArrOrStr($data){
        ksort($data);
        foreach ($data as $k => $v) {
            $str .= '&' . $k . '=' . $v;
        }
        return ltrim($str, '&');
    }
    
    
    /**
    * sign加密
    * @date: 2018年1月12日
    * @author: [姜鹏]867633862@qq.com
    * @return:
    */
    private function _getMyPayInSing($data)
    {
        $data = $this->_formartArrOrStr($data);
        $data . '&key=' . $this->priKey;
        return strtoupper(md5($data));
    }
    /**
    * curl
    * @date: 2018年1月12日
    * @author: [姜鹏]867633862@qq.com
    * @return:
    */
    private function _curl($url, $data)
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
    private function _createOutStr()
    {
        $yCode = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J');
        $orderSn = $yCode[intval(date('Y')) - 2011] . strtoupper(dechex(date('m'))) . date('d') . substr(time(), -5) . substr(microtime(), 2, 5) . sprintf('%02d', rand(0, 99));
        return $orderSn;
    }
    
    
    private function _createNonceStr($length = 16) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $str = "";
        for($i = 0; $i < $length; $i ++) {
            $str .= substr ( $chars, mt_rand ( 0, strlen ( $chars ) - 1 ), 1 );
        }
        return $str;
    }
    
    /**
     * 加密
     * @param $originalData
     * @return string|void
     */
    function encryptionRsa($originalData){

        $public_key = '-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCYiVJS6Ceg+7yVJ19FTAI4ZPxL
2NDd2qv/6UlfE95LSj3zFxSZGb/dIVS9QTm7pgalHc5qfRfIs4+ktKJas255wbzD
5QVq43zrnuvRCtlZZ5qejogBvFAXsFP+cMxI9aD1/pe5Zef4OLgD7OMLqY1veyMo
BBPHepqdNRANjQ+ClwIDAQAB
-----END PUBLIC KEY-----';
        $crypto = '';
    
        foreach (str_split($originalData, 117) as $chunk) {

            openssl_public_encrypt($chunk, $encryptData, $public_key);//没有这个函数？？
            $crypto .= $encryptData;
        }
        return base64_encode($crypto);
    }
    
    /**
     * 私钥解密
     * @param $encryptData
     */
    function decrypt($encryptData){
        $private_key = '-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQC8BS13TGxiAHG6Riw7ctTn6i6+4+UxnW7hf7duTcnW5LjXqlpw
yblcoptpx3Y/of1msXr95I0+LeHs07fbi3OYYJeWL2SpYEpiAclabmueqHQUsCox
SCeommxHOSLskK0UB+SXyz32gds3LXPbEseYcHs/PIqxSklsZXsk0yoUqQIDAQAB
AoGBAJZQZVrcxEFNLZ7H/xC/6ypFdH2z4EXcIQsyeck7c0PTs1rnnEpTW1eNwEW+
6vBQZy+0cCmOkMTHFbmqQXDJee1U9fZkAThB6Cn7s645XiCjqrpYHVg9mHtNQBI4
OtBT7LeTtVdJLhGJm0+o91u0QqM4gtmGXzpOtGXhD3nlUQkBAkEA9w7JGY/jYwL0
9pz/6SF1WXWhgbTuZ8gbEwB1XOEreyMluCVGOMWrCGqaCJ7fheNoxIZ042cy/G4N
eIOL4f5esQJBAMLTWxB/WqWhgXzQlYUBLGXGnK300JtH6OPHzCbpJdS8HPYkcgNU
x4rthkkZ32sWg99T7ng/1sV5UIiy3ZFXQ3kCQQCD1Oz0afaBUAOdURuxsDvpV76t
8vlAgeQImLcHr9O+6ntnLuSwyLHCVPgK35QQ4s92BvV6nwfy8VrY0wEiv9SRAkAb
hxma3yPDu2o8ZIx72oqXZtTEj47aIfL6HETwSokZ4eqFrOifJ9959c2/jnRPAUNo
zscnHn4OMPH8HqnH23ihAkB3OQWadgJYpI33p8ywt5eVUFe3FORP6PT1SGLV3WPS
UPEFGXzIXGjLAHD/ttqewWvxsxCWq7VTiQ4GuLxmzlGL
-----END RSA PRIVATE KEY-----';
        $crypto = '';
        foreach (str_split(base64_decode($encryptData), 128) as $chunk) {
    
            openssl_private_decrypt($chunk, $decryptData, $private_key);
    
            $crypto .= $decryptData;
        }
    
        return $crypto;
    }
}