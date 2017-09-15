/* 
 * jedate demo by yxg 2017-07-13 
 * skinCell:"jedateblue",                      //日期风格样式，默认蓝色
    format:"YYYY-MM-DD hh:mm:ss",               //日期格式
    minDate:"1900-01-01 00:00:00",              //最小日期
    maxDate:"2099-12-31 23:59:59",              //最大日期
    language:{                                  //多语言设置
        name  : "cn",
        month : ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        weeks : [ "日", "一", "二", "三", "四", "五", "六" ],
        times : ["小时","分钟","秒数"],
        clear : "清空",
        today : "今天",
        yes   : "确定",
        close : "关闭"
    },
    isdocScroll:true,                           //判断是否作用在document绑定Scroll滚动，弹层是否关闭
    fixedCell:"",                               //日历固定在页面中的ID(ID是唯一性的)，字符中不能包含 # 与 . 这样的，默认值为空
    trigger:"click",                            //是否为内部触发事件，默认为内部触发事件
    position:[],                                //自定义日期弹层的偏移位置，长度为0，弹层自动查找位置
    hmsSetVal:{},                               //设置默认时分秒 {hh:00,mm:00,ss:00}
    startMin:"",                                //清除日期后返回到预设的最小日期
    startMax:"",                                //清除日期后返回到预设的最大日期
    isvalid:[],                                 //有效日期与非有效日期 ["3,4,8,10",true]
    isinitVal:false,                            //是否初始化时间，默认不初始化时间
    initAddVal:{},                              //初始化时间，加减 天 时 分
    isTime:true,                                //是否开启时间选择
    hmsLimit:true,                              //时分秒限制
    ishmsVal:true,                              //是否限制时分秒输入框输入，默认可以直接输入时间
    isClear:true,                               //是否显示清空
    isToday:true,                               //是否显示今天或本月
    isok:true,                                  //是否显示确定按钮
    clearRestore:true,                          //清空输入框，返回预设日期，输入框非空的情况下有效
    festival:false,                             //是否显示农历节日
    fixed:true,                                 //是否静止定位，为true时定位在输入框，为false时居中定位
    zIndex:2099,                                //弹出层的层级高度
    marks:null,                                 //给日期做标注
    choosefun:function(elem, val, date) {},     //选中日期后的回调, elem当前输入框ID, val当前选择的值, date当前完整的日期值
    clearfun:function(elem, val) {},            //清除日期后的回调, elem当前输入框ID, val当前选择的值
    okfun:function(elem, val, date) {},         //点击确定后的回调, elem当前输入框ID, val当前选择的值, date当前完整的日期值
    success:function(elem) {},                  //层弹出后的成功回调方法, elem当前输入框ID
 * */
$(function(){
	$("#date01").jeDate({
	    //isinitVal:true,
	    ishmsVal:false,
	    minDate: "2014-06-16 23:59:59",
	    maxDate: $.nowDate({DD:0}),
	    format:"YYYY-MM-DD hh:mm:ss",
	    zIndex:3000
	});
	$("#date03").jeDate({
	    //isinitVal:true,
	    ishmsVal:false,
	    minDate: "",
	    maxDate: $.nowDate({DD:0}),
	    format:"YYYY-MM-DD",
	    zIndex:3000
	});
	//实现日期选择联动
	var start = {
		//isinitVal:true,
	    format: 'YYYY-MM-DD',
	    minDate: '', //设定最小日期为当前日期
	    //festival:true,
	    maxDate: $.nowDate({DD:0}), //最大日期
	    choosefun: function(elem,datas){
	        end.minDate = datas; //开始日选好后，重置结束日的最小日期
	        endDates();
	        console.log(datas);
	    },
	    okfun:function (elem,datas) {
	        alert(datas)
	    }
	};
	var end = {
		//isinitVal:true,
	    format: 'YYYY-MM-DD',
	    minDate: $.nowDate({DD:0}), //设定最小日期为当前日期
	    //festival:true,
	    maxDate: '', //最大日期
	    choosefun: function(elem,datas){
	        start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
	        console.log(datas);
	    },
	    okfun:function (elem,datas) {
	        alert(datas)
	    }
	};
	function endDates() {
	    end.trigger = false;
	    $("#inpend").jeDate(end);
	}
	$("#inpstart").jeDate(start);
	$("#inpend").jeDate(end);
	
	//点击图标
	$("#dateIco").click(function(){
		$("#date02").jeDate({
			trigger:false,//关键属性
			isinitVal:true,
		    ishmsVal:false,
		    minDate: "2014-06-16 23:59:59",
		    maxDate: $.nowDate({DD:0}),
		    format:"YYYY-MM-DD hh:mm:ss",
		    zIndex:3000
		});
	})
});