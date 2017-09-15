$.AdminBSB = {};
$.AdminBSB.select = {
    activate: function () {
        if ($.fn.selectpicker) { $('select:not(.ms)').selectpicker(); }
    }
}

$(function() {
	/*
	 * 加载loading
	 */
	setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);
	/*
	 * 设置页面高度
	 */
    $(window).bind("load resize", function() {
        topOffset = 0;
        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });
    /*
     * 按钮点击效果初始化
     */
    Waves.init();
    //select插件调用
    $.AdminBSB.select.activate();
});

