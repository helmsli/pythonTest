var userManage = {};
/***
 * 打开编辑框
 * @param {Object} userId
 */
userManage.openEditWin = function(userId){
	if(typeof userId ==='undefined'){
		userId = "";
	}
	window.location.href = "child_account_manage_edit.html?userId="+userId;
	    
}
/***
 * 删除用户
 * @param {Object} user
 */
userManage.deleteUser = function(userIds,callback){
	
	//后台删除用户
	/***
	 * deleteUser(userIds,callback);
	 */
	
	for (var i=0;i<userIds.length;i++){
		var arr = userModel.dataList;
	    for(var j=0;j<arr.length;j++){
	    	list = arr[j].list;
	    	for(var k=0;k<list.length;k++){
		    	if(userIds[i]==list[k].btsId){
		    		userModel.dataList[j].list.splice(k,1);
				    break;
		    	}
		    }
	    }
	}
	//假删除
	window.localStorage.setItem("userList",angular.toJson(userModel.dataList));
	
	callback && callback(userModel.dataList);
	
};
