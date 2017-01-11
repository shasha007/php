/**
 * Created by huqiwen on 16/6/16.
 */
$(function () {
    $(".section").css("height",($(window).height())+"px");
})    
    
var btn = document.getElementById("h_LogSchool");
btn.addEventListener("click", function () {
    //StartScrolling();
    $("#h_LogInBg").show();
    $("#h_LogAllPage").hide();
}, false);
$(".h_SelectSchool li").click(function () {

    $("#h_LogSchool").val($(this).html());
    $('#sid').val($(this).attr('data-sid'));
    $("#h_LogInBg").hide();
    window.scrollTo(0,0);
    $("#h_LogAllPage").show();
    if (window.location.hash !== "") {
        window.location.hash = "";
    }
})
$(".h_InstallBtn").click(function () {
    window.location = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.xyhui';
});
//function StartScrolling() {
//    document.removeEventListener('touchmove', stopScrolling);
//}
//function StopScrolling() {
//    document.addEventListener('touchmove', stopScrolling);
//}
//function stopScrolling(touchEvent) {
//    touchEvent.preventDefault();
//}