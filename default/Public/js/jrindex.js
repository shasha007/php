/**
 * Created by huqiwen on 16/6/24. 首页轮播
 */
var sx,ex,sid;
var is=document.getElementById("imgScroll");
var initLeft=parseInt(window.getComputedStyle(is).left);
var maxLeft=window.screen.width*(is.getElementsByTagName("li").length-1);
function autoScroll(){
    sid=setInterval(function(){
        initLeft-=window.screen.width;
        if(Math.abs(initLeft)==is.getElementsByTagName("li").length*window.screen.width){
            initLeft=0;
            is.style.left=initLeft+"px";
        }
        is.style.left=initLeft+"px";
    },3000);
}
function setHeight(t){
    var slide=document.getElementById("slide");
    slide.style.height=t.offsetHeight+"px";
    slide.getElementsByTagName("ul")[0].style.width=slide.getElementsByTagName("li").length*window.screen.width+"px";
    autoScroll();
}
for(var i=0;i<is.getElementsByTagName("li").length;i++){
    is.getElementsByTagName("li")[i].style.width=window.screen.width+"px";
}
is.addEventListener("touchstart",function(e){
    clearInterval(sid);
    sx=e.touches[0].pageX;
});
is.addEventListener("touchmove",function(e){
    ex=e.touches[0].pageX;
    is.style.left=ex-sx+initLeft+"px";
});
is.addEventListener("touchend",function(){
    if(Math.abs(ex-sx)<70){
        is.style.left=initLeft+"px";
    }
    else{
        if(ex-sx<0){
            if(Math.abs(initLeft)==maxLeft){
                is.style.left=initLeft+"px";
            }
            else{
                initLeft-=window.screen.width;
                is.style.left=initLeft+"px";
            }
        }
        else{
            if(initLeft==0){
                is.style.left=initLeft+"px";
            }
            else{
                initLeft+=window.screen.width;
                is.style.left=initLeft+"px";
            }
        }
    }
    autoScroll();
});