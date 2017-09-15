/* 
 * daterangepicker demo by yxg 2017-07-13
 * 
 *  配置参数:
 *  format (String)：Moment的日期格式。
 *  separator (String)：日期字符串之间的分隔符。
	language (String)：预定义的语言是"en"和"cn"。你可以使用这个参数自定义语言。也可以设置为"auto"来让浏览器自己检测语言。
	startOfWeek (String)："sunday" 或 "monday"。
	getValue (Function)：当从DOM元素中获取日期范围时会调用该函数，函数的上下文被设置为datepicker DOM。
	setValue (Function)：当向DOM元素中写入日期范围时调用该函数。
	startDate (String or false)：定义用户允许的最早日期，格式和format相同。
	endDate (String or false)：定义用户允许的最后日期，格式和format相同。
	minDays (Number) ：该参数定义日期范围的最小天数，如果设置为0，表示不限制最小天数。
	maxDays (Number)：该参数定义日期范围的最大天数，如果设置为0，表示不限制最大天数。
	showShortcuts (Boolean) ：显示或隐藏shortcuts区域。
	time (Object)：如果允许该参数就会添加时间的范围选择。
	shortcuts (Object)：定义快捷键按钮。
	customShortcuts (Array)：定义自定义快捷键按钮。
	inline (Boolean)：使用inline模式渲染该日期选择器，而不是overlay模式。如果设置为true，则要一起设置container参数。
	container (String, css selector || DOM Object) ：要进行渲染的日期选择器DOM元素。
	alwaysOpen (Boolean)：如果使用inline模式，你可能希望在页面加载时就渲染日期选择器。该参数设置为true时会隐藏"close"按钮。
	singleDate (Boolean)：设置为true可以选择单个的日期。
	batchMode (false / 'week' / 'month')：自动批处理模式。
	
	
	autoClose: false,
	format: 'YYYY-MM-DD',
	separator: ' to ',
	language: 'auto',
	startOfWeek: 'sunday',// or monday
	getValue: function()
	{
		return $(this).val();
	},
	setValue: function(s)
	{
		if(!$(this).attr('readonly') && !$(this).is(':disabled') && s != $(this).val())
		{
			$(this).val(s);
		}
	},
	startDate: false,
	endDate: false,
	time: {
		enabled: false
	},
	minDays: 0,
	maxDays: 0,
	showShortcuts: false,
	shortcuts:
	{
		//'prev-days': [1,3,5,7],
		//'next-days': [3,5,7],
		//'prev' : ['week','month','year'],
		//'next' : ['week','month','year']
	},
	customShortcuts : [],
	inline:false,
	container:'body',
	alwaysOpen:false,
	singleDate:false,
	lookBehind: false,
	batchMode: false,
	duration: 200,
	stickyMonths: false,
	dayDivAttrs: [],
	dayTdAttrs: [],
	applyBtnClass: '',
	singleMonth: 'auto',
	hoveringTooltip: function(days, startTime, hoveringTime)
	{
		return days > 1 ? days + ' ' + lang('days') : '';
	},
	showTopbar: true,
	swapTime: false,
	selectForward: false,
	selectBackward: false,
	showWeekNumbers: false,
	getWeekNumber: function(date) //date will be the first day of a week
	{
		return moment(date).format('w');
	}
	
	
 * 
 * */
$(function(){
	//单日期模式   点击图标设置时间
	//$('#date-range0').dateRangePicker({
	$('#date-range0-ico').dateRangePicker({
		autoClose: true,
		singleDate : true,
		showShortcuts: false,
		singleMonth: true,
		getValue: function(){
			return $('#date-range0').val();
		},
		setValue: function(s){
			$('#date-range0').prop('readonly',true);
			$('#date-range0').val(s);
		}
	});
	
	//默认日期模式
	$('#date-range1').dateRangePicker({
		format: "YYYY.MM.DD",
		separator: " 至 "
	}).bind('datepicker-first-date-selected', function(event, obj){
		console.log('first-date-selected',obj);
	}).bind('datepicker-change',function(event,obj){
		console.log('change',obj);
	}).bind('datepicker-apply',function(event,obj){
		console.log('apply',obj);
	}).bind('datepicker-close',function(){
		console.log('before close');
	}).bind('datepicker-closed',function(){
		console.log('after close');
	}).bind('datepicker-open',function(){
		console.log('before open');
	}).bind('datepicker-opened',function(){
		console.log('after open');
	});
	
	//日期时间模式
	$('#date-range2').dateRangePicker({
		startOfWeek: 'monday',
    	separator : ' 至 ',
    	format: 'YYYY.MM.DD HH:mm',
    	autoClose: false,
		time: {
			enabled: true
		}
	});
	
	//限定未来日期模式  （3天、5天、7天）
	$('#date-range3').dateRangePicker({
		showShortcuts: true,	
		shortcuts: {
			'next-days': [3,5,7],
			'next': ['week','month','year']
		}
	});
	
	//限定过去日期模式  （3天、5天、7天）
	$('#date-range4').dateRangePicker({
		showShortcuts: true,
		shortcuts: {
			'prev-days': [3,5,7],
			'prev': ['week','month','year'],
			'next-days':null,
			'next':null
		}
	});
	
	//自定义打开/关闭动画
	$('#date-range5').dateRangePicker({
		customOpenAnimation: function(cb){
			$(this).fadeIn(300, cb);
		},
		customCloseAnimation: function(cb){
			$(this).fadeOut(300, cb);
		}
	});
});
