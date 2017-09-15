
App.controller('addUser', function($scope){
	$scope.userId = userEdit.getQueryString("userId");
	$scope.user = userEdit.showUserInfo($scope.userId);
});
var userEdit = {};
/***
 * 保存用户信息
 */
userEdit.saveUserInfo = function(){
	//保存用户信息
	var user = {};
	user.btsId = document.getElementById("btsId").value;
	user.btsName = document.getElementById("btsName").value;
	user.btsType = document.getElementById("btsType").value;
	
	//保存权限信息
	var arr = treeList.getAllChecked();
	user.permission = arr;
	//后台保存用户及权限数据
	//......
	//模拟保存数据
	userModel.setUser(user);
	userEdit.cancelWin();//关闭窗口
}
/***
 * 根据用户id显示用户信息
 * @param {Object} btsId
 */
userEdit.showUserInfo = function(btsId){
	//后台查找用户信息
	//......
	//模拟查找数据
	var user = userModel.getUserById(btsId);
	
	//显示权限信息
	var permissionList = user.permission;
	if (typeof permissionList!=='undefined'
			&&permissionList.length>0){
		treeList.renderTreeChecked(permissionList);		
	}
    return user;
}
userEdit.cancelWin = function(){
	window.location.replace('child_account_manage_2.html');
}
userEdit.getQueryString = function (name)
		{
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var r = window.location.search.substr(1).match(reg);
		     if(r!=null)return  unescape(r[2]); return null;
		}
