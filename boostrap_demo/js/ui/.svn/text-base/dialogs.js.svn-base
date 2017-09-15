$(function () {
    $('.js-sweetalert button').on('click', function () {
        var type = $(this).data('type');
        if (type === 'basic') {
            showBasicMessage();
        }
        else if (type === 'with-title') {
            showWithTitleMessage();
        }
        else if (type === 'success') {
            showSuccessMessage();
        }
        else if (type === 'confirm') {
            showConfirmMessage();
        }
        else if (type === 'cancel') {
            showCancelMessage();
        }
        else if (type === 'with-custom-icon') {
            showWithCustomIconMessage();
        }
        else if (type === 'html-message') {
            showHtmlMessage();
        }
        else if (type === 'autoclose-timer') {
            showAutoCloseTimerMessage();
        }
        else if (type === 'prompt') {
            showPromptMessage();
        }
        else if (type === 'ajax-loader') {
            showAjaxLoaderMessage();
        }
    });
});

//These codes takes from http://t4t5.github.io/sweetalert/
function showBasicMessage() {
    swal({
    	title: "这是一个消息",
    	confirmButtonText: "确定"
    });
}

function showWithTitleMessage() {
    swal({
    	title: "这里有一个消息",
    	text: "很漂亮，不是嘛？",
    	confirmButtonText: "确定"
    });
}

function showSuccessMessage() {
    swal({
    	title: "做得好",
    	text: "你点击这个按钮",
    	type: "success",
    	confirmButtonText: "确定"
    });
}

function showConfirmMessage() {
    swal({
        title: "你确定吗？",
        text: "你将无法恢复这个虚拟的文件!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "是的，删除他!",
        cancelButtonText: "不，取消！",
        closeOnConfirm: false
    }, function () {
        swal({
        	title: "已删除",
        	text: "你虚拟的文件已被删除",
        	type: "success",
        	confirmButtonText: "确定"
        });
    });
}

function showCancelMessage() {
    swal({
        title: "你确定吗？",
        text: "你将无法恢复这个虚拟的文件!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "是的，删除他!",
        cancelButtonText: "不，取消！",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal({
	        	title: "已删除",
	        	text: "你虚拟的文件已被删除",
	        	type: "success",
	        	confirmButtonText: "确定"
        	});
        } else {
            swal({
	        	title: "已取消",
	        	text: "你的虚拟文件是安全的 :)",
	        	type: "error",
	        	confirmButtonText: "确定"
        	});
        }
    });
}

function showWithCustomIconMessage() {
    swal({
        title: "酷毙了！",
        text: "这是一个自定义图像",
        imageUrl: "../../../images/thumbs-up.png",
        confirmButtonText: "确定"
    });
}

function showHtmlMessage() {
    swal({
        title: "页面 <small>标题</small>!",
        text: "自定义 <span style=\"color: #CC0000\">页面<span> 消息.",
        html: true,
        confirmButtonText: "确定"
    });
}

function showAutoCloseTimerMessage() {
    swal({
        title: "自动关闭警报",
        text: "我将在2秒后自动关闭",
        timer: 2000,
        showConfirmButton: false
    });
}

function showPromptMessage() {
    swal({
        title: "输入文本框",
        text: "写一些有趣的东西：",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        animation: "slide-from-top",
        inputPlaceholder: "写一些有趣的东西"
    }, function (inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("你需要写一些有趣的东西"); return false
        }
        swal({
    		title: "非常好！",
    		text: "你写入了: " + inputValue,
    		type: "success",
    		confirmButtonText: "确定"
        });
    });
}

function showAjaxLoaderMessage() {
    swal({
        title: "Ajax请求示例",
        text: "提交运行Ajax请求",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
    }, function () {
        setTimeout(function () {
            swal({
            	title:"Ajax请求完成！",
            	confirmButtonText: "确定"
            });
        }, 2000);
    });
}