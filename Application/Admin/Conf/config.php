<?php
return array(
	//'配置项'=>'配置值'
	'AUTH_CONFIG' => [
		'AUTH_ON'           => true,                      // 认证开关
		'AUTH_TYPE'         => 1,                         // 认证方式，1为实时认证；2为登录认证。
		'AUTH_GROUP'        => 'fhg_auth_group',        // 用户组数据表名
		'AUTH_GROUP_ACCESS' => 'fhg_auth_group_access', // 用户-用户组关系表
		'AUTH_RULE'         => 'fhg_auth_rule',         // 权限规则表
		'AUTH_USER'         => 'fhg_user'             // 用户信息表
	],
	'TMPL_ACTION_ERROR'     =>  APP_PATH.'Admin/message.html', // 默认错误跳转对应的模板文件
	'TMPL_ACTION_SUCCESS'   =>  APP_PATH.'Admin/message.html', // 默认成功跳转对应的模板文件
);