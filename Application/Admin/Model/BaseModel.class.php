<?php
namespace Admin\Model;

use Think\Model;

class BaseModel extends Model
{
    const NORMAL_STATUS = 1;
    const DEL_STATUS    = 2;
    const PAGE_LIMIT = 15;
    
    
    const MY_TABLES_ON_STATUS  = 'on';
    const MY_TABLES_OFF_STATUS = 'off';
}