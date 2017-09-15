/**
 * @title 		用户资料
 * @description 用户资料查看/编辑 
 * @author		(last modified by SUNHUI)
 * @date 		2017/7/12
*/
App.controller('userInfoController', ['$scope','$ocLazyLoad',function($scope, $ocLazyLoad){
	//初始化函数
	$scope.init=function (){
		$scope.edit = false;
		$scope.loadBootstrap();
	    $scope.uid = '';
		//用户数据
		$scope.userInfo = {};
	    //获取用户信息
	    $scope.getUserInfo();
	    //时间控件初始化
	    $('#datetimepicker').datetimepicker({
	    	 endDate:new Date(),//最大值选今天
	         pickTime:false,//屏蔽小时分秒面板
	         autoclose:true
	    	 //collapse: true
	    }).on('changeDate', function(ev){     
	        $('#datetimepicker').datetimepicker('hide');
	    });
	}
	
	//加载文件
	$scope.loadBootstrap = function(){
		var myFileList=[];
		myFileList=loadFileList(myFileList);
		var fileList=addFormRule(myFileList);
        $ocLazyLoad.load(fileList);
        //输入框语言国际化
        inputLanguage();
        setTimeout(function(){
        	$scope.initFormValid();
        },5000);
    };
    
    //输入框语言国际化
    function inputLanguage(){
    	var lang=window.localStorage.lang||"zh-CN";
    	if(lang=="zh-CN"){
   		 	 $scope.userInfoList={"idCard":"身份证","passport":"护照","male":"男","female":"女","inUse":"使用中","invalid":"已失效","chooseType":"请选择证件类型"} 
	   	}else{
	   		 $scope.userInfoList={"idCard":"ID Card","passport":"Passport","male":"male","female":"female","inUse":"In Use","invalid":"Invalid","chooseType":"Choose ID Type"}
	   	}
    }
    
    //表单校验
    $scope.initFormValid=function()
    {
    	 try{
    	 		$scope.formValid = new FormValid({           	
    	 	 		"formId":"userInfoForm",
    	 	 		"formField":[{
    	 	 			"id":"loginname",
    	 	 			"validateRule":{"loginNamevalidate":true,"maxLength":20,"minLength":3}					
    	 	 		},{
    	 	 			"id":"firstname",
    	 	 			"validateRule":{"numberLetter":true}
    	 	 		},{
    	 	 			"id":"phone",
    	 	 			"validateRule":{"require":true,"isNumber":true}
    	 	 		},{
    	 	 			"id":"email",
    	 	 			"validateRule":{"isMail":true}
    	 	 		}]
    	 	 	});
    	 	}catch(e){
    	 		console.log(e.message);
    	 	}
     }
	
    /*请求后台获取用户信息*/
    $scope.getUserInfo = function(){
    	$scope.edit = false;
    	var session_userInfo = localStorage.getItem("userInfo");
    	var userInfo = JSON.parse(session_userInfo);
    	var uid = userInfo?userInfo.uid:'';
    	if (uid != ''){
    		$scope.uid = uid;
    		var requestInfo={"id":uid};
    		getUser(requestInfo,function(data){
    			if(data.result==0){
    				$scope.userInfo = data.responseInfo.entity;
    				var date = $scope.userInfo.birthday;
    				$scope.userInfo.birthday = new Date(date).pattern("yyyy-MM-dd");
    				$("#idType").selectpicker('val',$scope.userInfo.cardtype);//初始化证件类型
    				var roles = $scope.userInfo.roles;
    				$scope.userInfo.roleIds = [];//新定义roleIds属性，保存时候用
    				for(role in roles){
    					$scope.userInfo.roleIds.push(role.id);
    				}
    				$scope.$applyAsync($scope.userInfo);
    			}
    		},function(e){});
    	}else{
    		swal(i18n.USERCENTER_TIPS.GET_USERID_FAILED);
    	}
    }
	
    //触发编辑
	$scope.editUserInfo = function(){
		 $scope.edit = true;
	};
	//证件类型赋值
	$scope.ChangeIdType = function(){
		$("#idType").selectpicker('refresh');
		$('#idType').selectpicker('show');
	}
	/*动态生成证件类型列表select标签的option标签*/
	$scope.generateRoleOptions = function(){
		//选择证件类型下拉框国际化
		inputLanguage();
		var idType=$("#idType");
		idType.append("<option value='' disabled='true'>"+$scope.userInfoList.chooseType+"</option>");
		idType.append("<option value='0'>"+$scope.userInfoList.idCard+"</option>");
		idType.append("<option value='1'>"+$scope.userInfoList.passport+"</option>");
		idType.selectpicker();
		idType.selectpicker('refresh');
		idType.selectpicker('show');
	};
	
	$scope.generateRoleOptions();
	
	//触发保存
	$scope.saveUserInfo = function(){
		 var userInfo = $scope.userInfo;
		 var cardType=$('#idType option:selected').val();
		 var subFlag=$scope.formValid.beforeSubmit(); 	
   		 if(subFlag==true){//本地校验成功
	   		 //后台保存
   			 var obj = {
   					 "request.id":userInfo.id,
   					 "request.username ":userInfo.username,
   					 "request.firstname":userInfo.firstname,
   					 "request.lastname":userInfo.lastname,
	   				 "request.birthday":str2date($("#datetimepicker_input").val()),
	   				 "request.address":userInfo.address,
	   				 "request.sex":userInfo.sex,
   					 "request.phone":userInfo.phone,
   					 "request.email":userInfo.email,
   					 "request.cardtype":cardType,
   					 "request.cardno":userInfo.cardno,
   					 "request.roleId":userInfo.roleIds
   			 }; 
   			updateSelf(obj,function(data){
	   			 if(data.result==0){
	   				 $scope.edit = false;
	   				 $scope.$applyAsync($scope.edit);
	   				 //重置
	   				 $scope.getUserInfo();
	   				swal(i18n.USERCENTER_TIPS.SAVE_SUCCESS, "", "success");
	   				$scope.resetLocalStorageUserInfo(userInfo);
	   			 }else{
	   				swal(i18n.USERCENTER_TIPS.SAVE_FAILED);
	   			 }
	   		 },function(e){	
	   			swal(i18n.USERCENTER_TIPS.SAVE_FAILED);
	   		 });
   		 }
	};
	
	//触发取消
	$scope.cancel = function(){
		 var myErr = $scope.formValid.ErrList;
		 for(var key in myErr)  //ErrList为空的就添加错误信息
			{
			 $scope.formValid.setErrInfo(key,"hidden"); 
			}
		 $scope.edit = false;
		 $scope.$applyAsync($scope.edit);
		 //重置
		 $scope.getUserInfo();
	};
	
	/*重置用户名基础信息*/
	$scope.resetLocalStorageUserInfo =function(user){
		var fullName =user.firstname;
		//用户信息对象，保存到cookie中
		var userInfo = {
				fullName:fullName,
				uid:user.id,
				roleIds:user.roleIds//2017-03-08  yxg  用户角色Id
		}
		//保存到sessionstoragezhong，有效期1天
		localStorage.setItem("userInfo",JSON.stringify(userInfo));
		var headScope = getAngularScope("head_ms");
		headScope.getUserName();
		headScope.$apply();
	}
	  
}]);
