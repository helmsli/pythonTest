/*定义module*/
App.controller('modifyPassword', ['$scope','$ocLazyLoad', function($scope, $ocLazyLoad){
	//
	$scope.formValid = new FormValid({           	
				"formId":"theForm",
				"formField":[{
					"id":"oldPassword",
					"validateRule":{"require":true}					
					/*"ajaxValid":{
						url:
						data:
						ajaxcallBack:function(data)
						{
							return bool;
						}
					}*/
				},{
					"id":"newPassword",
					"validateRule":{"isPwd":true,"require":true}
				},{
					"id":"rePassword",
					"validateRule":{"compared":"newPassword","require":true}
				}]
			});
    $scope.user = {};
    $scope.saveSuccess = false;//是否保存成功
    /**
     * 提交表单
     */
    $scope.submitForm = function(){
    	    
    	
     	var subFlag=$scope.formValid.beforeSubmit(); 	
   		//console.log(subFlag);
   		if(subFlag==true){
   			
	    	$scope.saveSuccess = true;
		    console.log("success");
   		}else{
   			alert('保存失败');
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
}]);		