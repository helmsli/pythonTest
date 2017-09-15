App.controller('editAuthority', function($scope){
    //获取角色列表
    $scope.permissionChecked = true;
    $scope.permissionDisabled = false;
    $scope.permissionTree = [];

    var role={};
    role.id=sessionStorage.getItem("id");
    role.name=sessionStorage.getItem("name");
    //初始化tree    
    angularTreeList.init("powerInfo");
    $scope.$on("getPermissionChecked",function(e,role){
    	$scope.role=role;
    	$scope.$applyAsync($scope.role);
		//admin管理员禁用保存权限按钮
		if(role.id == 1){
			$scope.savePermissionBtn=true;
			$scope.powerInfo=false;
		}else{
			$scope.savePermissionBtn=false;
			$scope.powerInfo=true;
			$scope.getChecked(role);
		}
	})
    /*勾选已选权限*/
    $scope.getChecked = function (role){
    	var obj = {
                "request.roleId":role.id
            };
    	getMenuFunctionsChecked(obj,function(data){
            if(data.result==0){
                $scope.permissionTree = data.responseInfo.menuFunctions;          
                $scope.$applyAsync($scope.permissionTree);
            }
        });
    }
    /*保存权限按钮事件*/
    $scope.savePermission=function (role){
    	var menusArr=angularTreeList.getAllChecked();
    	var info={
    	    	"request.id":role.id,
    	    	"request.menus":menusArr[0],
    	    	"request.functions":menusArr[1]
    	    }
    	updateInfo(info,function(data){
	    	if(data.result == "0"){
	    		swal(i18n.USERCENTER_TIPS.SAVE_PERMISSION, "", "success");
	    	}
	    });
    }
    
    /*返回上一级事件*/
    $scope.goBack=function (role){
    	$("#user-panel").show();
		$("#permission-panel").hide();
    }
    
});
