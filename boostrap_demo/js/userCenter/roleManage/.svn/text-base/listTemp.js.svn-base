var nodeInfo={};
/*定义module*/
App.controller('app', ['$scope','$ocLazyLoad', function($scope, $ocLazyLoad){
	
	$scope.loadBootstrap = function(){
		var myFileList=[];
		myFileList=loadFileList(myFileList);
		//console.log("要加载的文件:"+myFileList);
        $ocLazyLoad.load(myFileList);
        pageNav.go(1,20);
    }
    
    $scope.loadBootstrap();
	
	$scope.initTree=function()
	{
		menu.leftMenu("roleList", 'tree', 'tree', function(event, treeId, treeNode) {
			if(typeof roleManage!=='undefined'){
				var roleId = treeNode.id;
				roleManage.showPermission(roleId);//显示角色列表
			}
		});
	}
	//定义变量ID
	$scope.$on("editRole",function(e,role){
		var roleList = roleManage.addRole(role);
		$scope.initTree();
	})
	
}]);
App.controller('addRole', function($scope){
	
	$scope.role={
			"name":"",
			"disc":""
	};
	$scope.editRole=function()
	{   
		 $scope.$emit("editRole",$scope.role);
		 $scope.role= {};
		 $('#creatModal').modal('hide');
		
	}
});

