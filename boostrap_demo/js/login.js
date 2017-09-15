App.controller('loginCtrl',function($scope){
    /*服务器地址*/
    var server_url=location.origin;
    var pathName=location.pathname;
    var lst=pathName.lastIndexOf("/");
    server_url=server_url+pathName.substr(0,lst)+"/";
    //
    
    /*验证用户名*/
    function validate_user() {
    	var user_err=document.getElementById("user_error");
        if($("#user_code").val().length != 0){
        	user_err.innerHTML="";
            return true;
        }else {
            var errInfo=getErrMsg("user");           
            user_err.innerHTML=errInfo;
            return false;
        }
    }

    /*验证密码*/
    function validate_password() {
    	var pass_err=document.getElementById("pass_error");
        if($("#user_password").val().length != 0){
        	pass_err.innerHTML="";
            return true;
        }else {
            var errInfo=getErrMsg("pass");
            pass_err.innerHTML=errInfo;
            return false;
        }
    }

    $scope.validate_user = function () {
        validate_user();
    };

    $scope.validate_password = function () {
        validate_password();
    };
    $scope.logining = false;//标记是否登录中状态，如果为true，表示登录中，为false表示未登录
    /*登录*/
    $scope.loginIn = function(){
    	    if(!$scope.logining){
    	    	$scope.toggleLoginIcon("show");
    	        var userName=$("#user_code").val();
	            var password=$("#user_password").val();
	            if(validate_user() && validate_password()){
	                /*此处还需调用后台接口验证：用户名和密码是否匹配*/
	                $scope.request = {
						"request.username":userName,
						"request.password":password
					};
					var obj=$scope.request;
					login(obj,function(data){
						
						var result=data.result;
						if(result==0)
						{
							location.href=server_url+"home.html";
							$scope.toggleLoginIcon("hide");
						}else{
							/*接口需要联调*/
							/*location.href=server_url+"home.html";*/
							/*location.href="../tpl/trafficStatistics/reportExport.html";*/
							var errMsg=data.errorMsg;
							var errInfo=getErrMsg(result);
							document.getElementById("myTest").innerHTML=errInfo;
							$scope.toggleLoginIcon("hide");
						}
					});
	            }else{
	                $scope.toggleLoginIcon("hide");
	            }
    	    }else{
    	    	$("#loginBtnText").text('登录中');
    	        $("#loginIcon").removeClass("hide");
    	    }
        };
     /*设置登录中样式*/
    $scope.toggleLoginIcon = function(flag){
    	if(flag=='show'){
    		$("#loginBtnText").text('登录中');
        	$("#loginIcon").removeClass("hide");;
        	$scope.logining = true;
    	}else{//隐藏登录中状态
    		$("#loginBtnText").text('登录');
        	$("#loginIcon").addClass("hide");;
        	$scope.logining = false;
    	}
    }
    document.onkeydown=function(event){
	  var e = event || window.event || arguments.callee.caller.arguments[0];
      if(e.keyCode == 13) {// -> 或者go按键 自动提交
    	 var x = document.activeElement.id;
    	 focusNextInput(x);
	  } 
	};
	function focusNextInput(thisInput){
        var inputs = document.getElementsByTagName("input");
        var len = inputs.length;
        if (thisInput == inputs[len-1].id){
        	$("input").blur();//取消输入框焦点
        	$scope.loginIn();
        } 
    } 
});




/*console.log(JSON.stringify(location.pathname));*/