<?php
return array(
	//'配置项'=>'配置值'
    //数据库配置信息
    'DB_TYPE'                       => 'mysql', // 数据库类型
    'DB_HOST'                       => 'localhost', // 服务器地址
    'DB_NAME'                       => 'police', // 数据库名
	'DB_PREFIX' 					=> 'fhg_',
    'DB_USER'                       => 'root', // 用户名
    'DB_PWD'                        => 'root', // 密码
    'DB_PORT'                       =>  3306, // 端口
    'DB_CHARSET'                    =>  'utf8', // 字符集
    'DATA_CACHE_TIME'               =>  600,
	
		
	
	'URL_CASE_INSENSITIVE' => false,
	'URL_MODEL' => 2,
	'URL_HTML_SUFFIX' => 'html',
	'URL_ROUTER_ON' => true, // 是否开启URL路由

	'SHOW_ERROR_MSG' 		=>	false,
	'SHOW_PAGE_TRACE' 		=>	false,
    'TMPL_ACTION_SUCCESS' 	=> './Application/Common/dispatch_jump.html',
    'TMPL_ACTION_ERROR' 	=> './Application/Common/dispatch_jump.html',
    
		
    //------------------------短信配置----------------------------//
    'PHONE_REG_NAME'		=> 'SEND_CODE_REG',
    'PHONE_REG_MSG'			=> '注册',
    
    'PHONE_SAVE_NAME'		=> 'SEND_SAVE_PHONE',
    'PHONE_SAVE_MSG'		=> '更换绑定手机号码',
    
    'PHONE_OUT_COIN_NAME'		=> 'SEND_OUT_COIN_PHONE',
    'PHONE_OUT_COIN_MSG'		=> '转出虚拟币',
    
    
    
    'PHONE_RESET_PWD_NAME'		=> 'SEND_CODE_RESET',
    'PHONE_RESET_PWD_MSG'		=> '更改密码',
    
    
    'PHONE_USER'			=> '91niugu',
    'PHONE_PASS'			=> '123456',
    'PHONE_SEND_NAME'		=> '盛世恒安',
    //---------------------交易时间------------------------------//


    'WEB_TIME_S_S' =>'09:30:00',
    'WEB_TIME_S_E' =>'11:30:00',
    //'WEB_TIME_S_E' =>'12:30:00',
    'WEB_TIME_X_S' =>'13:00:00',
    'WEB_TIME_X_E' =>'15:00:00',

);