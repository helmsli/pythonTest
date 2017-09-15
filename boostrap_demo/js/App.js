/*定义module*/
var App = angular.module("App",
    [
     'oc.lazyLoad'
    ]); 
    
var server_url="http://172.18.10.39:8080/stat-web/";
var basePath="wui-system";

 /**
  * 获取angularscope
  * @description:外部调用angular scope;
  * @param {string} controllerName
  * @return {object} angular scope
  * */
  function getAngularScope(controllerName)
  {
  	var appElement = document.querySelector('[ng-controller='+controllerName+']');
    var scope = angular.element(appElement).scope(); 
  	return scope;
  }

/**
 * @description ajax函数依赖jquery
 * @param {Object json} {options.url,option.ajaxData,options.callBack,berforCallback}
 * url:
 * type:{string} post/get,
 * data：参数
 * dataType：json|""/html/txt,
 * aysnc:false|true|"",
 * callBack:成功回调函数
 * errCallBack：错误回调
 * beforeCallBack：ajax响应前回调
 * */

function requestAjax(options)
{
	
    var url=server_url+options.url;
    var ajaxData=options.data||"";
    var callBack=options.callBack;
    var beforeCallBack=options.beforeCallBack||"";
    var type=options.type||"post";
    var aysnc=options.aysnc||true;
    var dataType=options.dataType||"JSON";
    var errCallBack=options.errCallBack||"";
    $.ajax({
        url:url,
        type:type,
        data:ajaxData,
        dataType:dataType,
        aysnc:aysnc,
        beforeSend:function (){
            if(beforeCallBack!="")
            {
                beforeCallBack();
            }
        },
        success:function(data){
            if(callBack)
            {
                callBack(data);
            }else{
                alert("没有callback函数");
            }
        },error:function(){
            console.log("访问服务器失败！");
            if(errCallBack!="")
            {
                errCallBack();
            }
        }
    });
}

getBasePath();
function getBasePath()
{
	var root=location.hostname;
	var port=location.port;
	var pathName=location.pathname;
	var fileName=basePath;
	var newBasePath="http://"+root+":"+port+"/"+fileName+"/";
	console.log(newBasePath);
	return newBasePath;
}


$(function(){
	setUrlDefault();
})


function setUrlDefault()
{
	 $("body").on("click","a",function(event) {
	 	event.preventDefault();
	 	var href=$(this).attr("href");
	 	var checkFlag=checkUrl(href);
	   	if(checkFlag)
	   	{
	   		var sbasePath=getBasePath();
			location.href=sbasePath+href;
		   	return false;//阻止链接跳转	
	   	}
	 });
}

function checkUrl(link)
{
	if(link)
	{
			link=link.toLowerCase();
		link=trim(link);
		var jsLink=link.indexOf("javascript")>=0;
		var nuLink=(link.charAt(0)=="#");
		if(jsLink ||nuLink)
		{
			return false;
		}else{
			return true;
		}
	}else{
		return false;
	}
}

function trim(str)
{
	  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/***
 * 请求错误码对应的错误信息
 * 参数:errCode
 * 返回：errMsg;
 * */
function getErrMsg(errCode)
{
	var errKey=ErrCode[errCode];
	var errMsg=i18n[errKey];
	return errMsg;
}

function getErrorCodeFile()
{
	var lang=getLanguage();
	var errorCodePath;
	errorCodePath="/js/errcode/errcode.js"
	return getBasePath()+errorCodePath;
}

function getErrorMsg(errorCode,fnName)
{
	var errMsg=getErrMsg(errorCode);
	//return errMsg;
	alert("Fn:"+fnName+"   errorMsg:"+errMsg);
}

/**
 * @请求国家及语言类型
 * 参数：null
 * 返回：语言类型
 * **/
function getLanguage()
{
	try{
		var navigat=window.navigator;
		var olang=navigat.language||navigat.systemLanguage||navigat.userLanguage;
		olang=olang.toLowerCase();
		return (olang=="zh-cn")?"zh":"en";
	}catch(e){
		console.log("请求国家及语言类型"+e.messageInfo+"=-="+e.message);
	}
}

function loadFileList(arryFileList)
{
	
	try{
		var newList=arryFileList||[];
		var skinFilePath=getSkinFile();
		var i18nFilePath=getI8nFilePath();
		var errorFilePath=getErrorCodeFile();
		newList.push(skinFilePath);
		newList.push(i18nFilePath);
		newList.push(errorFilePath);
		return newList;
		
	}catch(e){
		console.log("请求皮肤及国际化文件失效");
	}
	
}

/**
 * 请求皮肤样式
 * 返回皮肤文件路径，依赖config配置文件
 * **/
function getSkinFile()
{
	var skinFile;
	var skinCookie=getCookie("mystyle");
	var defaultFile=config.default||"blue";
	
	if(skinCookie)
	{
		skinFile="css/themes/"+skinCookie+"/skin.css";
	}else{
		skinFile="css/themes/"+defaultFile+"/skin.css";
	}
	
	var skinPath=getBasePath();
	var newPath=skinPath+skinFile;
	return newPath;
}


/**
 * 
 * 返回皮肤文件路径，依赖config配置文件
 * **/

function setConfigHeader(scope)
{
	var myScope=getAngularScope(scope);
		var headerType=config.leftMenuSkin;
        if(headerType=="head" && headerType)
        {
        	myScope.head=true;
        }else{
        	myScope.head=false;
        }
}
	


/**
 * 请求国际化文件路径
 * 返回国际化文件路径
 * **/

function getI8nFilePath()
{
	var lang=getLanguage();
	var i18nFilePath;
	if(lang=="zh")
	{
		i18nFilePath="js/i18n/i18n_zh.js"
	}else{
		i18nFilePath="js/i18n/i18n_en.js"
	}
	var filePath=getBasePath();
	var newPath=filePath+i18nFilePath;
	console.log("sss"+newPath);
	return newPath;
}


/**
 * 事件绑定
 * 参数:obj:要绑定的DOM,type,事件类型,handle：回调句柄
 * **/
function addEvent(obj,type,handle)
{
   	try{
        obj.addEventListener(type,handle,false);
    }catch(e){
        try{  // IE8.0及其以下版本
            obj.attachEvent('on' + type,handle);
        }catch(e){  // 早期浏览器
            obj['on' + type] = handle;
        }
    }
}

/**
 * 事件绑定
 * 参数:obj:要绑定的DOM,e,事件类型,f：回调句柄
 * **/
function removeEvent(o,e,f){
  if(window.detachEvent)
  {
  	o.detachEvent("on"+e,f);
  }else if(window.removeEventListener)
  {
  	o.removeEventListener(e,f,false);
  }
  else{
  	o["on"+e]=null;
  }
}

/**
 * 上传文件显示测试示例
 * ***/

	
	function uploadFileShow(fileId,showId)
	{
		var fileObj=document.getElementById(fileId);
	   	
	    // 注意这里
	    // fileObj.files[0];
	    var fileName=fileObj.files[0].name;
	    var fileType=fileObj.files[0].type;
	    console.log(fileObj.files[0]);
	     var src = window.URL.createObjectURL(fileObj.files[0]);
	     var showBox=document.getElementById(showId);
	     showBox.innerHTML="";
	    if(fileType.indexOf("image")>=0)
	    {
		    var img = document.createElement('img');
		    img.src = src;
		    img.className = "img-thumbnail";
		   showBox.appendChild(img);
	    }else{
	    	
	    	var obj=document.createElement("object");
	    	obj.data=src;
	    	 showBox.appendChild(obj);
	    }
	}


function gotoPage(url)
{
	location.href=basePath+url;
}


/*
 错误提示
 * **/

function errorModel(options)
{
	//var type="error/success/info";
	var settting={
		  title: 'Oh No!'||options.title,
		  text: options.text,
		  type: options.type,
		  styling: 'bootstrap3'
		}
	new PNotify(settting);
}



/**
 * 获取界面参数;
 * **/
function parseQueryString() {
        var args = new Object();
        var query = window.location.search.substring(1);
        var pairs = query.split("&");
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf("=");
            if (pos == -1) continue;
            var argname = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos + 1);

            args[argname] = value;
        }
        return args;
}



//事件绑定
function addEvent(obj,type,handle)
{
   	try{
        obj.addEventListener(type,handle,false);
    }catch(e){
        try{  // IE8.0及其以下版本
            obj.attachEvent('on' + type,handle);
        }catch(e){  // 早期浏览器
            obj['on' + type] = handle;
        }
    }
}

//取消事件绑定
function removeEvent(o,e,f){
  if(window.detachEvent)
  {
  	o.detachEvent("on"+e,f);
  }else if(window.removeEventListener)
  {
  	o.removeEventListener(e,f,false);
  }
  else{
  	o["on"+e]=null;
  }
}


//是否空对象
function isEmptyObject(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
}