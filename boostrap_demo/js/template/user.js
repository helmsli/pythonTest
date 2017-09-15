var userModel = {
	dataList:[
	    {
	    	result:0,
			page:1,
			pageSize:10,
			list:[
			   {"btsId":"851228511",
				"btsName":"张三",
				"btsType":"单板音",
				"permission":[]
				},
				{"btsId":"851228522",
				"btsName":"李四",
				"btsType":"单板音",
				"permission":["0010101"]
				},
				{"btsId":"851228533",
				"btsName":"张role_01_02",
				"btsType":"无类型",
				"permission":["0010101"]
				},
				{"btsId":"851228544",
				"btsName":"李role_01_02",
				"btsType":"无类型",
				"permission":["0010101"]
				},
				{"btsId":"851228555",
				"btsName":"王五",
				"btsType":"单板音",
				"permission":["0010101"]
				},
				{"btsId":"851228566",
				"btsName":"赵六",
				"btsType":"单板音",
				"permission":["0010101"]
				},
				{"btsId":"851228547",
				"btsName":"李role_01_02",
				"btsType":"无类型",
				"permission":["0010101"]
				},
				{"btsId":"851228558",
				"btsName":"王五",
				"btsType":"单板音",
				"permission":["0010101"]
				},
				{"btsId":"851228569",
				"btsName":"赵六",
				"btsType":"单板音",
				"permission":["0010101"]
				},
				{"btsId":"8512285310",
				"btsName":"张role_01_02",
				"btsType":"无类型",
				"permission":["0010101"]
				}
			]
	   },
	   {
	    	result:0,
			page:2,
			pageSize:10,
			list:[
			   {"btsId":"8512285111",
				"btsName":"张三",
				"btsType":"单板音",
				"permission":[]
				},
				{"btsId":"8512285212",
				"btsName":"李四",
				"btsType":"单板音",
				"permission":["0010101"]
				}
			]
	    }
	],
	getUserById:function(btsId){
		var user = {"btsId":"",
					"btsName":"",
					"btsType":"",
					"permission":[]
				};
		var userList = window.localStorage.getItem("userList");
		if (userList!=null && userList!=""){
			this.dataList = angular.fromJson(userList);	
		}
	    var arr = this.dataList;
	    for(var i=0;i<arr.length;i++){
	    	list = arr[i].list;
	    	for(var j=0;j<list.length;j++){
		    	if(btsId==list[j].btsId){
		    		return list[j];
		    	}
		    }
	    }
	    return user;//返回空user对象
	},
	setUser:function(user){
		
		if(typeof user.btsId ==='undefined'|| user.btsId===''){//新建
			user.btsId = (new Date).getTime();
			this.dataList[1].list.push(user);
		}else{//修改
			 var arr = this.dataList;
		    for(var i=0;i<arr.length;i++){
		    	list = arr[i].list;
		    	for(var j=0;j<list.length;j++){
			    	if(user.btsId==list[j].btsId){
			    		list[j] = user;
			    		break;
			    	}
			    }
		    }
		}
		window.localStorage.setItem("userList",angular.toJson(this.dataList));

	},
	getUserList:function(index){
		var userList = window.localStorage.getItem("userList");
		if (userList!=null && userList!="" && userList!="[]" && userList.length!=0){
			this.dataList = angular.fromJson(userList);	
		}
		return this.dataList[index].list;
	}
};


