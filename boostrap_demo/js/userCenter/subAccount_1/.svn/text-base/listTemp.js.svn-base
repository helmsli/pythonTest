var nodeInfo={};
/*定义module*/
App.controller('app', ['$scope','$ocLazyLoad', function($scope, $ocLazyLoad){
	
	$scope.loadBootstrap = function(){
		var myFileList=[];
		myFileList=loadFileList(myFileList);
		//console.log("要加载的文件:"+myFileList);
        $ocLazyLoad.load(myFileList);
        pageNav.go(1,1);
    };
    
    $scope.loadBootstrap();
	
	$scope.initTree=function()
	{
		menu.leftMenu("roleList", 'tree', 'tree', function(event, treeId, treeNode) {
			if(typeof accountManage!=='undefined'){
				var roleId = treeNode.id;
				$scope.roleId  = roleId;
				var userList= accountManage.showRoleUserList(roleId);//显示角色列表
				$scope.list = userList;
				$scope.$applyAsync($scope.list);
				if(userList.length == 0){
					$(".action-group").removeClass("show").addClass("hide");
				}else{
					$(".action-group").removeClass("hide").addClass("show");
				}
			}
		});
	};
	//定义变量ID
	$scope.roleId = "";
	$scope.titleList = [
		"BTS ID",
		"网元名称",
		"网元类型",
		"操作"
	];
	$scope.list=[];
	
	$scope.changeRow=function(index)
	{
		var myData=$scope.list[index];
		/*delete myData["$$hashKey"];
		myData.index=index;
	    var newScope=getAngularScope("addUser");
	  	 newScope.user=myData;*/
	  	$('#creatModal').modal('show');
	  	$scope.$broadcast("changeRow",myData);
	};
	$scope.deleteRow = function(index){
		var myData = $scope.list[index];
		var userIds = [myData.btsId];	
		var indexs = [index];
		//后台删除
		var newRowList = accountManage.deleteUser($scope.roleId,userIds,indexs);
	};
	
	$scope.mutildelete = function(){
		var userIds = [];
		var indexs = [];
		$("#box input[type='checkbox']:checked").each(function(index){
			var id = $(this).attr("id");
			var myData = $scope.list[id];
			userIds.push(myData.btsId);
			indexs.push(id);
		});
		/*批量删除--隐藏表格操作栏*/
		$("#che_0").prop("checked", false);
		$("#che_1").prop("checked", false);
		$(".action-group").removeClass("show").addClass("hide");
		var newRowList = accountManage.deleteUser($scope.roleId,userIds,indexs);

	};
	$scope.$on("editUser",function(e,userNew){
		
		//添加新用户
		//$scope.list=userList;
		var userList = accountManage.addOrEditUser(userNew);
		$scope.list = userList;
		$scope.$applyAsync($scope.list);
	});
	
	$("#che_0").removeAttr("checked");
	$("#che_1").removeAttr("checked");
	
	/*全选样式变换*/
	$scope.checkAll=function (){
		var checkbox=$("#box input[type='checkbox']")
	    if(checkbox.prop("checked") == true){
	    	checkbox.prop("checked", false);
	    	$("#che_0").prop("checked", false);
			$("#che_1").prop("checked", false);
	    }else{
	    	checkbox.prop("checked", true);
	    	$("#che_0").prop("checked", true);
			$("#che_1").prop("checked", true);
	    }
	}
}]);


App.controller('addUser', function($scope){
	
	$scope.user={
			"btsId":"",
			"btsName":"",
			"btsType":""
	};
	
	$scope.$on("changeRow",function(e,user){
		$scope.user=user;
		console.log("get");
		console.log(user);
	});
	
	
	$scope.editUser=function()
	{
		 $scope.$emit("editUser",$scope.user);//向父控制器提交数据
		 $scope.user= {};
		 $('#creatModal').modal('hide');
		
	}
});

