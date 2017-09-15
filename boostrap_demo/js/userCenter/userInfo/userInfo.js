/*定义module*/
App.controller('app', ['$scope','$ocLazyLoad', function($scope, $ocLazyLoad){
	
	$scope.loadBootstrap = function(){
		var myFileList=[];
		myFileList=loadFileList(myFileList);
        $ocLazyLoad.load(myFileList);
    }
    
     $scope.loadBootstrap();
    
	//用户数据
	$scope.userInfo = userInfo;//后台获取
    //是否编辑
    $scope.edit = false;
    //无头像时候的默认头像
    $scope.defaultImg = "../../../images/user_default.png";
    //触发编辑
	$scope.editUserInfo = function(){
		 $scope.edit = true;
	};
	//触发保存
	$scope.saveUserInfo = function(){
		 userInfo = $scope.userInfo;
		 //后台保存。。。。。。
		 $scope.edit = false;
	};
	//触发取消
	$scope.cancel = function(){
		 //重置
		 var userInfoExit = {
			"name":"zhangsan",
			"sex":"0",//0：man;1 woman
			"depart":"运营支撑与业务应用研发部",
			"telPhone":"010-88888888",
			"mobile":"13888888888",
			"email":"123@163.com",
			"imgUrl":"../../../images/picture.jpg",
			
		};
		 $scope.userInfo = userInfoExit;
		//后台重新刷新
		 $scope.edit = false;
	};
	$scope.uploadFile = function(uploadFile,showImg){
		if ($scope.edit){//编辑状态
			
			var fileObj=document.getElementById(uploadFile);
		    // 注意这里
		    // fileObj.files[0];
		    var fileName=fileObj.files[0].name;
			$scope.userInfo.imgUrl = fileName;
			uploadFileShow(uploadFile,showImg);
		}
	}
}]);