/*数据交互*/
/*******************************************************************************
 * @param obj,callBack
 *            obj={ request.username:"", request.password:"" }
 * @Description 登录
 ******************************************************************************/
var SESSION_TIME_OUT = "2009";
function login(obj, callback, errorback) {
	var options = {
		"url" : "/login/tologin",
		"data" : obj,
		callBack : function(data) {
			 callback(data); 
		},
		errCallBack : function(e) {
			errorback(e);
		}
	};

	// ajax调用函数
	requestAjax(options);
}

/**
 * ------------------------------------------------用户模块
 * ---start----------------------------------- *
 */
/*******************************************************************************
 * 修改用户密码
 */
function updatePwd(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/user/updatePassword",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 密码重置
 */
function resetPwd(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/user/resetPassword",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 获取用户信息
 * 
 * @param obj
 * @param callback
 * @param errorCallback
 */
function getUser(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/user/getUser",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};

	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * @param obj,callBack
 *            obj={ request.keywords:"", page.pageNum:1, page.pageSize:10 }
 * @Description 查询用户列表
 ******************************************************************************/
function getUserList(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/user/list",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	// callback(userlistResponse);
	requestAjax(options);
}

/*******************************************************************************
 * @Description 新增用户
 * @param obj,callBack
 *            obj={ request.username:"", request.realname:1, request.phone:10，
 *            request.email:"459489@qq.com", request.password:"123456" }
 * 
 ******************************************************************************/
function createUser(obj, callBack, errorCallback) {
	var options = {
		"url" : "/management/user/create",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * @Description 项目经理注册
 * @param obj,callBack
 *            obj={ request.username:"", request.realname:1, request.phone:10，
 *            request.email:"459489@qq.com", request.password:"123456" }
 * 
 ******************************************************************************/
function createProjectManager(obj, callBack, errorCallback) {
	var options = {
		"url" : "/management/user/register",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 基础用户修改个人信息
 * 
 * @param obj
 * @param callback
 * @param errorCallback
 */
function updateSelf(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/user/updateSelf",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 修改用户页面 保存按钮 参数：obj ,callBack obj={ "request.username":"登录名称",
 * "request.realname":"真实名称", "request.phone":"13512378944",
 * "request.email":"459489@qq.com", "request.status":"enabled " } return
 * callBack(data);
 ******************************************************************************/
function updateUser(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/user/update",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 更改用户使用状态
 * 
 * @param obj
 * @param callback
 * @param errorCallback
 */
function updateUserStatus(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/user/updateDisabled",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 获取用户角色 参数：obj ,callBack obj={ "request.id":1 } return callBack(data);
 ******************************************************************************/
function getRole(obj, callBack) {
	var options = {
		"url" : "management/userNew/edit/getRoles",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 分配用户角色 保存按钮 参数：obj ,callBack obj={ "request.id":2, "request.roleIds":[3,4] }
 * return callBack(data);
 ******************************************************************************/
function assignRole(obj, callBack) {
	var options = {
		"url" : "management/userNew/create/userRole",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 删除用户 参数：obj ,callBack obj={ "request.id":2 } return callBack(data);
 ******************************************************************************/
function deleteRole(obj, callBack) {
	var options = {
		"url" : "management/userNew/delete",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * obj= { request.roleId:1001//角色ID }
 * 
 * @param {Object}
 *            obj
 * @param {Object}
 *            callBack data = { result:0, userList:[ {"btsId":"85122852",
 *            "btsName":"李role_01_01", "btsType":"单板音" } ] }
 */
function getRoleUserList(obj, callBack) {
	var options = {
		"url" : "management/userNew/roleUserList",
		"data" : obj,
		"async" : false,// 同步获取
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
};
/*******************************************************************************
 * obj= { request.roleId : 0, request.user.id :'heeh', request.user.name
 * :'heeh', request.user.password :'123456', }
 * 
 * @param {Object}
 *            obj
 * @param {Object}
 *            callBack
 */
function createOrUpdateUserByRole(obj, callBack) {
	var options = {
		"url" : "management/userNew/createUserByRole",
		"data" : obj,
		"async" : false,// 同步获取
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 删除用户
 * 
 * @param obj
 * @param callback
 * @param errorCallback
 */
function deleteUser(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/user/delete",
		"data" : obj,
		"async" : false,// 同步获取
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 获取新注册的用户信息
 * 
 * @param obj
 * @param callback
 * @param errorCallback
 */
function getRigisterUserInfo(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/user/getRigisterUserInfo",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 审核用户信息
 * 
 * @param obj
 * @param callback
 * @param errorCallback
 */
function approvalUser(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/user/approval",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/**
 * ------------------------------------------------用户模块
 * ---end----------------------------------- *
 */

/**
 * ------------------------------------------------单位模块
 * ---start----------------------------------- *
 */

/*******************************************************************************
 * @Description 新增单位
 * @param obj,callBack
 *            obj={ request.companyId:"单位ID", request.companyName:"单位名称",
 *            request.companyProperty:"单位性质", request.certificateType:"证件类型", }
 * 
 ******************************************************************************/
function createCompany(obj, callBack, errorCallback) {
	var options = {
		"url" : "/company/createCompany",
		"data" : obj,
		"async" : false,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * @Description 修改单位
 * @param obj,callBack
 *            obj={ request.companyId:"单位ID", request.companyName:"单位名称",
 *            request.companyProperty:"单位性质", request.certificateType:"证件类型", }
 * 
 ******************************************************************************/
function updateCompany(obj, callBack, errorCallback) {
	var options = {
		"url" : "/company/update",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * @Description 删除单位
 * @param obj,callBack
 *            obj={ request.companyId:"单位ID" }
 * 
 ******************************************************************************/
function deleteCompany(obj, callBack, errorCallback) {
	var options = {
		"url" : "/company/delete",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 获取单位列表(分页显示)
 * 
 * @param {Object}
 *            obj
 * @param {Object}
 *            callback
 * @param {Object}
 *            errorCallback
 */
function getAllCompanysList(obj, callBack, errorCallback) {
	var options = {
		"url" : "/company/getAllCompanys/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 获取单位列表
 * 
 * @param {Object}
 *            obj
 * @param {Object}
 *            callback
 * @param {Object}
 *            errorCallback
 */
function getAllCompanys(obj, callBack, errorCallback) {
	var options = {
		"url" : "/company/selectAllCompanyIdsAndNames",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 校验新增单位名称
 * 
 * @param {Object}
 *            obj
 * @param {Object}
 *            callback
 * @param {Object}
 *            errorCallback
 */
function verifyCompanyName(obj, callBack, errorCallback) {
	var options = {
		"url" : "/company/verifyCompanyName",
		"data" : obj,
		"async" : false,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/**
 * ------------------------------------------------单位模块
 * ---end----------------------------------- *
 */

/**
 * ------------------------------------------------组织模块
 * ---start----------------------------------- *
 */

/*******************************************************************************
 * 获取组织机构列表
 * 
 * @param {Object}
 *            obj
 * @param {Object}
 *            callback
 * @param {Object}
 *            errorCallback
 */
function getOrgList(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/department/getOrgs",
		"data" : obj,
		// "async":false,//同步获取
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 删除组织机构
 * 
 * @param {Object}
 *            obj
 * @param {Object}
 *            callback
 * @param {Object}
 *            errorCallback
 */
function deleteOrg(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/department/delete",
		"data" : obj,
		// "async":false,//同步获取
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 创建组织
 * 
 * @param {Object}
 *            obj
 * @param {Object}
 *            callback
 * @param {Object}
 *            errorCallback
 */
function createOrg(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/department/create",
		"data" : obj,
		// "async":false,//同步获取
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 更新组织
 * 
 * @param {Object}
 *            obj
 * @param {Object}
 *            callback
 * @param {Object}
 *            errorCallback
 */
function updateOrg(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/department/update",
		"data" : obj,
		// "async":false,//同步获取
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/**
 * 获取部门列表
 */
function getDepartmentTree(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/department/getDepartmentByLevelCode",
		"data" : obj,
		// "async":false,//同步获取
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/**
 * ------------------------------------------------组织模块
 * ---end----------------------------------- *
 */

/**
 * ------------------------------------------------角色模块
 * ---start----------------------------------- *
 */

/*******************************************************************************
 * 查询所有角色列表 参数：obj ,callBack obj={
 *  } return callBack(data);
 ******************************************************************************/
function getAllRoles(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/role/getAll",
		"data" : obj,
		"async" : false,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};

	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 新增角色基本信息 参数：obj ,callBack obj={ "request.name":"", "request.description":"" }
 * return callBack(data);
 ******************************************************************************/
function createRole(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/role/create",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};

	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 角色下的用户列表 参数：obj ,callBack obj={ "request.role_id":"", "request.
 * containRoleId":0, "page.pageNum":"", "page.pageSize":"" } return
 * callBack(data);
 ******************************************************************************/
function getRoleUsers(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/user/getRoleUsers/list",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};

	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 角色下的用户列表 参数：obj ,callBack obj={ "request.role_id":"", "page.pageNum":"",
 * "page.pageSize":"" } return callBack(data);
 ******************************************************************************/
function getModules(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/role/getModules",
		"data" : obj,
		"async" : false,// 同步获取菜单
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			if (errorCallback) {
				errorCallback(e);
			} else {
				console.log("error:" + e.message);
			}
		}
	};

	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 获取所有的菜单按钮信息 参数：obj ,callBack obj={ } return callBack(data);
 ******************************************************************************/
function getAllModules(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/role/getAllModules",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};

	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 获取所有的菜单按钮信息（树形，对有权限的进行选中） 参数：obj ,callBack obj={ "request.roleId":1 } return
 * callBack(data);
 ******************************************************************************/
function getMenuFunctionsChecked(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/role/getMenuFunctionsChecked",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};

	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 修改角色页面 保存按钮 参数：obj ,callBack obj={ "request.id":2, "request.name":"",
 * "request.description":"", } return callBack(data);
 ******************************************************************************/
function updateRole(obj, callBack) {
	var options = {
		"url" : "/management/role/update",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 删除用户 参数：obj ,callBack obj={ "request.id":2 } return callBack(data);
 ******************************************************************************/
function deleteRole(obj, callBack) {
	var options = {
		"url" : "/management/role/delete",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 添加用户 参数：obj ,callBack obj={ "request.id":2， "request.userIds":[1,2] } return
 * callBack(data);
 ******************************************************************************/
function addRoleUsers(obj, callBack) {
	var options = {
		"url" : "/management/role/addUser",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 删除用户 参数：obj ,callBack obj={ "request.id":2， "request.userIds":[1,2] } return
 * callBack(data);
 ******************************************************************************/
function deleteRoleUsers(obj, callBack) {
	var options = {
		"url" : "/management/role/removeUser",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 获取单个角色下的菜单按钮信息 参数：obj ,callBack obj={ "request.roleId":1 } return
 * callBack(data);
 ******************************************************************************/
function getMenuFunctionIds(obj, callBack) {
	var options = {
		"url" : "/management/role/getMenuFunctionIds",
		"async" : false,
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 获取单个角色下的菜单按钮信息 参数：obj ,callBack obj={ "request.id":2, "request.menus":[1,2],
 * "request.functions":[1,2] } return callBack(data);
 ******************************************************************************/
function updateInfo(obj, callBack) {
	var options = {
		"url" : "/management/role/updateInfo",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 获取角色权限信息 参数：obj ,callBack obj={ "request.id":1 } return callBack(data);
 ******************************************************************************/
function getRolePermissions(obj, callBack) {
	var options = {
		"url" : "management/roleNew/edit/getRolePermissions",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 查询角色对应权限 obj={ request.id:roleId }
 * 
 * @param {Object}
 *            obj
 * @param {Object}
 *            callBack
 */
function showRolePermission(obj, callBack) {
	var options = {
		"url" : "management/roleNew/showRolePermission",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/**
 * obj={ request.roleId:1, request.permissionList:[001,002,003] }
 * 
 * @param {Object}
 *            obj
 * @param {Object}
 *            callBack
 */
function saveRolePermission(obj, callBack) {
	var options = {
		"url" : "management/roleNew/saveRolePermission",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 获取权限树模型 obj={}
 * 
 * @param {Object}
 *            obj
 * @param {Object}
 *            callBack
 */
function getPermissionTree(obj, callBack) {
	var options = {
		"url" : "management/roleNew/getPermissionTree",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);

}
/*******************************************************************************
 * 获取若干角色对应的权限列表，列表按树形结构展示
 * 
 * @param {Object}
 *            obj 角色列表
 * @param {Object}
 *            callback
 * @param {Object}
 *            errorCallback
 */
function getRolePermissionTree(obj, callback, errorCallback) {
	var options = {
		"url" : "/management/role/getMenuFunctions",
		"data" : obj,
		callBack : function(data) {
			
			callback(data);
		},
		errCallBack : function(e) {
			errorCallback(e);
		}
	};

	// ajax调用函数
	requestAjax(options);
}

/**
 * ------------------------------------------------角色模块
 * ---end----------------------------------- *
 */

/**
 * ------------------------------------------------BTS分组模块
 * ---start----------------------------------- *
 */
/*******************************************************************************
 * 获取bts分组信息 参数：obj ,callBack obj={
 *  } return callBack(data);
 ******************************************************************************/
function getNodeList(obj, callBack) {
	var options = {
		"url" : "managementNew/bts/getOrgs",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 新增分组页面 保存按钮 参数：obj ,callBack obj={ "request.id":1121, "request.pId":112,
 * "request.name":"节点名称" } return callBack(data);
 ******************************************************************************/
function createBtsOrg(obj, callBack) {
	var options = {
		"url" : "managementNew/btsorg/create",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 新增分组页面 保存按钮 参数：obj ,callBack obj={ "request.id":1121, "request.pId":112,
 * "request.name":"节点名称" } return callBack(data);
 ******************************************************************************/
function createBtsOrg(obj, callBack) {
	var options = {
		"url" : "managementNew/btsorg/create",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 编辑分组页面 保存按钮 参数：obj ,callBack obj={ "request.id":1121, "request.name":"节点名称" }
 * return callBack(data);
 ******************************************************************************/
function updateBtsOrg(obj, callBack) {
	var options = {
		"url" : "managementNew/btsorg/update",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 删除分组 参数：obj ,callBack obj={ "request.id":1121 } return callBack(data);
 ******************************************************************************/
function deleteBtsOrg(obj, callBack) {
	var options = {
		"url" : "managementNew/btsorg/delete",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 查询已经分组的基站列表 参数：obj ,callBack obj={ "request.keywords":"admin",
 * "request.orgId":"分组id", "page.pageNum":1, "page.pageSize":10 } return
 * callBack(data);
 ******************************************************************************/
function getStatListForNode(obj, callBack) {
	var options = {
		"url" : "managementNew/bts/list_assigned",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 查询未分组的基站列表 参数：obj ,callBack obj={ "request.keywords":"admin",
 * "request.orgId":"分组id", "page.pageNum":1, "page.pageSize":10 } return
 * callBack(data);
 ******************************************************************************/
function getBtsListNotAssigned(obj, callBack) {
	var options = {
		"url" : "managementNew/bts/list_notassigned",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 添加基站页面 添加按钮 参数：obj ,callBack obj={ "request.orgId":分组id, "request.btsIds":
 * [8230006] } return callBack(data);
 ******************************************************************************/
function saveBts(obj, callBack) {
	var options = {
		"url" : "managementNew/bts/save",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 删除基站 参数：obj ,callBack obj={ "request.id":5， "request.orgId":5 } return
 * callBack(data);
 ******************************************************************************/
function deleteBts(obj, callBack) {
	var options = {
		"url" : "managementNew/bts/delete",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/**
 * ------------------------------------------------BTS分组模块
 * ---end----------------------------------- *
 */

/**
 * ------------------------------------------------SAG分组模块
 * ---start----------------------------------- *
 */
/*******************************************************************************
 * 获取sag分组信息 参数：obj ,callBack obj={
 *  } return callBack(data);
 ******************************************************************************/
function getSagNodeList(obj, callBack) {
	var options = {
		"url" : "managementNew/sag/getOrgs",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * sag新增分组页面 保存按钮 参数：obj ,callBack obj={ "request.id":1121, "request.pId":112,
 * "request.name":"节点名称" } return callBack(data);
 ******************************************************************************/
function createSagOrg(obj, callBack) {
	var options = {
		"url" : "managementNew/sagorg/create",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * sag编辑分组页面 保存按钮 参数：obj ,callBack obj={ "request.id":1121,
 * "request.name":"节点名称" } return callBack(data);
 ******************************************************************************/
function updateSagOrg(obj, callBack) {
	var options = {
		"url" : "managementNew/sagorg/update",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * sag删除分组 参数：obj ,callBack obj={ "request.id":1121 } return callBack(data);
 ******************************************************************************/
function deleteSagOrg(obj, callBack) {
	var options = {
		"url" : "managementNew/sagorg/delete",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 查询已经分组的核心网列表 参数：obj ,callBack obj={ "request.keywords":"admin",
 * "request.orgId":"分组id", "page.pageNum":1, "page.pageSize":10 } return
 * callBack(data);
 ******************************************************************************/
function getSagListAssigned(obj, callBack) {
	var options = {
		"url" : "managementNew/sag/list_assigned",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 查询未分组的核心网列表 参数：obj ,callBack obj={ "request.keywords":"admin",
 * "request.orgId":"分组id", "page.pageNum":1, "page.pageSize":10 } return
 * callBack(data);
 ******************************************************************************/
function getSagListNotAssigned(obj, callBack) {
	var options = {
		"url" : "managementNew/sag/list_notassigned",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 添加核心网页面 添加按钮 参数：obj ,callBack obj={ "request.orgId":分组id, "request.sagIds":
 * [8230006], } return callBack(data);
 ******************************************************************************/
function saveSag(obj, callBack) {
	var options = {
		"url" : "managementNew/sag/save",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 删除核心网 参数：obj ,callBack obj={ "request.id":5， "request.orgId":5 } return
 * callBack(data);
 ******************************************************************************/
function deleteSag(obj, callBack) {
	var options = {
		"url" : "managementNew/sag/delete",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/**
 * ------------------------------------------------SAG分组模块
 * ---end----------------------------------- *
 */

/**
 * ------------------------------------------------报表模块
 * ---start----------------------------------- *
 */
/*******************************************************************************
 * 查询报表下载列表页面 参数：obj ,callBack obj={ "request.keywords":"", "page.pageNum":1,
 * "page.pageSize":10 } return callBack(data);
 ******************************************************************************/
function getReportList(obj, callBack) {
	var options = {
		"url" : "managementNew/report/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 报表下载,超链接
 * http://localhost:8080/stat-web/managementNew/report/download?reportId=1401
 ******************************************************************************/

/*******************************************************************************
 * 查询报表模板列表页面 参数：obj ,callBack obj={ "request.keywords":"", "page.pageNum":1,
 * "page.pageSize":10 } return callBack(data);
 ******************************************************************************/
function getTemplateList(obj, callBack) {
	var options = {
		"url" : "managementNew/template/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 获取设备的树形 组织数据获取 设备、统计指标的 树形组织数据 参数：obj ,callBack obj={
 * "request.templateType":"SAG" } return callBack(data);
 ******************************************************************************/
function getDeviceKpiOrg(obj, callBack) {
	var options = {
		"url" : "managementNew/template/ getDeviceKpiOrg",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 新增SAG模板页面 保存按钮 参数：obj ,callBack obj={ "request.templateType":"SAG", //必须写SAG
 * "request.name":"模板名称", "request.kpiIds": ["指标id","id2"],
 * "request.deviceIds":["设备id","id2"] } return callBack(data);
 ******************************************************************************/
function saveSagTemplate(obj, callBack) {
	var options = {
		"url" : "managementNew/template/save",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 新增BTS模板页面 保存按钮 参数：obj ,callBack obj={ "request.templateType":"BTS", //必须写BTS
 * "request.name":"模板名称", "request.kpiIds": ["指标id","id2"],
 * "request.deviceIds":["设备id","id2"] } return callBack(data);
 ******************************************************************************/
function saveBtsTemplate(obj, callBack) {
	var options = {
		"url" : "managementNew/template/save",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 模板编辑页面 保存按钮 参数：obj ,callBack obj={ "request.id":"1",
 * "request.templateType":"", //BTS 或者 SAG "request.name":"模板名称",
 * "request.kpiIds": ["指标id","id2"], "request.deviceIds":["设备id","id2"] } return
 * callBack(data);
 ******************************************************************************/
function updateTemplate(obj, callBack) {
	var options = {
		"url" : "managementNew/template/save",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 删除模板 参数：obj ,callBack obj={ "request.id":"1" } return callBack(data);
 ******************************************************************************/
function deleteTemplate(obj, callBack) {
	var options = {
		"url" : "managementNew/template/delete",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 获取模板下拉框 参数：obj ,callBack obj={ "request.templateType":"" //BTS 或者 SAG }
 * return callBack(data);
 ******************************************************************************/
function getTemplates(obj, callBack) {
	var options = {
		"url" : "managementNew/template/getTemplates",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 获取单个模板的详细信息 参数：obj ,callBack obj={ "request.id":1 } return callBack(data);
 ******************************************************************************/
function getTemplate(obj, callBack) {
	var options = {
		"url" : "managementNew/template/getTemplate",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/**
 * ------------------------------------------------报表模块
 * ---end----------------------------------- *
 */

/**
 * ------------------------------------------------通用业务
 * ---start----------------------------------- *
 */
/*******************************************************************************
 * 新增业务页面 参数：obj ,callBack requestInfo= { "request.type":"bts",
 * "request.department_id":1, "request.dataId":"111",
 * "request.dataGroupId":"001", "request.data1":JSON.stringify({"id":1,
 * "name":"zhagnsan"}), "request.data2":JSON.stringify({"id":1,
 * "name":"zhagnsan"}), "request.data3":JSON.stringify({"id":1,
 * "name":"zhagnsan"}), "request.remark":"remark", "request.queryKey":"query" }
 * return callBack(data);
 ******************************************************************************/

function create(obj, callBack) {
	var options = {
		"url" : "/management/business/create",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 修改业务页面 暂时不用 参数：obj ,callBack requestInfo= { "request.id":"" } return
 * callBack(data);
 ******************************************************************************/

function getBusiness(obj, callBack) {
	var options = {
		"url" : "/management/business/getBusiness",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 查看业务信息 参数：obj ,callBack requestInfo= { "request.type":"bts",
 * "request.department_id":1, "request.dataId":"111",
 * "request.dataGroupId":"001", "request.data1":JSON.stringify({"id":1,
 * "name":"zhagnsan"}), "request.data2":JSON.stringify({"id":1,
 * "name":"zhagnsan"}), "request.data3":JSON.stringify({"id":1,
 * "name":"zhagnsan"}), "request.remark":"remark", "request.queryKey":"query" }
 * return callBack(data);
 ******************************************************************************/

function update(obj, callBack) {
	var options = {
		"url" : "/management/business/update",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/**
 * ------------------------------------------------通用业务
 * ---end----------------------------------- *
 */

/**
 * ------------------------------------------------table
 * ---start----------------------------------- *
 */

/*******************************************************************************
 * 保存表单信息 参数：obj ,callBack requestInfo= { "request.projectName":"项目名称",
 * "request.projectManagerId":"项目负责人", "request.categoryId":"项目类别",
 * "request.cycleType":"项目周期", "request.state":"项目当前状态",
 * "request.projectProcessInstanceId":"项目流程实例ID",
 * "request.projectExtInfo":"项目扩展信息", "request.projectTaskDetail":"项目成员分工",
 * "request.selfAppraise":"项目经理自评", "request.departLeaderAppraise":"部门经理评价",
 * "request.projectCosts":"项目预算", "request.startTime":"项目开始时间",
 * "request.completeTime":"项目完成时间", "request.projectApplyTime":"项目申请时间",
 * "request.telno":"联系电话", "request.email":"电子邮箱",
 * "request.projectMilestone":"项目里程碑" } return callBack(data);
 ******************************************************************************/
function createTable(obj, callBack) {
	var options = {
		"url" : "/project/create",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 我申请的项目列表（coomarts） 参数：obj ,callBack requestInfo= {
 * "request.projectManagerId":"项目经理id", "request.categoryId ":"项目类型id" } return
 * callBack(data);
 ******************************************************************************/
function createTabList(obj, callBack) {
	var options = {
		"url" : "/project/myprojects/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 我申请的项目列表-查看（coomarts） 参数：obj ,callBack requestInfo= {
 * "request.projectManagerId":"项目经理id", "request.categoryId ":"项目类型id" } return
 * callBack(data);
 ******************************************************************************/
function createSeeData(obj, callBack) {
	var options = {
		"url" : "/project/detail",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 我申请并且以完成的项目-列表（coomarts） 参数：obj ,callBack requestInfo= {
 * "request.userId":"用户ID", "request.categoryId ":"项目类型id" } return
 * callBack(data);
 ******************************************************************************/
function getCooMartsFinishedListByServer(obj, callBack) {
	var options = {
		"url" : "/project/getFinishedProjectListByUserId/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 我的代办任务-列表(coomarts) 参数：obj ,callBack requestInfo= {
 * "request.projectManagerId":"项目经理id", "request.categoryId ":"项目类型id" } return
 * callBack(data);
 ******************************************************************************/
function getCooMartsAgentTaskListByServer(obj, callBack) {
	var options = {
		// "url": "/task/tasklist",
		"url" : "/task/tasklist/list",// 2017-02-14 杨秀国
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 我的代办任务中已完成的任务-列表（coomarts） 参数：obj ,callBack requestInfo= {
 * "request.projectManagerId":"项目经理id", "request.categoryId ":"项目类型id" } return
 * callBack(data);
 ******************************************************************************/
function getCooMartsAgentTaskFinishedListByServer(obj, callBack) {
	var options = {
		"url" : "/task/finishedTasklist/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 指定评审专家 参数：obj ,callBack requestInfo= { "request.taskId":"任务id",
 * "request.expertList":"专家列表"
 *  } return callBack(data);
 ******************************************************************************/
function peerReviewedData(obj, callBack) {
	var options = {
		"url" : "/task/dispatcherMaster",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
function committeeSuggestion(obj, callBack) {
	var options = {
		"url" : "/task/committeeApproval",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 部门经理审批 参数：obj ,callBack requestInfo= { "request.taskId":"任务id",
 * "request.conclusion":"审批结论" "request.comments ":"审批意见" "request.userId
 * ":"审批者"
 * 
 *  } return callBack(data);
 ******************************************************************************/
function managerSuggestion(obj, callBack) {
	var options = {
		"url" : "/task/departleaderApproval",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 预加载专家评分 参数：obj ,callBack requestInfo= { "request.projectId":"项目id"
 *  } return callBack(data);
 ******************************************************************************/
function beforeExpert(obj, callBack) {
	var options = {
		"url" : "/task/preloadExpertReview",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 录入专家评分 参数：obj ,callBack requestInfo= { "request.taskId":"任务id",
 * "request.recordId ":"专家评审id", "request.expertScore ":"专家评分"
 * 
 *  } return callBack(data);
 ******************************************************************************/
function expertScores(obj, callBack) {
	var options = {
		"url" : "/task/inputMasterGrade",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 查询项目详情的接口 参数：obj ,callBack requestInfo= { "request.projectId":"项目id" } return
 * callBack(data);
 ******************************************************************************/
function queryItem(obj, callBack) {
	var options = {
		"url" : "/project/getProjectDetailInfo",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 经理提交中期评审材料 参数：obj ,callBack requestInfo= { "request.projectId":"项目id" }
 * return callBack(data);
 ******************************************************************************/
function submitMidMaterial(obj, callBack) {
	var options = {
		"url" : "/task/pmSubmitMidMaterial",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 项目经理提交中期评报告 参数：obj ,callBack requestInfo= { "request.projectId":"项目id" }
 * return callBack(data);
 ******************************************************************************/
function submitMidReport(obj, callBack) {
	var options = {
		"url" : "/task/pmSubmitMidReport",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 项目经理提交终期评审材料 参数：obj ,callBack requestInfo= { "request.projectId":"项目id" }
 * return callBack(data);
 ******************************************************************************/
function submitEndMaterial(obj, callBack) {
	var options = {
		"url" : "projectAnnex/submitMaterial",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 项目经理提交终期评报告 参数：obj ,callBack requestInfo= { "request.projectId":"项目id" }
 * return callBack(data);
 ******************************************************************************/
function submitEndReport(obj, callBack) {
	var options = {
		"url" : "/task/pmSubmitEndReport",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * cooMarts的我申请的项目列表 参数：obj ,callBack requestInfo= { "request.userId":用户ID
 * "request.categoryId":1, //1:cooMarts,2:CamTalk,3,lottery
 * "page.pageNum":当前显示的页数, "page.pageSize":总的页数 } return callBack(data);
 ******************************************************************************/
function getCooMartsApplyListByServer(obj, callBack) {
	var options = {
		"url" : "/project/myprojects/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * camTalk的我申请的项目列表 参数：obj ,callBack requestInfo= { "request.userId":用户ID
 * "request.categoryId":1, //1:cooMarts,2:CamTalk,3,lottery
 * "page.pageNum":当前显示的页数, "page.pageSize":总的页数 } return callBack(data);
 ******************************************************************************/
function getCamTalkApplyListByServer(obj, callBack) {
	var options = {
		"url" : "/project/myprojects/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * lottery的我申请的项目列表 参数：obj ,callBack requestInfo= { "request.userId":用户ID
 * "request.categoryId":1, //1:cooMarts,2:CamTalk,3,lottery
 * "page.pageNum":当前显示的页数, "page.pageSize":总的页数 } return callBack(data);
 ******************************************************************************/
function getLotteryApplyListByServer(obj, callBack) {
	var options = {
		"url" : "/project/myprojects/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 我申请项目列表-修改 参数：obj ,callBack requestInfo= { "request.projectId ":"项目id" }
 * return callBack(data);
 ******************************************************************************/
function getMyApplycoomartsEditDataInfoByServer(obj, callBack) {
	var options = {
		"url" : "/project/detail",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 查询基本信息 参数：obj ,callBack requestInfo= { "request.projectId ":"项目id" } return
 * callBack(data);
 ******************************************************************************/
function getBaseInformation(obj, callBack) {
	var options = {
		"url" : "/project/detail",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 变更的基本信息 参数：obj ,callBack
 ******************************************************************************/
function getBgBaseInformation(obj, callBack) {
	var options = {
		"url" : "/changeproject/getCommonBizByProjectId",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 保存修改信息 参数：obj ,callBack requestInfo= { "request.data1":data1,第一步的数据
 * "request.data2":data2,第二步的数据 "request.data3":data3,第三步的数据 "request.data5":
 * scope.edeitData 变更修改的信息记录 } return callBack(data);
 ******************************************************************************/
function edeitTableSaveAjax(obj, callBack) {
	var options = {
		"url" : "/changeproject/createChange",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*
 * 从后台取出项目基本信息
 */
function getBaseInfoByServer(obj, callBack) {
	var options = {
		"url" : "/project/getProjectAndProjectManagerInfo",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}
/*
 * 尽职调查提交给后台
 * 
 */
function submitReportInfoByServer(obj, callBack) {
	var options = {
		"url" : "/task/jzdc",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}
/*
 * 尽职调查提交给后台
 * 
 */
function getReportInfoByServer(obj, callBack) {
	var options = {
		"url" : "/task/jzdc",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}
/*
 * 查询所有的尽职调查
 * 
 */
function getAllQuestionListByServer(obj, callBack) {
	var options = {
		"url" : "/project/getJZDCByProjectCategory/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

function getQuestionByServer(obj, callBack) {

	var options = {
		"url" : "/project/getJZDC",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

/*
 * 查询数据监测列表--决策委员会月度监测列表、项目经理周期报告列表(coomarts)
 */
function getCooMartsDataMonitorListByServer(obj, callBack) {
	var options = {
		"url" : "/commonbiz/getByConditions/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

/*
 * 初始化查询数据监测列表--决策委员会月度监测列表、项目经理周期报告列表(coomarts)
 */
function getCooMartsDataMonitorInitListByServer(obj, callBack) {
	var options = {
		"url" : "/commonbiz/getByCatetgoryAndServiceType/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

/**
 * ------------------------------------------------table
 * ---end----------------------------------- *
 */

/**
 * 提交资料
 */
function submitMaterial(obj, callBack) {

	var options = {
		"url" : "/projectAnnex/submitMaterial",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}
/**
 * 变更时提交决策委员会的意见和部门经理的意见
 */
function bgSuggestionByServer(obj, callBack) {
	var options = {
		"url" : "/projectAnnex/submitMaterial",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}
/**
 * 通用的提交函数
 */
function completeTask(result, obj, callBack) {

	var resultStr = JSON.stringify(result);
	obj.result = resultStr;
	var options = {
		"url" : "/task/completeTask",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

/*
 * 查看变更详情的接口
 */
/*
 * function bgDetailByServer(obj,callBack){ var options ={ "url":
 * "/changeproject/getCommonBizByProjectId", "data": obj, callBack:
 * function(data) { callBack(data); }, errCallBack:function(e) {
 * console.log("服务器异常"); } }; requestAjax(options); }
 */
/*
 * 项目经理提交自评
 * 
 */
function projectManagerEvaluateByServer(obj, callBack) {
	var options = {
		"url" : "/task/selfAppraise",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

/*
 * 部门经理提交评价
 * 
 */
function departManagerEvaluateByServer(obj, callBack) {
	var options = {
		"url" : "/task/departLeaderAppraise",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

/*
 * 首页--项目列表
 * 
 */
function getAllProjectDataListByServer(obj, callBack) {
	var options = {
		"url" : "/project/getAllRunnigProjects",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

/*
 * 首页--我的代办任务列表
 * 
 */
function getMyTaskDataListByServer(obj, callBack) {
	var options = {
		"url" : "/task/usertasklist",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

/*
 * 我的申请项目--相关资料列表
 * 
 */
function getMyApplyCoomartsRelevantFileDataListByServer(obj, callBack) {
	var options = {
		"url" : "/project/getRelatedMaterials",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

/*
 * 查看所有项目列表--查看(coomarts)
 * 
 */
function getCoomartsAllProjectSeeListByServer(obj, callBack) {
	var options = {
		"url" : "/project/getProjectsByCategoryId/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

/*
 * 查看所有进行中项目列表--查看(coomarts)
 * 
 */
function getCoomartsAllProjectMarchSeeListByServer(obj, callBack) {
	var options = {
		"url" : "/project/getRunnigProjectsByCategoryId/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

/*******************************************************************************
 * 查询所有流程信息
 * 
 ******************************************************************************/
// http://localhost:8080/process/commonbiz/getCommonBizData?projectId=1000062
function getCommonBizByServer(obj, callBack) {
	var options = {
		"url" : "/commonbiz/getCommonBizData",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

/**
 * 经理创建新的发布(coomarts)
 */
function leaderCreate(result, obj, callBack) {

	var resultStr = JSON.stringify(result);
	obj.result = resultStr;
	var options = {
		"url" : "/publish/create",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}
/**
 * 三级部门经理承接部门经理的发布然后再发布(coomarts)
 */
function threeLeaderCreate(result, obj, callBack) {

	var resultStr = JSON.stringify(result);
	obj.result = resultStr;
	var options = {
		"url" : "/publish/threeLeaderApply",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	requestAjax(options);
}

/*******************************************************************************
 * 部门经理发布项目列表(coomarts)
 * 
 ******************************************************************************/
function getCooMartsDepartmentReleaseListByServer(obj, callBack) {
	var options = {
		// "url": "/publish/list",
		"url" : "/publish/getByCategoryCreatePerson/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 部门经理发布任务列表(coomarts)
 * 
 ******************************************************************************/
function getCooMartsDepartmentReleaseForThreeLeaderListByServer(obj, callBack) {
	var options = {
		// "url": "/publish/list",
		"url" : "/publish/getToThreeLeader/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 部门经理发布的项目详细信息的查看
 * 
 ******************************************************************************/
function getDepartLeaderReleaseSeeByServer(obj, callBack) {
	var options = {
		"url" : "/publish/getPublish",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 三级部门经理申报
 * 
 ******************************************************************************/
function threeManageDeclareByServer(result, obj, callBack) {
	var options = {
		"url" : "/apply/create",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 三级部门经理申报后查看
 * 
 ******************************************************************************/
function threeManageAfterDeclareSeeByServer(obj, callBack) {
	var options = {
		"url" : "/apply/getApplication",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 三级部门的模糊查询
 * 
 ******************************************************************************/
function fuzzyQuery(obj, callBack) {
	console.log("开始服务器的fuzzyQuery了");
	var options = {
		"url" : "/management/user/getByRoleIdAndNameOrCompanyName",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 初始化需要去后台取的默认数据(三级部门经理)
 * 
 ******************************************************************************/
function getInitDataByserver(obj, callBack) {
	// console.log("getInitDataByserver");
	var options = {
		"url" : "/publish/queryPrivilege",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 三级部门经理申报列表(coomarts)
 * 
 ******************************************************************************/
function getCooMartsThreeleaderDeclareListByServer(obj, callBack) {
	var options = {
		"url" : "/apply/getApplicationsByCategoryId/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 三级部门经理申报列表(coomarts)
 * 
 ******************************************************************************/
function getCooMartsprojectManagerDeclareListByServer(obj, callBack) {
	var options = {
		"url" : "/project/getApplyProjectList/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 待申报列表
 * 
 ******************************************************************************/
function getCooMartsprojectShenBaoByServer(obj, callBack) {
	var options = {
		"url" : "/publish/getApplyList/list",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}

/*******************************************************************************
 * 三级部门经理修改申报
 * 
 ******************************************************************************/
function threeLeaderEditDeclareByServer(obj, callBack) {
	var options = {
		"url" : "/apply/modify",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
/*******************************************************************************
 * 根据dataId去查询每份报告的详情(月度报告等等)
 * 
 ******************************************************************************/
function getProjectMonthProgressByServer(obj, callBack) {
	var options = {
		"url" : "/commonbiz/getByDataId",
		"data" : obj,
		callBack : function(data) {
			
			callBack(data);
		},
		errCallBack : function(e) {
			console.log("服务器异常");
		}
	};
	// ajax调用函数
	requestAjax(options);
}
