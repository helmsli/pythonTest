App.controller('addUser',function($scope, $ocLazyLoad){
	$scope.loadBootstrap = function(){
		var myFileList=[];
		myFileList=loadFileList(myFileList);
		var fileList=addFormRule(myFileList);
        $ocLazyLoad.load(fileList);
        setTimeout(function(){
        	/*校验格式化*/
    		$scope.formValid = new FormValid({"formId":"addorEditUser",formField:validOptions});
        },3000);
        inputLanguage();
    }
	$scope.loadBootstrap();
	//保存按钮默认为可用
	$scope.saveUser=false;
	//输入框语言国际化
    function inputLanguage(){
    	var lang=window.localStorage.lang||'zh-CN';
    	if(lang=="zh-CN"){
    		 $scope.userInfoList={"idCard":"身份证","passport":"护照","male":"男","female":"女","inUse":"使用中","invalid":"已失效","chooseType":"请选择证件类型"} 
    	}else{
    		 $scope.userInfoList={"idCard":"ID Card","passport":"Passport","male":"male","female":"female","inUse":"In Use","invalid":"Invalid","chooseType":"Choose ID Type"}
    	}
    }
    /*动态生成证件类型列表select标签的option标签*/
	$scope.generateTypeOptions = function(){
		//选择证件类型下拉框国际化
		inputLanguage();
		var cardType=$("#cardType");
		cardType.append("<option value='' disabled='true'>"+$scope.userInfoList.chooseType+"</option>");
		cardType.append("<option value='0'>"+$scope.userInfoList.idCard+"</option>");
		cardType.append("<option value='1'>"+$scope.userInfoList.passport+"</option>");
		cardType.selectpicker();
		cardType.selectpicker('refresh');
		cardType.selectpicker('show'); 
	};
	
	$scope.userEdit = {
			/*角色改变监听事件*/
			roleChangeBind:function(){
				var roleIds = $('#rolelist').val();//获取选中的roleIds

			    if(roleIds==null){
			    	$scope.permissionTree = [];
			    	$scope.$apply();
			    	$scope.formValid._setCheckErrAndFlag("rolelist");
			    }else{
			    	$scope.userEdit.queryPermissionTree(roleIds);
			      	$scope.formValid._setCheckSuccAndFlag("rolelist");
			    }
			},
			/*根据角色id查询权限树*/
			queryPermissionTree:function(roleIds){
				var obj = {
					"roleIds":roleIds
				};
				getRolePermissionTree(obj,function(data){
					if(data.result==0){
						var permissionTree = data.responseInfo.menuFunctions;
						$scope.permissionTree = permissionTree;
						$scope.$apply();
					}
				},function(e){
					
				});
			},
			saveUserInfo:function(){
				var userInfo = $scope.userInfo;
				var cardType=$('#cardType option:selected').val();
				userInfo = $scope.userEdit.formateBeforSubmit(userInfo);
				var obj = {
						     "request.company_name":$('#companyslist').val(),
							 "request.username":userInfo.username,
							 "request.firstname":userInfo.firstname,
							 "request.lastname":userInfo.lastname, 
							 "request.address":userInfo.address,
							 "request.sex":userInfo.sex,
							 "request.phone":userInfo.phone,
							 "request.email":userInfo.email,
							 "request.cardtype":cardType,
							 "request.cardno":userInfo.cardno,
							 "request.roleId":userInfo.roleIds
				};
				if($("#datetimepicker_input").val()!=''){//生日不为空的时候才传送
					obj["request.birthday"] = str2date($("#datetimepicker_input").val());
				}
				
			    var subFlag=$scope.formValid.beforeSubmit(); 
				if(subFlag){//表单验证
					//保存按钮禁用
					$scope.saveUser=true;
					if ( $('#rolelist').val()==null){//验证角色
						$scope.formValid._setCheckErrAndFlag("rolelist");
						return ;
					}
					//保存用户信息
					if($scope.addFlag){//新增页面
						obj["request.password"] = userInfo.password;//修改页面添加id
						createUser(obj,function(data){
							if(data.result==0){
								swal(i18n.USERCENTER_TIPS.SAVE_SUCCESS, "", "success");
								$scope.userEdit.cancelWin();//关闭窗口
							}else{
								swal(getErrMsg(data.result));
								$scope.saveUser=false;
								$scope.apply();
							}
						},function(e){
							swal(i18n.USERCENTER_TIPS.SAVE_FAILED);
							$scope.saveUser=false;
							$scope.apply();
						});
					}else{//修改页面
						obj["request.id"] = userInfo.id;//修改页面添加id
						updateUser(obj,function(data){
							if(data.result==0){
								swal(i18n.USERCENTER_TIPS.SAVE_SUCCESS, "", "success");
								$scope.userEdit.cancelWin();//关闭窗口
							}else{
								swal(getErrMsg(data.result));
								$scope.saveUser=false;
							}
						},function(e){
							swal(i18n.USERCENTER_TIPS.SAVE_FAILED);
							$scope.saveUser=false;
						});
					}
				}else{
					if ( $('#rolelist').val()==null|| $('#rolelist').val()=="null"){//验证角色
						$scope.formValid._setCheckErrAndFlag("rolelist");
						return ;
					}
				}
					
			},
			/*提交前格式化数据*/
			formateBeforSubmit:function(userInfo){
				userInfo.birthday = str2date(userInfo.birthday);
				userInfo.roleIds = $('#rolelist').val(); 
				return userInfo;
			},
			getQueryString: function (name)
			{
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  unescape(r[2]); return null;
			},
			cancelWin: function(){
				window.location.replace('userManage.html');
			}
	};
	
	//获取编辑用户的id
	$scope.userId = $scope.userEdit.getQueryString("userId");
	//判断是新增用户还是编辑用户
	var addFlag = $scope.userEdit.getQueryString("addFlag");
	$scope.addFlag = addFlag?(addFlag=="true"?true:false):false;
	 //语言参数
    $scope.lang = window.localStorage.lang||'zh-CN';
	//用户对象模型
	$scope.userInfo = {};
	//动态获取角色列表
	$scope.roleList =[];
	//获取角色列表
	$scope.permissionChecked = true;
	$scope.permissionDisabled = true;
	$scope.permissionTree = [];
	
	/*用户表单渲染完成后，初始化页面数据*/
	$scope.initAddUser  = function(){
		/*日期组件初始化*/
		$('#datetimepicker').datetimepicker({
			 endDate:new Date(),//最大值选今天
	         pickTime:false,//屏蔽小时分秒面板
	    	 collapse: true
	    }).on('changeDate', function(ev){     
	        $('#datetimepicker').datetimepicker('hide');
	    });
		/*用户信息初始化*/
		$scope.showUserInfo();
		//获取单位列表
		$scope.initCompanyList();
		angularTreeList.init("powerInfo");
		
		//增加单位表单校验
		//$scope.addCompanyValid = new FormValid({"formId":"companyEdit",formField:companyVaildOptions});	
	};
	/*显示用户信息*/
	$scope.showUserInfo = function(){
		if($scope.userId!=null&&$scope.userId!=''){//修改用户信息时，去后台调取用户资料
				var requestInfo={"id":$scope.userId};
				getUser(requestInfo,function(data){
					
					if(data.result==0){
						$scope.userInfo = data.responseInfo.entity;
						var date = $scope.userInfo.birthday;
						$scope.userInfo.birthday = new Date(date).pattern("yyyy-MM-dd");
						var cardType=$scope.userInfo.cardtype;
						var cardTypeSelected=$("#cardType");
						cardTypeSelected.selectpicker("val",cardType);
						cardTypeSelected.selectpicker('refresh');
						cardTypeSelected.selectpicker('show'); 
						/* 角色列表初始化*/
						$scope.getRoleList();
					}
				},function(e){});
			}else{
				/* 角色列表初始化*/
				$scope.getRoleList();
			}
	};
	/*获取所有角色列表*/
	$scope.getRoleList = function(){
		getAllRoles({},function(data){
			
			if(data.result==0){
				var roleList = data.responseInfo.roles;
				$scope.roleList = roleList;
				$scope.generateRoleOptions();//生成角色列表
			}
		});
	};
	/***
	 * 获取单位列表
	 */
	$scope.initCompanyList=function ()
	{
		getAllCompanys({},function(data){
			if(data.result == 0){
				companysList=data.responseInfo.companyLists;
				$scope.companysList=companysList;
				$scope.$applyAsync($scope.companysList);
				generateCompanyOptions($scope.companysList);
			}
		},function(e){
			console.log(e);
		});
	}
	/***
	 * 动态生成单位列表select标签的option标签
	 * @param companysList 所有单位
	 */
	function generateCompanyOptions(companysList){
		$("#companyslist").html('');
		$.each(companysList,function (index,item){
			var optstr = "<option value='"+item.companyName+"'>"+item.companyName+"</option>";
			$("#companyslist").append(optstr);
		});
		
		$("#companyslist").selectpicker('refresh');
		$('#companyslist').selectpicker('show');
	};
	/*动态生成角色列表select标签的option标签*/
	$scope.generateRoleOptions = function(){
		$("#rolelist").html('');
		$("#rolelist").append('<option value="">选择角色</option>');
		$.each($scope.roleList,function (index,item){
			var optstr = "<option value='"+item.id+"'>"+item.name+"</option>";
			$("#rolelist").append(optstr);
		});
		$("#rolelist").selectpicker('refresh');
		$('#rolelist').selectpicker('show');
		$('#rolelist').val(0);
		$scope.initRoleValue();//初始化角色输入框的值
		
	};
	/***
	 * 保存单位信息
	 */
	/*$scope.addSectorInfo=function(){
		var companyInfo=$scope.companyInfo;
		var companys=$scope.companysList;
		var data=$scope.addCompanyValid.getFormData();
		//单位信息表单校验
		var flag=$scope.addCompanyValid.beforeSubmit();
		//单位信息接口
		var addSectorFlag=addSectorByServer(companyInfo,companys,flag);
		if(addSectorFlag){
			$('#companyslist').val(companyInfo.companyName);
			$("#companyslist").selectpicker('refresh');
			$('#companyslist').selectpicker('show');
		}
	}*/
	/*初始化角色输入框的值*/
	$scope.initRoleValue = function(){
		/*获取角色id集合，渲染权限树*/
		var roles = $scope.userInfo.roles;
		$scope.userInfo.roleIds = [];//新定义roleIds属性，保存时候用
		for(i in roles){
			$scope.userInfo.roleIds.push(roles[i].id);
		}
		//没有角色的话，默认选择普通用户
		var initVal = $scope.userInfo.roleIds.length>0?$scope.userInfo.roleIds:["1"];
		$("#rolelist").selectpicker('val',initVal);//初始化角色输入框
		$("#idType").selectpicker('val',$scope.userInfo.cardtype);//初始化证件类型
		$scope.userEdit.queryPermissionTree(initVal);
	}
	/*设置表单验证属性*/
	var validOptions= [];
	if($scope.addFlag){
		validOptions =[{
							"id":"username",
							"validateRule":{"loginNamevalidate":true,"require":true}		
						},{
							"id":"firstname",
							"validateRule":{"numberLetter":true}
						},{
							"id":"password",
							"validateRule":{"isPwd":true,"isPwd":true}
						},{
							"id":"confirmpwd",
							"validateRule":{"require":true,"compared":"password"}
						},{
							"id":"phone",
							"validateRule":{"require":true,"isNumber":true}
						},{
							"id":"email",
							"validateRule":{"isMail":true}
						}];
	}else{
		validOptions = [{
							"id":"username",
							"validateRule":{"loginNamevalidate":true,"require":true}		
						},{
							"id":"firstname",
							"validateRule":{"require":true}
						},{
							"id":"phone",
							"validateRule":{"require":true,"isNumber":true}
						},{
							"id":"email",
							"validateRule":{"isMail":true}
						}];
	}
	
	
	
});

