var limitScale=function(){
	var can=parseInt(document.getElementById("klimit").innerText);
	var all=parseInt(document.getElementById("zLimit").innerText);
	var pt=document.getElementById("ptop");
	var pb=document.getElementById("pbottom");
	var bodyH=document.body.clientHeight;
	var screenH=window.screen.height;
	var foot=document.getElementById("w-puFooter");
	if(all>=can){
		var angle=(can/all).toFixed(2)*360;
		console.log(angle)
		if(angle>180){
			pt.style.transform="rotateZ(180deg)";
			pt.style.webkitTransform="rotateZ(180deg)";
			angle=angle-180;
			pb.style.transform="rotateZ("+angle+"deg)";
			pb.style.webkitTransform="rotateZ("+angle+"deg)";
		}
		else{
			pt.style.transform="rotateZ("+angle+"deg)";
			pt.style.webkitTransform="rotateZ("+angle+"deg)";
		}
	}
	////判断底部栏是否fixed居底
	//if(bodyH+56<screenH){
	//	foot.style.position="fixed";
	//	foot.style.bottom=0;
	//}
	//else{
	//	foot.style.position="relative";
	//}
}

function setActionBar(title, imgUrl, func) {
	try {
		Android.setActionBarMenuImage(title, imgUrl, func);
	} catch (e) {
		setTimeout(function () {
			try{
				Android.setActionBarMenuImage(title, imgUrl, func);
			} catch (e){
				setTimeout(function () {
					Android.setActionBarMenuImage(title, imgUrl, func);
				}, 50);
			}
		}, 50);
	}
}

/**
 * 显示或隐藏loading
 *
 * @param show
 */
function loading(show) {
    if (show) {
        $('#loading').show();
        $('.w-payBtn').prop('disabled', true).css({'background': '#e0e0e0'});
    } else {
        $('.w-payBtn').prop('disabled', false).css({'background': '#EA5504'});
        $('#loading').hide();
    }
}

function alertMsg(msg) {
	var html = '<div class="modal fade" id="alertMsgModal" style="top:37%">'
			 + '<div class="modal-dialog" style="width: 75%;margin: auto;">'
			 + '<div class="modal-content">'
			 + '<div class="modal-header">'
			 + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">'
			 + '&times;'
			 + '</button>'
			 + '<h4 class="modal-title">提示信息</h4>'
			 + '</div>'
			 + '<div class="modal-body">'
			 + msg
			 + '</div>'
			 + '</div></div></div>';
    $('body').append(html);
    $('#alertMsgModal').modal('show');
    $('#alertMsgModal').on('hidden.bs.modal', function (e) {
        $(this).remove();
    });
}

var setmargin = function () {
	var circle = document.getElementsByClassName("w-circle");
	var bodywidth=document.body.clientWidth;
	circle[0].style.left = (bodywidth-230)/2+"px";

}

