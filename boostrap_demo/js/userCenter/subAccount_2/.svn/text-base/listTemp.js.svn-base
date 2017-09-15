var nodeInfo={};
/*定义module*/
App.controller('app', ['$scope','$ocLazyLoad', function($scope, $ocLazyLoad){
	var pageNum=1;//页码
	$scope.loadBootstrap = function(){
		var myFileList=[];
		myFileList=loadFileList(myFileList);
		//console.log("要加载的文件:"+myFileList);
        $ocLazyLoad.load(myFileList);
        pageNav.go(1,20);
    }
    
    $scope.loadBootstrap();

	//定义变量ID
	$scope.currentId = "";
	$scope.titleList = [
		"BTS ID",
		"网元名称",
		"网元类型",
		"操作"
	];
	//后台获取用户列表
	/***
	 * getUserList({},function(data){
	 * 	$scope.list= data.list;
	 * });
	 */
	$scope.list= userModel.getUserList(0);

	$scope.editRow=function(index)
	{
		var myData=$scope.list[index];
		userManage.openEditWin(myData.btsId);
	};
	$scope.deleteRow = function(index){
		var myData=$scope.list[index];
		var userIds = [myData.btsId];	
		//后台删除
		userManage.deleteUser(userIds,function(){
			
			$scope.list = userModel.getUserList(pageNum-1);;
		});
	};
	$scope.mutildelete = function(){
		var userIds = [];
		$("#box input[type='checkbox']:checked").each(function(index){
			var id = $(this).attr("id");
			var myData = $scope.list[id];
			userIds.push(myData.btsId);
		});
		//后台删除
		userManage.deleteUser(userIds,function(list){
			$scope.list = userModel.getUserList(pageNum-1);;
		});
	};
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
	/*分页*/
	pageNav.go(1,userModel.dataList.length);
	pageNav.fn = function(p,pn){
		pageNum=p;
		$scope.list = userModel.getUserList(p-1);
        $scope.$applyAsync($scope.list);
        /*去掉checkbox全选样式*/
        $("#che_0").prop("checked", false);
		$("#che_1").prop("checked", false);
    };
    
}]);



