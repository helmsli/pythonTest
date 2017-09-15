/*定义module*/
App.controller('myOperator', ['$scope','$ocLazyLoad', function($scope, $ocLazyLoad){
	$scope.mainpage_flag=true;
	$scope.$watch("translate",function(){
		setTimeout(function(){
			 $scope.mainpage_flag=false;
			 $scope.$applyAsync($scope.mainpage_flag);
			 clearLoader(); 
		},100);
    })
	$scope.loadBootstrap = function(){
		var myFileList=[];
		myFileList=loadFileList(myFileList);
		var fileList=addFormRule(myFileList);
        $ocLazyLoad.load(fileList);
    };
    $scope.loadBootstrap();
}]);

var projectName = "coomarts";

/*
 * 项目申报
 */
function projectApply(){
	url= "../"+projectName+"/departmentReleaseNeedDeclare.html?projectName="+projectName;
	location.href = url;
}

/*
 * 数据监测
 */
function projectMonitor(){
	url= "../"+projectName+"/dataMonitorByCommittee.html?projectName="+projectName;
	location.href = url;
}

/*
 * 项目结项
 */
function projectEnd(){
	url= "../"+projectName+"/myApplyCompleted.html?projectName="+projectName;
	location.href = url;
}