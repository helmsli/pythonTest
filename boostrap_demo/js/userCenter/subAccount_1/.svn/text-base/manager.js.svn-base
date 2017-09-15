$(function(){
	//默认第一个角色被选中
	$("a.curSelectedNode").click();
});
var accountManage = {};
/**
 * 显示用户信息
 */
accountManage.roleId = "";
accountManage.showRoleUserList = function(roleId){
	accountManage.roleId  = roleId;
	/*getRoleUserList(roleId,function(data){
		return data.userList||[];
	});*/
	return role_user[roleId].userList||[];
};
accountManage.addOrEditUser = function(user){
	if (accountManage.roleId!==''){
		console.log(typeof user.btsId )
		if (typeof user.btsId ==='undefined'||user.btsId ===''){//新增用户
	       user.btsId = (new Date).getTime();
	       role_user[accountManage.roleId].userList.push(user);
		}else{//编辑用户，目前是angular双向数据绑定，不需要做操作，
			
		}
		/**
		 * createUser();
		 */
		return role_user[accountManage.roleId].userList;
	}
	return role_user[accountManage.roleId].userList;
};

accountManage.deleteUser  = function(roleId,userIds,callBack){
	/***
	 * deleteUser(user,callback);
	 */

	for (var i=0;i<userIds.length;i++){
		for (var j=0;j<role_user[roleId].userList.length;j++){
			if (role_user[roleId].userList[j].btsId == userIds[i]){
				role_user[roleId].userList.splice(j,1);
				break;
			}
		}
	}
	callBack&&callBack(role_user[roleId].userList);
	return role_user[roleId].userList;
}

