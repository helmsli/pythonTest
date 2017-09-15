$(function(){
	/*单击行，添加选中样式*/
	$("table tbody").delegate("tr","click",function(event){
		var target = event.target||event.srcElement;
		$(this).siblings().find("input").prop("checked", false);
		var _input = $(this).find('input');
		var _nodeName = target.nodeName.toLowerCase();
		if(_nodeName=='input'){
			_input.checked = !_input.checked;  
		}else if(_nodeName!='label'){
			_input.click();
		}
	});
});
$(function(){
	$(".bootstrap-select").children()[0].hide();
})
var nodeInfo={};
App.filter("jsonDate", function($filter) {
    return function(input, format) {

        //从字符串 /Date(1448864369815)/ 得到时间戳 1448864369815
        var date = new Date(input);

        //转成指定格式
        return $filter("date")(date, format);
   };
});
/*定义module*/
App.controller('userManageController', function($scope, $ocLazyLoad){
	var pageNum=1;//页码
	$scope.loadBootstrap = function(){
		var myFileList=[];
		myFileList=loadFileList(myFileList);
		var fileList=addFormRule(myFileList);
        $ocLazyLoad.load(fileList);
        //输入框语言国际化
        inputLanguage();
    }
    $scope.loadBootstrap();
    
    //输入框语言国际化
    function inputLanguage(){
    	var lang=window.localStorage.lang;
    	if(lang=="en-US"){
    		$scope.userInfoList={"inUse":"In Use","invalid":"Invalid","approve":"Approve",
    				             "noReviewed":"Not Reviewed","reject":"Reject"}
    	}else{
    		$scope.userInfoList={"inUse":"使用中","invalid":"已失效","approve":"通过",
    				             "noReviewed":"未审核","reject":"不通过"} 
    	}
    }
	//定义变量ID
	$scope.currentId = "";
	
	/**后台获取用户列表**/
	$scope.list= [];
	/**分页信息*/
	$scope.page = {};
	/* 当前页面最后一条记录的登录名，分页查询时作为查询条件使用，默认查询第一页时传0*/
	$scope.currentPageLast = 0;
     /*分页*/
	pageNav.fn = function(p,pn){
		pageNum=p;
		$scope.getUserList(p);
    };
    /*查询条件*/
    $scope.searchForm = {
    		"username":"",
    		"roleId":[]
    };
	/***
	 * 查询用户数据
	 * @param {Object} page下一页页码????分页查询条件有问题
	 */
    var count = 0;//第一查询时候，
    $scope.getUserList = function(page){
    	var len = $scope.list.length;
		if (len>0 && $scope.list[len-1].loginname!=""){
			$scope.currentPageLast = $scope.list[len-1].loginname;
		}
    	var keywords = $scope.currentPageLast;
    	var page = page;
    	var pageSize = 10;//默认一页显示十条
    	var obj = {
    		"request.username":$scope.searchForm.username,
    		"request.roleId":$scope.searchForm.roleId,
			"page.pageNum":page,
			"page.pageSize":pageSize
		}
    	userManage.queryUserList(obj,function(data){//查询成功赋值
    		$scope.list = data.responseInfo.lists;
    		$scope.page =  data.responseInfo.page;
    		$scope.$applyAsync($scope.list);
	        //去掉checkbox全选样式
	        $("#che_0").prop("checked", false);
			$("#che_1").prop("checked", false);
			if(count==0){
				pageNav.go(1,$scope.page.pages);
				count++;
			}
			setTimeout(function(){
				$('#rolelist').selectpicker("refresh");
			},100);
    	});
    };
   
    $scope.checkStatus=function(uId,approvalStatus){
    	//只有待审核时可以设置
    	if(approvalStatus==0){
    		userManage.openCheckWin(uId);
    	}
    }
    
    
    //审核状态图标显示
    $scope.getIcon=function (checkStatus){
    	//"0":未审核
    	if(checkStatus == 0){
    		return "fa-exclamation-circle col-grey fa-2x";
    	//"1":审核通过
    	}else if(checkStatus == 1){
    		return "fa-check col-green fa-2x";
    	//"2":审核未通过
    	}else if(checkStatus == 2){
    		return "fa-remove col-red fa-2x";
    	}
    }
    
    /*密码重置*/
    $scope.resetPwdRow = function(index){
    	var myData=$scope.list[index];
    	$scope.$broadcast("openResetpwdWin",myData.id);
    };
    /* 用户记录修改*/	
	$scope.editRow=function(index)
	{
		var myData=$scope.list[index];
		if(myData.username=='admin'){
			swal(i18n.USERCENTER_TIPS.NO_CHANGE_ADMIN);
		}else{
			userManage.openEditWin(myData.id);
		}
	};
	/* 行删除*/
	$scope.deleteRow = function(index){
		var myData=$scope.list[index];
		if(myData.username=='admin'){
			swal(i18n.USERCENTER_TIPS.NO_DELETE_ADMIN);
			return;
		};
		 swal({
		        title: i18n.USERCENTER_TIPS.REMOVE_USER,
		        text: i18n.USERCENTER_TIPS.REMOVE_USER_TEXT,
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: "#DD6B55",
		        confirmButtonText: i18n.USERCENTER_TIPS.CONFIRM,
		        cancelButtonText:i18n.USERCENTER_TIPS.CANCEL,
		        closeOnConfirm: false
		    }, function () {
				//后台删除
				userManage.deleteUser(myData.id,function(){
					count = 0;
					$scope.getUserList($scope.page.pageNum);
				});
		    });
		
	};
	/* 批量删除*/
	/*$scope.mutildelete = function(){
		var userIds = [];
		$("#box input[type='checkbox']:checked").each(function(index){
			var id = $(this).attr("id");
			var myData = $scope.list[id];
			userIds.push(myData.btsId);
		});
		//后台删除
		userManage.deleteUser(userIds,function(list){
			//刷新当前页面？？？
			
		});
	};*/
	/*修改用户使用状态（1：使用中，0：禁用）*/
	$scope.changeStatus = function(index,isDisabled,approvalStatus){
		if(approvalStatus == 2){
			
		}else{
			var rowData = $scope.list[index];//获取行数据
			var newisDisabled = (isDisabled==1?0:1);//状态取反
			var obj = {//组装请求数据
					"request.id": rowData.id
			};
			updateUserStatus(obj,function(data){
				if(data.result==0){
					$scope.list[index].isDisabled = newisDisabled;
					$scope.$applyAsync($scope.list);
					swal(i18n.USERCENTER_TIPS.RESET_SUCCESS, "", "success");
				}else{
					swal(i18n.USERCENTER_TIPS.RESET_FAILED);
				}
			},function(e){});
		}
	}
	
	$scope.statusBtnFlag=function (approvalStatus,username){
		if(username == "admin"){
			return false;
		};
		if(approvalStatus == 2){
			return false;
		};
		return true;
	}
	
	$("#che_0").removeAttr("checked");
	$("#che_1").removeAttr("checked");
	
	/*全选样式变换*/
	$scope.checkAll=function (){
		var checkbox=$("#box input[type='checkbox'][data-admin='false']");
		if(checkbox.length>0){
			if(checkbox.prop("checked") == true){
		    	checkbox.prop("checked", false);
		    }else{
		    	checkbox.prop("checked", true);
		    }
		}
		var checkAll = event.target.id=="che_0"?"che_1":"che_0";
		$("#"+checkAll).prop("checked", !$("#"+checkAll).prop("checked"));
	};
	/*查询按钮触发*/
	$scope.$on('searchForm',function(e,data){
		 $scope.searchForm = data;
		 $scope.getUserList(0);
	});
	/*监听ng-repeat渲染完成*/
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
    	  /*设置按钮权限*/
          var leftMenuScope =  getAngularScope("leftMenu");
          leftMenuScope.setButtonPermission();
          leftMenuScope.$apply();
    });

});
/*查询窗口*/
App.controller("userSearch",['$scope',function($scope){
	/*查询条件*/
    $scope.searchForm = {
    		"username":"",
    		"roleId":""
    };
	/*获取所有角色列表*/
	$scope.getRoleList = function(){
		getAllRoles({},function(data){
			if(data.result==0){
				var roleList = data.responseInfo.roles;
				$scope.roleList=roleList;
			}
		});
	};
	
	//初始化查询选中角色项
	$scope.selectedRole={};
	 /*查询按钮*/
    $scope.searchUsers = function(){
    	$scope.searchForm.roleId=$scope.selectedRole.id;
    	$scope.$emit("searchForm",$scope.searchForm);
    	
    };
    /*查询条件重置*/
    $scope.searchReset = function(){
    	$scope.searchForm.username = "";
    	$scope.searchForm.roleId = "";
    	$('#rolelist').selectpicker("val","");
    	$scope.$emit("searchForm",$scope.searchForm);
    	
    };
}]);
/*定义重置密码module*/
App.controller('resetPwdCon', ['$scope','$ocLazyLoad', function($scope, $ocLazyLoad){
	$scope.loadBootstrap = function(){
		var myFileList=[];
		myFileList=loadFileList(myFileList);
		var fileList=addFormRule(myFileList);
        $ocLazyLoad.load(fileList);
        setTimeout(function(){
        	$scope.initFormValid();
        },3000);   
    };
    $scope.loadBootstrap();
	/*表单校验*/
    $scope.initFormValid=function (){
    	$scope.formValid = new FormValid({           	
			"formId":"resetPwdForm",
			"formField":[{
				"id":"newPassword",
				"validateRule":{"isPwd":true,"require":true}
			},{
				"id":"rePassword",
				"validateRule":{"compared":"newPassword","require":true}
			}]
		});
    }
	
	/*用户数据模型*/
    $scope.user = {};
    /*打开重置密码窗口*/
    $scope.$on("openResetpwdWin",function(event,userId){
    	$scope.user = {"id":userId,"newPassword":"","rePassword":""};
    	$('#resetpwdWin').modal('show'); 
    });
    /**
     * 密码重置提交表单
     */
    $scope.toResetPwd = function(){
     	var subFlag=$scope.formValid.beforeSubmit(); 	
   		if(subFlag==true){//本地校验成功
   			var requestInfo=
   			{   "request.id":$scope.user.id,
				"request.password":$("#rePassword").val()
   			};
   			
   			resetPwd(requestInfo,function(data){//success
   				if(data.result==0){	
   					swal(i18n.USERCENTER_TIPS.PASSWORD_SUCCESS, "", "success");
   				}else{
   					swal(i18n.USERCENTER_TIPS.PASSWORD_FAILED);
   				}
   				$('#resetpwdWin').modal('hide'); 
   			  $scope.user = {};
   			},function(e){//error
   				swal(i18n.USERCENTER_TIPS.PASSWORD_FAILED+"："+e);
   				$('#resetpwdWin').modal('hide'); 
   			});
	    
   		}  
     };

}]);

