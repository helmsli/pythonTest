            var formValid=new FormValid({           	
				"formId":"theForm",
				"formField":[{
					"id":"userName",
					"validateRule":{"maxLength":10,"minLength":3}					
					/*"ajaxValid":{
						url:
						data:
						ajaxcallBack:function(data)
						{
							return bool;
						}
					}*/
				},{
					"id":"userType",
					"validateRule":{"require":true},
					"tip":false
				},{
					"id":"pwd",
					"validateRule":{"isPwd":true}
				},{
					"id":"pwdCom",
					"validateRule":{"compared":"pwd"}
				},{
					"id":"userSel",
					"validateRule":{"require":true}
				},{
					"id":"email",
					"validateRule":{"isMail":true}				
				},{
					"id":"myNum",
					"validateRule":{"isNumber":true}	
				}]
			});
			
			
			
			
			var submitBtn=document.getElementById("submitBtn");
			
			var checkboxError=document.getElementById("checkboxError");
			if(checkboxError){
				formValid.setDomHide(checkboxError);
			}
						
			
			
		    addEvent(submitBtn,"click",function(){
			    var subFlag=formValid.beforeSubmit();
           
           	    var formData=formValid.getFormData();
           	    
//         	    var myName=formData.firstName+formData.middleName+formData.lastName;
//         	    //
//         	    if(formData.firstName==""||formData.middleName==""||formData.lastName=="")
//         	    {
//         	    	//error
//         	    	
//         	    }else{
//					//
//         	    }
           	    
           	    //
           	    
           	             	    	
           	    	if(formData.hobby!=undefined){
	           	    	formValid.setDomHide(checkboxError);           	    	
	           		    if(subFlag==true){
	           			    console.log("success");
	           		    }
	           	    }else{
	           	    	
	           	    	formValid.setDomVisible(checkboxError);
	           	    }           	               	    
           
		    });
		


var userTypeDom=document.getElementById("userType");
if(userTypeDom){
	changeSelect(userTypeDom);
}
	

function changeSelect(obj){
	var myul=obj.nextElementSibling;
	var myli=myul.childNodes;
	
	//遍历出所有li标签
	for(var i=0;i<myli.length;i++){
		addEvent(myli[i],"click",function(){
			
			//获取a标签里的内容
			var aEle = this.childNodes[0];
			var aText = aEle.innerHTML;
						
			//赋值
			var liVal = this.value;
			obj.value=(liVal==0)?"":liVal;
			obj.innerHTML=aText+"<span class='caret'></span>";
		})
	}
}
		