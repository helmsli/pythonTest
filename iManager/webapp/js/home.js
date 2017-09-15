var nodeInfo={};
/*定义module*/
App.controller('app', ['$scope','$ocLazyLoad', function($scope, $ocLazyLoad){
	$scope.mainpage_flag=true;
	$scope.$watch("translate",function(){
		console.log("translate:"+$scope.mainpage_flag);
		setTimeout(function(){
			 $scope.mainpage_flag=false;  //监听translate加载完成后设置显示状态
			 $scope.$applyAsync($scope.mainpage_flag);
			 clearLoader(); 
		},100);
    })
	$scope.loadBootstrap = function(){
		var myFileList=[];
		myFileList=loadFileList(myFileList);
        $ocLazyLoad.load(myFileList);
       // $scope.I18N=i18n;
        $scope.userRegister= getBasePath()+'/views/userRegister.html';
    }
	
 	$scope.initHead=function()
 	{
 		 
 	}
 	
 	$scope.showInFo=function()
 	{
 		
 	}
 	
    $scope.loadBootstrap();
    
}]);

