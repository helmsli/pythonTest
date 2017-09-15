/*数据交互*/
/**
*@param obj,callBack
* obj={
*   request.username:"",
*   request.password:""
* }
* @Description  登录
* **/
function login(obj,callBack) {
    var options ={
        "url": "loginNew",
        "data": obj,
         callBack: function(data) {
             callBack(data);
         },
         errCallBack:function(e)
         {
             console.log("服务器异常");
         }
    };
       
    var returnData={
    			name:"战范德萨",
    			age:82,
    			sex:0,
    			//result:10001,
    			result:0,
    			errorMsg:"10001"
    }
    setTimeout(function(){
    	callBack(returnData);
    },2000);
    
    //ajax调用函数
    //requestAjax(options);
}











/**   ------------------------------------------------用户模块 ---start----------------------------------- **/
/**
*@param obj,callBack
* obj={
*   request.keywords:"",
*   page.pageNum:1,
*   page.pageSize:10
* }
* @Description 查询用户列表
* **/
function getUserList(obj,callBack) {
    var options ={
        "url": "management/userNew/list",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 *  @Description 新增用户
 *@param obj,callBack
 * obj={
*   request.username:"",
*   request.realname:1,
*   request.phone:10，
*   request.email:"459489@qq.com",
*   request.password:"123456"
* }
 *
 * **/
function createUser(obj,callBack) {
    var options ={
        "url": "management/userNew/create",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}



/**
 * 修改用户页面 保存按钮
 * 参数：obj ,callBack
 * obj={
 * 		"request.username":"登录名称",
		"request.realname":"真实名称",
		"request.phone":"13512378944",
		"request.email":"459489@qq.com",
		"request.status":"enabled "
	}
	return callBack(data);
 * **/
function updateUser(obj, callBack){
	var options ={
        "url": "management/userNew/update",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}


/**
 * 获取用户角色
 * 参数：obj ,callBack
 * obj={
 * 		"request.id":1 
	}
	return callBack(data);
 * **/
function getRole(obj, callBack){
	var options ={
        "url": "management/userNew/edit/getRoles",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * 获取所有角色
 * 参数：obj ,callBack
 * obj={}
	return callBack(data);
 * **/
function getAllRoles(obj, callBack){
	var options ={
        "url": "management/userNew/edit/getAllRoles",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}



/**
 * 分配用户角色 保存按钮
 * 参数：obj ,callBack
 * obj={
 * 		"request.id":2,
		"request.roleIds":[3,4]
	}
	return callBack(data);
 * **/
function assignRole(obj, callBack){
	var options ={
        "url": "management/userNew/create/userRole",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * 删除用户
 * 参数：obj ,callBack
 * obj={
 * 		"request.id":2 
	}
	return callBack(data);
 * **/
function assignRole(obj, callBack){
	var options ={
        "url": "management/userNew/delete",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}
/***
 * obj= {
 * 	request.roleId:1001//角色ID
 * }
 * @param {Object} obj
 * @param {Object} callBack
 * data = {
 * 	result:0,
 *  userList:[
 *    {"btsId":"85122852",
	   "btsName":"李role_01_01",
	   "btsType":"单板音"
	  }
 *   ]
 * }
 */
function getRoleUserList(obj, callBack){
	var options ={
        "url": "management/userNew/roleUserList",
        "data": obj,
        "async":false,//同步获取
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
};
/***
 * obj= {
 * 	request.roleId : 0,
 *  request.user.id :'heeh',
 *  request.user.name :'heeh',
 *  request.user.password :'123456',
 * }
 * @param {Object} obj
 * @param {Object} callBack
 */
function createOrUpdateUserByRole(obj,callBack){
	var options ={
        "url": "management/userNew/createUserByRole",
        "data": obj,
        "async":false,//同步获取
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}
function deleteUser(obj,callBack){
	var options ={
        "url": "management/userNew/deleteUser",
        "data": obj,
        "async":false,//同步获取
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}


/**   ------------------------------------------------用户模块 ---end----------------------------------- **/








/**   ------------------------------------------------角色模块 ---start----------------------------------- **/
/**
 * 查询角色列表
 * 参数：obj ,callBack
 * obj={
 * 		"request.keywords":"",
		"page.pageNum":1,
		"page.pageSize":10

	}
	return callBack(data);
	data={
		result:0,0表示请求成功，1表示请求是失败
		roleList:[
			{
				"name": "客服",
				"id": "role_01_01",
			},
			{
				"name": "采购",
				"id": "role_01_02",
			},
			{
				"name": "运营",
				"id": "role_01_03",
			}
		]
	}
 * **/
function getRoleList(obj, callBack){
	var options ={
        "url": "management/roleNew/list",
        "data": obj,
        "async":false,//同步获取
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * 获取菜单模块信息
 * 参数：obj ,callBack
 * obj={
	 
	}
	return callBack(data);
 * **/
function getModules(obj, callBack){
	var options ={
        "url": "management/roleNew/edit/getModules",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}



/**
 * 获取角色权限信息
 * 参数：obj ,callBack
 * obj={
		"request.id":1 
	}
	return callBack(data);
 * **/
function getRolePermissions(obj, callBack){
	var options ={
        "url": "management/roleNew/edit/getRolePermissions",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}



/**
 * 新增角色页面 保存按钮
 * 参数：obj ,callBack
 * obj={
		"request.name":"角色名称",
		"request.permissionList":["Management:view", "Management:save "]

	}
	return callBack(data);
 * **/
function createRole(obj, callBack){
	var options ={
        "url": "management/roleNew/create",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * 修改角色页面 保存按钮
 * 参数：obj ,callBack
 * obj={
		"request.id":2,
		"permissionList":["Management:view", "Management:save "]
	}
	return callBack(data);
 * **/
function updateRole(obj, callBack){
	var options ={
        "url": "management/roleNew/update",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}





/**
 * 删除角色
 * 参数：obj ,callBack
 * obj={
		"request.id":2
	}
	return callBack(data);
 * **/
function deleteRole(obj, callBack){
	var options ={
        "url": "management/roleNew/delete",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}
/***
 * 查询角色对应权限
 * obj={
 * 	request.id:roleId
 * }
 * @param {Object} obj
 * @param {Object} callBack
 */
function showRolePermission(obj,callBack){
	var options ={
        "url": "management/roleNew/showRolePermission",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}
/**
 * obj={
 * 	request.roleId:1,
 *  request.permissionList:[001,002,003]
 * }
 * @param {Object} obj
 * @param {Object} callBack
 */
function saveRolePermission(obj,callBack){
	var options ={
        "url": "management/roleNew/saveRolePermission",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}
/***
 * 获取权限树模型
 * obj={}
 * @param {Object} obj
 * @param {Object} callBack
 */
function getPermissionTree(obj,callBack){
	var options ={
        "url": "management/roleNew/getPermissionTree",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
	
}
/**   ------------------------------------------------角色模块 ---end----------------------------------- **/







/**   ------------------------------------------------BTS分组模块 ---start----------------------------------- **/
/**
 * 获取bts分组信息
 * 参数：obj ,callBack
 * obj={

	}
	return callBack(data);
 * **/
function getNodeList(obj, callBack){
	var options ={
        "url": "managementNew/bts/getOrgs",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * 新增分组页面 保存按钮
 * 参数：obj ,callBack
 * obj={
		"request.id":1121,
		"request.pId":112,
		"request.name":"节点名称"
	}
	return callBack(data);
 * **/
function createBtsOrg(obj, callBack){
	var options ={
        "url": "managementNew/btsorg/create",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}



/**
 * 编辑分组页面 保存按钮
 * 参数：obj ,callBack
 * obj={
		"request.id":1121,
		"request.name":"节点名称"
	}
	return callBack(data);
 * **/
function updateBtsOrg(obj, callBack){
	var options ={
        "url": "managementNew/btsorg/update",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * 删除分组
 * 参数：obj ,callBack
 * obj={
		"request.id":1121
	}
	return callBack(data);
 * **/
function deleteBtsOrg(obj, callBack){
	var options ={
        "url": "managementNew/btsorg/delete",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * 查询已经分组的基站列表 
 * 参数：obj ,callBack
 * obj={
		"request.keywords":"admin",
		"request.orgId":"分组id",
		"page.pageNum":1,
		"page.pageSize":10
	}
	return callBack(data);
 * **/
function getStatListForNode(obj, callBack){
	var options ={
        "url": "managementNew/bts/list_assigned",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * 查询未分组的基站列表 
 * 参数：obj ,callBack
 * obj={
		"request.keywords":"admin",
		"request.orgId":"分组id",
		"page.pageNum":1,
		"page.pageSize":10
	}
	return callBack(data);
 * **/
function getBtsListNotAssigned(obj, callBack){
	var options ={
        "url": "managementNew/bts/list_notassigned",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}





/**
 * 添加基站页面 添加按钮
 * 参数：obj ,callBack
 * obj={
		"request.orgId":分组id,
		"request.btsIds": [8230006]
	}
	return callBack(data);
 * **/
function saveBts(obj, callBack){
	var options ={
        "url": "managementNew/bts/save",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * 删除基站
 * 参数：obj ,callBack
 * obj={
		"request.id":5，
		"request.orgId":5
	}
	return callBack(data);
 * **/
function deleteBts(obj, callBack){
	var options ={
        "url": "managementNew/bts/delete",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}


/**   ------------------------------------------------BTS分组模块 ---end----------------------------------- **/






/**   ------------------------------------------------SAG分组模块 ---start----------------------------------- **/
/**
 * 获取sag分组信息
 * 参数：obj ,callBack
 * obj={

	}
	return callBack(data);
 * **/
function getSagNodeList(obj, callBack){
	var options ={
        "url": "managementNew/sag/getOrgs",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * sag新增分组页面 保存按钮
 * 参数：obj ,callBack
 * obj={
		"request.id":1121,
		"request.pId":112,
		"request.name":"节点名称"
	}
	return callBack(data);
 * **/
function createSagOrg(obj, callBack){
	var options ={
        "url": "managementNew/sagorg/create",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}



/**
 * sag编辑分组页面 保存按钮
 * 参数：obj ,callBack
 * obj={
		"request.id":1121,
		"request.name":"节点名称"
	}
	return callBack(data);
 * **/
function updateSagOrg(obj, callBack){
	var options ={
        "url": "managementNew/sagorg/update",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * sag删除分组
 * 参数：obj ,callBack
 * obj={
		"request.id":1121
	}
	return callBack(data);
 * **/
function deleteSagOrg(obj, callBack){
	var options ={
        "url": "managementNew/sagorg/delete",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * 查询已经分组的核心网列表 
 * 参数：obj ,callBack
 * obj={
		"request.keywords":"admin",
		"request.orgId":"分组id",
		"page.pageNum":1,
		"page.pageSize":10
	}
	return callBack(data);
 * **/
function getSagListAssigned(obj, callBack){
	var options ={
        "url": "managementNew/sag/list_assigned",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * 查询未分组的核心网列表 
 * 参数：obj ,callBack
 * obj={
		"request.keywords":"admin",
		"request.orgId":"分组id",
		"page.pageNum":1,
		"page.pageSize":10
	}
	return callBack(data);
 * **/
function getSagListNotAssigned(obj, callBack){
	var options ={
        "url": "managementNew/sag/list_notassigned",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}





/**
 * 添加核心网页面 添加按钮
 * 参数：obj ,callBack
 * obj={
		"request.orgId":分组id,
		"request.sagIds": [8230006],
	}
	return callBack(data);
 * **/
function saveSag(obj, callBack){
	var options ={
        "url": "managementNew/sag/save",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}




/**
 * 删除核心网
 * 参数：obj ,callBack
 * obj={
		"request.id":5，
		"request.orgId":5
	}
	return callBack(data);
 * **/
function deleteSag(obj, callBack){
	var options ={
        "url": "managementNew/sag/delete",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}



/**   ------------------------------------------------SAG分组模块 ---end----------------------------------- **/







/**   ------------------------------------------------报表模块 ---start----------------------------------- **/
/**
 * 查询报表下载列表页面 
 * 参数：obj ,callBack
 * obj={
		"request.keywords":"",
		"page.pageNum":1,
		"page.pageSize":10
	}
	return callBack(data);
 * **/
function getReportList(obj, callBack){
	var options ={
        "url": "managementNew/report/list",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}



/**
 * 报表下载,超链接
 * http://localhost:8080/stat-web/managementNew/report/download?reportId=1401
 * **/

 
 
 
 
 /**
 * 查询报表模板列表页面
 * 参数：obj ,callBack
 * obj={
		"request.keywords":"",
		"page.pageNum":1,
		"page.pageSize":10
	}
	return callBack(data);
 * **/
function getTemplateList(obj, callBack){
	var options ={
        "url": "managementNew/template/list",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}
 
 
 
 
 
  /**
 * 获取设备的树形 组织数据获取 设备、统计指标的 树形组织数据
 * 参数：obj ,callBack
 * obj={
		"request.templateType":"SAG"
	}
	return callBack(data);
 * **/
function getDeviceKpiOrg(obj, callBack){
	var options ={
        "url": "managementNew/template/ getDeviceKpiOrg",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}
 
 
 
  /**
 * 新增SAG模板页面 保存按钮
 * 参数：obj ,callBack
 * obj={
		"request.templateType":"SAG",		//必须写SAG
		"request.name":"模板名称",
		"request.kpiIds":   ["指标id","id2"],
		"request.deviceIds":["设备id","id2"]
	}
	return callBack(data);
 * **/
function saveSagTemplate(obj, callBack){
	var options ={
        "url": "managementNew/template/save",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}
 
 
 
  /**
 * 新增BTS模板页面 保存按钮
 * 参数：obj ,callBack
 * obj={
		"request.templateType":"BTS",   //必须写BTS
		"request.name":"模板名称",
		"request.kpiIds":   ["指标id","id2"],
		"request.deviceIds":["设备id","id2"]
	}
	return callBack(data);
 * **/
function saveBtsTemplate(obj, callBack){
	var options ={
        "url": "managementNew/template/save",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}
 
 
 
   /**
 * 模板编辑页面 保存按钮
 * 参数：obj ,callBack
 * obj={
		"request.id":"1",
		"request.templateType":"",			//BTS 或者 SAG
		"request.name":"模板名称",
		"request.kpiIds":   ["指标id","id2"],
		"request.deviceIds":["设备id","id2"]
	}
	return callBack(data);
 * **/
function updateTemplate(obj, callBack){
	var options ={
        "url": "managementNew/template/save",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}
 
 
 
 
 
/**
 * 删除模板
 * 参数：obj ,callBack
 * obj={
		"request.id":"1"
	}
	return callBack(data);
 * **/
function deleteTemplate(obj, callBack){
	var options ={
        "url": "managementNew/template/delete",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}
 
 
 
 
 
 
/**
 * 获取模板下拉框
 * 参数：obj ,callBack
 * obj={
		"request.templateType":""		//BTS 或者 SAG
	}
	return callBack(data);
 * **/
function getTemplates(obj, callBack){
	var options ={
        "url": "managementNew/template/getTemplates",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}
	
	
	
	
/**
 * 获取单个模板的详细信息
 * 参数：obj ,callBack
 * obj={
		"request.id":1
	}
	return callBack(data);
 * **/
function getTemplate(obj, callBack){
	var options ={
        "url": "managementNew/template/getTemplate",
        "data": obj,
        callBack: function(data) {
            callBack(data);
        },
        errCallBack:function(e)
        {
            console.log("服务器异常");
        }
    };
    //ajax调用函数
    requestAjax(options);
}







/**   ------------------------------------------------报表模块 ---end----------------------------------- **/


