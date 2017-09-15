/**
 * @title 		修改密码
 * @description 修改密码 
 * @author		(last modified by SUNHUI)
 * @date 		2017/7/13
*/
App.controller('modifyPassword', ['$scope','$ocLazyLoad', function($scope, $ocLazyLoad){
	//初始化函数
	$scope.init=function (){
		$scope.loadBootstrap();
	    $scope.user = {};
	    $scope.saveSuccess = false;//是否保存成功
	}
	
	//加载文件
	$scope.loadBootstrap = function(){
		var myFileList=[];
		myFileList=loadFileList(myFileList);
		var fileList=addFormRule(myFileList);
        $ocLazyLoad.load(fileList);
        setTimeout(function(){
        	$scope.initFormValid();
        },2000);
    };
    
    //表单校验 
    $scope.initFormValid=function(){
    	$scope.formValid = new FormValid({           	
			"formId":"theForm",
			"formField":[{
				"id":"oldPassword",
				"validateRule":{"require":true}					
			},{
				"id":"newPassword",
				"validateRule":{"isPwd":true,"require":true}
			},{
				"id":"rePassword",
				"validateRule":{"compared":"newPassword","require":true}
			}]
		});
    }
	
    /**
     * 提交表单
     */
    $scope.submitForm = function(){
     	var subFlag=$scope.formValid.beforeSubmit(); 	
   		if(subFlag==true){//本地校验成功
   			var requestInfo=
   			{
				"request.oldPassword":$("#oldPassword").val(),
				"request.newPassword":$("#rePassword").val()
   			};

   			updatePwd(requestInfo,function(data){//success
   				if(data.result==0){
   					$scope.saveSuccess = true; 
   					$scope.$applyAsync($scope.saveSuccess);
   				}else{
   					swal(getErrMsg(data.result));
   				}
   			},function(e){//error
   				
   			});
	    
   		}
   	   
     };
     
     /***
      * 重置表单
      */
     $scope.reset = function(){
     	$scope.user.oldPassword = "";
     	$scope.user.newPassword = "";
     	$scope.user.rePassword = "";
        $scope.saveSuccess = false;
     };
    
    /*** 
     * 退出登录方法
     */
  	$scope.toLogout = function(){
  		var headerController = getAngularScope("head_ms");
  		var url = headerController.server_url+"/logout";
 	 	window.location.replace(url);
  	};
}]);		