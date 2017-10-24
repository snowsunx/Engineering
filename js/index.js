/*********购物车***********/
var oTrolley = document.getElementById("trolley");
var oTroCont = document.getElementById("tro_cont");
var off = true;

oTrolley.onclick = function(e){	
	if(off){
		oTroCont.style.display="block";
		off=false;
	}else{
		oTroCont.style.display="none";
		off=true;
	}
	e.stopPropagation();    //阻止当前事件向祖辈元素的冒泡传递
}
window.onclick = function(){
	oTroCont.style.display="none";
	off = true;
}

/*********轮播图左侧选项卡************/
var oCategroy = document.getElementById("categroy");
var oCateList = oCategroy.getElementsByTagName("ul")[0];
var aTabs = oCateList.getElementsByTagName("li");
var oCateContent = getClass( document,"cate_content");

for(var i=0; i<aTabs.length; i++){
	aTabs[i].index=i;
	aTabs[i].onmouseover=function(){
		for(var i=0; i<aTabs.length; i++){
			oCateContent[i].style.display ="none";
		}
			oCateContent[this.index].style.display ="block";
		aTabs[this.index].onmouseout = function(){
			oCateContent[this.index].style.display ="none";
		}
	}
	
}


/*********全屏轮播图************/
var oW = 0;
var oBtnL = document.getElementById("btn_L");
var oBtnR = document.getElementById("btn_R");
var oView = document.getElementById("view");
var oUl = oView.getElementsByTagName("ul")[0];
var aLi = oUl.children;
var oOl = document.getElementsByTagName("ol")[0];
var oBtns = oOl.children;

oUl.innerHTML += oUl.innerHTML;
var aLi = oUl.children;
var oLiWidth = aLi[0].offsetWidth;
var iNum = 0;

//计算轮播图的宽度
oUl.style.width = aLi[0].offsetWidth*aLi.length +'px';
//获取窗口的宽度
oW = document.documentElement.clientWidth;  
console.log(oW)
//计算图片的居中
oView.style.left = -(oView.offsetWidth-oW)/2 +'px';
console.log(oView.offsetWidth)
//当窗口改变的时候重新计算图片居中
window.onresize = function(){
	oW = document.documentElement.clientWidth; 
	oView.style.left = -(oView.offsetWidth-oW)/2 +'px';	
}

//点击右侧按钮轮播

function play(){
	iNum++
	if(iNum == aLi.length/2+1){
		oUl.style.left = 0+'px';
		iNum = 1;
	}		
	for(var i=0; i<oBtns.length; i++){
		oBtns[i].className = "";
	};
	if(iNum == aLi.length/2) {
		oBtns[0].className = "active";
	}else{
		var a = iNum%4;
		oBtns[a].className = "active";
	}
	animate(oUl,{'left':-iNum*oLiWidth})
	
};
oBtnR.onclick = play;

//点击左侧按钮轮播
oBtnL.onclick = function(){
	iNum--
	if(iNum<0){
		oUl.style.left = -oUl.offsetWidth/2+'px';
		iNum = 3;
		console.log(oUl.offsetWidth);
	}
	for(var i=0; i<oBtns.length; i++){
		oBtns[i].className = "";
	};
	oBtns[iNum].className = "active";
	animate(oUl,{'left':-iNum*oLiWidth})
}

//自动播放
var time = setInterval(play,2000)
banner.onmouseover = function(){
	clearInterval(time)
}
banner.onmouseout = function(){
	time = setInterval(play,2000)
}


//点击按钮切换图片
for(var i=0; i<oBtns.length; i++){
	oBtns[i].index = i;
	oBtns[i].onclick = function(){
		for(var i=0; i<oBtns.length; i++){
			oBtns[i].className='';
		}
		oBtns[this.index].className='active';
		iNum=this.index;
		animate(oUl,{'left':-this.index*oLiWidth})
	}
}


/*********选项卡************/
var oMenu = document.getElementById("menu");
var aLis = oMenu.getElementsByTagName("li");
var aTeCont = getClass( document,"te_cont");

for(var i=0; i<aLis.length; i++){
	aLis[i].index=i;
	aLis[i].onclick=function(){
		for(var i=0; i<aLis.length; i++){
			aLis[i].className="";
			aTeCont[i].style.display="none";
		}
		this.className ="red";
		aTeCont[this.index].style.display = "block";
	}
}



/*********点击返回顶部,顶部栏的悬浮************/
var oBack = document.getElementById("back");
var oTopHeader = document.getElementById("top_header");
var oTop = 0;
var timer = null;
var off = true;


window.onscroll = function(){
	oTop = document.documentElement.scrollTop || document.body.scrollTop;
	
//顶部栏的悬浮
	if(oTop>190){
		oTopHeader.style.display = "block";
	}else{
		oTopHeader.style.display = "none";
	}
	
//点击返回顶部	
	if(oTop>300){
		oBack.style.display="block";
	}else{
		oBack.style.display="none";
	};
	if(!off){
		clearInterval(timer)
	}
	off=false;
};

oBack.onclick = function(){
	clearInterval(timer)
	timer = setInterval(function(){
		var backtop = Math.floor(oTop/4) //浮点数

		if(backtop == 0){
			clearInterval(timer)
			document.documentElement.scrollTop = document.body.scrollTop =0
		}else{
			if(document.documentElement.scrollTop){
				document.documentElement.scrollTop -= backtop;
			}else{
				document.body.scrollTop -= backtop;
			}
			off = true;
		}		
	},30)
}


/*********施工团队的无缝滚动************/
function auto() {
	var oTeFooter = document.getElementById("te_footer");
	var oUls = document.getElementById("footer_list");
	var alis = oUls.getElementsByTagName("li");
	var timer = null;
	var num = 3;

	oUls.innerHTML += oUls.innerHTML;
	oUls.style.width = alis[0].offsetWidth * alis.length + 'px';

	function autoPlay() {
		timer = setInterval(function() {
			if(oUls.offsetLeft == -(oUls.offsetWidth / 2)) {
				oUls.style.left = 0;
			} else if(oUls.offsetLeft > 0) {
				oUls.style.left = -(oUls.offsetWidth / 2) + 'px';
			}
			oUls.style.left = oUls.offsetLeft + num + 'px';
		}, 30)
	}
	autoPlay();

	oTeFooter.onmouseout = function() {
		autoPlay();
	};
	oTeFooter.onmouseover = function() {
		clearInterval(timer);
	};
}
auto();


/*********焦点事件************/
var oSearch = document.getElementById("search");

oSearch.onfocus = function(){
	if(this.value == "请输入关键字"){
		this.value = ""
	}
}
oSearch.onblur = function(){
	if(this.value == ""){
		this.value = "请输入关键字"
	}
}






