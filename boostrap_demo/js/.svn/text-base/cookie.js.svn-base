

/***
���CooKie
**/
function setCookie(cname,cvalue,exdays)
{
	var d = new Date();
	exdays=exdays||30;
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
	setStorage(cname,cvalue);
} 


/***
����CooKie
*/
function getCookie(cname)
{
	var name = cname + "=";
	
	return getStorage(cname);
	
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++)
	  {
	  var c = ca[i].trim();
		  if (c.indexOf(name)==0)
		  {
		  	 return c.substring(name.length,c.length);
		  	 break;
		  }
	  }
	  
} 

/***
ɾ��CooKie
*/

function deleteCooKie(cname)
{
	document.cookie = "'+cname+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; 
}

/***
У��CooKie
*/
function checkCookie(cookieKey)
{
	var hasCookey=getCookie(cookieKey);
	var hasKey=false;
	if(hasCookey!="")
	{
		hasKey=true;
	}
	return hasKey;
}

function setStorage(key,value)
{
	localStorage[key]=value;
}

function getStorage(key,value)
{
	
	return localStorage[key];
}

function deleteStorage(key)
{
	localStorage[key]="";
	
}
