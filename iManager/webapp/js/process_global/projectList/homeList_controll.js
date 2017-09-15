var nodeInfo = {};
/*定义module*/
App.controller('myDataController', ['$scope', '$ocLazyLoad', function($scope) { 
	
	$scope.moreFlag={
		coomartsMore:false,
		camtalkMore:false,
		lotteryMore:false,
		taskMore:false
	}
	$scope.coomartsTopList=[];
	$scope.camtalkTopList=[];
	$scope.lotteryTopList=[];
	
    $scope.pageFlag=true;
	//数据初始化--我的申请项目	
	$scope.initTab=function(){
		var myParm=parseQueryString();//所有的参数
        var projectName=myParm.projectName;
        var userInfo= localStorage.getItem("userInfo");
        	userInfo=JSON.parse(userInfo);
	        userId=userInfo.uid;
        var obj={
	    		  "request.userId":userId
	    };
        //查看所有正在运行的项目列表
	    getAllProjectDataList(obj);
	    //查看某个用户待处理的项目任务列表
	    getMyTaskDataList(obj);
	}
	
	//其他项目跳转
	$scope.openOtherProjectWin=function(projectId,taskid,state,projectName)
	{
		switch(projectName)
		{
			case "coomartsTopList":
				projectName="coomarts"
			break;
			case "camtalkTopList":
				projectName="camtalk";
				break;
			case "lotteryTopList":
				projectName="lottery";
				break;
		}
		openOtherProjectWin(projectId,taskid,state,projectName);
	}
	
	//其他更多跳转
	$scope.openMoreProjectWin=function(projectName)
	{
		switch(projectName)
		{
			case "coomartsTopList":
				projectName="coomarts"
			break;
			case "camtalkTopList":
				projectName="camtalk";
				break;
			case "lotteryTopList":
				projectName="lottery";
				break;
		}
		openMoreProjectWin(projectName);
	}
	
	//我的代办任务跳转
	$scope.openTaskAgentWin=function(projectId,taskid,state,projectName)
	{
		if(projectName=="taskTopList")
		{
			projectName="coomarts";
		}
		openTaskAgentWin(projectId,taskid,state,projectName);
	}
	
	$scope.openMoreTaskAgentWin=function(projectName)
	{
		if(projectName=="taskTopList")
		{
			projectName="coomarts";
		}
		openMoreTaskAgentWin(projectName);
	}
}]);

//获取后端数据(coomarts,camtalk,lottery)
function getAllProjectDataList(obj){
	getAllProjectDataListByServer(obj,getAllProjectDataListCall);
}

//返回前10条数据列表
function setTopData(name,topName){
	var length=name.length;
	if(length>10||length==10){
		for(var i=0;i<10;i++){
			topName[i]=name[i];
		}
	}else{
		for(var i=0;i<length;i++){
			topName[i]=name[i];
		}
	}
	return topName;
}
//前端UI界面渲染(coomarts,camtalk,lottery)
function getAllProjectDataListCall(data){
	var scope=getAngularScope("myDataController");
	if(data.result == 0){
		var coomartsTopList=[];
		var camtalkTopList=[];
		var lotteryTopList=[];
		var coomartsDataList = data.responseInfo.runnigProjects.coolMarsProjects;
		 	scope.coomartsDataList=coomartsDataList;
		var camtalkDataList = data.responseInfo.runnigProjects.camTalkProjects;
			scope.camtalkDataList=camtalkDataList;
		var lotteryDataList = data.responseInfo.runnigProjects.lotteryProjects;
			scope.lotteryDataList=lotteryDataList;
		scope.$apply(function () {
			scope.coomartsTopList=setTopData(coomartsDataList,coomartsTopList);
			scope.camtalkTopList=setTopData(camtalkDataList,camtalkTopList);
			scope.lotteryTopList=setTopData(lotteryDataList,lotteryTopList);
		      });
		var  coomartsLength=scope.coomartsTopList.length;
		var  camtalkLength=scope.camtalkTopList.length;
		var  lotteryLength=scope.lotteryTopList.length;
		if(coomartsLength>=10){
			scope.moreFlag.coomartsMore=true;
		}
		if(camtalkLength>=10){
			scope.moreFlag.camTalkMore=true;
		}
		if(lotteryLength>=10){
			scope.moreFlag.lotteryMore=true;
		}
		for(var i in coomartsDataList){
			var coomartsState=JSON.parse(coomartsDataList[i].mainCurrentState);
			if(coomartsState){
				coomartsDataList[i].state=coomartsState.state;
			}
		}
		for(var i in camtalkDataList){
			var camtalkState=JSON.parse(camtalkDataList[i].mainCurrentState);
			if(camtalkState){
				camtalkDataList[i].state=camtalkState.state;
			}
		}
		for(var i in lotteryDataList){
			var lotteryState=JSON.parse(lotteryDataList[i].mainCurrentState);
			if(lotteryState){
				lotteryDataList[i].state=lotteryState.state;
			}
		}
		if(scope.coomartsDataList.length == 0){
			$("#coomartsNoData").removeClass("hide");
		}
		if(scope.camtalkDataList.length == 0){
			$("#camtalkNoData").removeClass("hide");
		}
		if(scope.lotteryDataList.length == 0){
			$("#lotteryNoData").removeClass("hide");
		}
		//console.log("****");
		//console.log(scope.camtalkDataList);
	}	
}

//获取后端数据(我的代办任务)
function getMyTaskDataList(obj){
	getMyTaskDataListByServer(obj,getMyTaskDataListCall);
}
//前端UI界面渲染(我的代办任务)
function getMyTaskDataListCall(data){
	var scope=getAngularScope("myDataController");
	if(data.result == 0){
		var taskTopList=[];
		var taskDataList = data.responseInfo.taskList;
		scope.$apply(function () {
			scope.taskTopList=setTopData(taskDataList,taskTopList);
		      });
		var  taskLength=scope.taskTopList.length;
		if(taskLength>10){
			$scope.moreFlag.taskMore=true;
		}
		for(var i in taskDataList){
			var taskState=JSON.parse(taskDataList[i].stateInfo);
			if(taskState){
				taskDataList[i].state=taskState.state;
			}
		}
		scope.taskDataList=taskDataList;
		if(scope.taskDataList.length == 0){
			$("#taskNoData").removeClass("hide");
		}
	}	
}

//其他更多跳转
function openMoreProjectWin(projectName){
	var currentUserId= localStorage.getItem("userInfo");
	 currentUserId=JSON.parse(currentUserId);
	 currentUserId=currentUserId.uid;
	 var from ="";
	 if(currentUserId == 4){
		 url = projectName+"/myApply.html?projectName="+projectName;
	}else{
		url = projectName+"/myAllprojectMarch.html?projectName="+projectName;
	}
	location.href=url;
}

//其他项目跳转
function openOtherProjectWin(projectId,taskid,state,projectName,changeStata){
	 var currentUserId= localStorage.getItem("userInfo");
		 currentUserId=JSON.parse(currentUserId);
		 currentUserId=currentUserId.uid;
	 var from ="";
	 if(currentUserId != 4){
		 from="myAllprojectMarch.html?";
	}else{
		 from="myApply.html?";
	}
	var seeState=true;
	url = projectName+"/projectManager/project_detail_view.html?projectName="+projectName+"&projectId="+projectId+"&state="+state+"&seeState="+seeState+"&from="+from+"&changeStata="+changeStata;
	location.href=url;
}

//我的代办任务跳转
function openTaskAgentWin(projectId,taskid,state,projectName,changeStata){
	var from ="myTaskAgent.html?";
		url = projectName+"/projectManager/project_detail_view.html?projectName="+projectName+"&projectId="+projectId+"&state="+state+"&from="+from+"&changeStata="+changeStata+"&taskId="+taskid;
	if(state=="jzdc")
		{
			//填写尽职调查
			url= projectName+"/myTaskAgent_question.html?projectName="+projectName+"&projectId="+projectId+"&state="+state+"&from="+from+"&taskId="+taskid;
		}
	location.href=url;
}
//我的代办更多跳转
function openMoreTaskAgentWin(projectName){
	url = projectName+"/myTaskAgent.html?projectName="+projectName;
	location.href=url;
}







