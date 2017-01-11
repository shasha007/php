//初始化
document.getElementById("L-foundation").style.display = 'block' ;
document.getElementById("L-workfoundation").style.display = 'none' ;
function change_div(id){
  if (id == 'cyjijin' )
  {
     document.getElementById("L-foundation").style.display = 'none' ;
     document.getElementById("L-workfoundation").style.display = 'block' ;
  }
  else
  {
     document.getElementById("L-foundation").style.display = 'block' ;
     document.getElementById("L-workfoundation").style.display = 'none' ;
  }
}
//按钮选择
var btn1=document.getElementById("L-btn1");
var btn2=document.getElementById("L-btn2");
btn1.addEventListener("click",toHuo);
btn2.addEventListener("click",toWork);
function toHuo(){
	document.getElementById("L-btn1").style.color="#FFFFFF";
	document.getElementById("L-btn2").style.color="#ea5504";
	document.getElementById("L-btn2").style.border="1px solid #FFFFFF";
	document.getElementById("L-btn1").style.border="1px solid #ea5504";
	document.getElementById("L-btn2").style.backgroundColor="#FFFFFF";
	document.getElementById("L-btn1").style.backgroundColor="#ea5504";
}
function toWork(){
	document.getElementById("L-btn2").style.color="#FFFFFF";
	document.getElementById("L-btn1").style.color="#ea5504";
	document.getElementById("L-btn1").style.border="1px solid #FFFFFF";
	document.getElementById("L-btn2").style.border="1px solid #ea5504";
	document.getElementById("L-btn1").style.backgroundColor="#FFFFFF";
	document.getElementById("L-btn2").style.backgroundColor="#ea5504";
}