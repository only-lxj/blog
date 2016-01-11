// JavaScript Document
//获取外部样式表 
function getStyle(obj,name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj,false)[name];
	}
}
//运动框架
//调用：startMove(对象,{属性1:值,属性2:值},速度（0-1）,运动完成后调用的函数)
//例子：startMove(oDiv,{width:200.opacity:100},0.3,function(){alert('a');})
function startMove(obj,json,rate, fnEnd)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;
		for(var attr in json)              //json{attr:iTarget}
		{
			var initial=0;
			//获取初始值
			if(attr=='opacity')
			{
				initial=Math.round(parseFloat(getStyle(obj,attr))*100);
			}
			else
			{
				initial=parseInt(getStyle(obj, attr));
			}
			var speed=(json[attr]-initial)*rate;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(initial!=json[attr])
			{
				bStop=false;
			}
			
			//透明度单独判断，单位不同时可以加判断条件（else if）
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(initial+speed)+')';
				obj.style.opacity=(initial+speed)/100;
			}
			else
			{
				obj.style[attr]=initial+speed+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
			if(fnEnd)
				fnEnd();
		}
	},30);
	
}


window.onload=function(){
	var cot=document.getElementById('menu-toc');
	var cots=cot.getElementsByTagName('li');
	var but=document.getElementById('search');
	var sea=document.getElementById('searchArea');
	var badSearch=document.getElementById('badSearch');
	
	function sousuo()
	{
		var k=0;
		for(var i=0;i<cots.length;i++)
		{			
			
			var contentStr=cots[i].innerHTML.toLowerCase();
			var searchStr=sea.value.toLowerCase();
			var strs=searchStr.split(' ');
			cots[i].style.display='none';
			badSearch.style.display='none';
			for(var j=0;j<strs.length;j++)
			{
				if(contentStr.search(strs[j])!=-1)
				{
					k++;
					cots[i].style.display='block';	
				}				
			}
		}
		if(k==0)
		{			
			badSearch.style.display='block';
		}	
	}
	but.onclick=function()
	{
		sousuo();
	};
	sea.onkeydown=function(ev)
	{
		var oEvent=ev||event;
		if(oEvent.keyCode==13)
		{
			sousuo();
		}
	}
	
	
	var comment=document.getElementById('commentArea');
	var read=document.getElementById('read');
	var read1=document.getElementById('read1');
	var read2=document.getElementById('read2');
	var read3=document.getElementById('read3');
	var timer=null;
	read3.onclick=read2.onclick=read1.onclick=read.onclick=function sildeDown(){										
		clearInterval(timer);
		timer=setInterval(function(){
			var speed=(0-comment.offsetTop)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			comment.style.top=comment.offsetTop+speed+'px';
		},30);
	};
	var close=document.getElementById('close');
	close.onclick=function slideUp(){
		clearInterval(timer);
		timer=setInterval(function(){
			var speed=(-580-comment.offsetTop)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			comment.style.top=comment.offsetTop+speed+'px';
		},30);
	}
	
	
	var write=document.getElementById('write');
	var write1=document.getElementById('write1');
	var write2=document.getElementById('write2');
	var write3=document.getElementById('write3');
	var writeComment=document.getElementById('writeComment');
	var writeComment1=document.getElementById('writeComment1');
	write3.onclick=write2.onclick=write1.onclick=write.onclick=function(){
		writeComment.style.display="block";	
		writeComment1.style.display="block";
	}
	var close2=document.getElementById('close2');
	close2.onclick=function(){
		writeComment.style.display="none";	
		writeComment1.style.display="none";
	}
	
	
	function toDouble(n){
		if(n<10)	return '0'+n;
		else	return ''+n;
	}
	var d=document.getElementById('submit');
	var b=document.getElementById('commentArea');
	d.onclick=function()
	{
		var c=document.createElement('div');
		var f=b.getElementsByTagName('div');
		var myDate = new Date();
		var g=myDate.getFullYear()+'/'+(myDate.getMonth()+1)+'/'+myDate.getDate()+'&nbsp;&nbsp;'+toDouble(myDate.getHours())+':'+toDouble(myDate.getMinutes());
		var h=b.getElementsByTagName('a');	
		if(document.all.txt1.value=='')
		{
			alert("评论不可为空！")
		}
		else
		{
			c.innerHTML='<p style="color:#e1875b;padding:5px 0 0 0;"><img src="../images/huahua.png" align="absmiddle" />花花</p>'+
			'<p id="changeArea" style="padding-bottom:10px;">'+document.all.txt1.value+'</p>'+
			'<span style="font-size:12px;">'+g+'</span>'+
			'<a href="javascript:;">删除</a>'+'<br/>';
			b.insertBefore(c,f[0]);
			for(var i=0;i<h.length;i++)
			{
				h[i].onclick=function ()
				{
					b.removeChild(this.parentNode);
				};	
			}
			document.all.txt1.value='';	
			var iHeight=c.offsetHeight;
			c.style.height=0;
			startMove(c,{height:iHeight},0.3,function(){
				startMove(c,{opacity:100},0.2);
			})
			
			
			writeComment.style.display="none";	
			writeComment1.style.display="none";	
			clearInterval(timer);
			timer=setInterval(function(){
				/*if(comment.offsetTop==0)
				{clearInterval(timer);}
				else
				{
					comment.style.top=comment.offsetTop+10+'px';
				}*/
				var speed=(0-comment.offsetTop)/10;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				comment.style.top=comment.offsetTop+speed+'px';
			},30);
		};
	}
	/*var close=document.getElementsByClassName('close');
	close[0].onclick=function slideUp(){
		clearInterval(timer);
		timer=setInterval(function(){
			var speed=(-580-comment.offsetTop)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			comment.style.top=comment.offsetTop+speed+'px';
		},30);	
	};*/
	var m=document.getElementById('change');
	m.onclick=function()
	{
		var f=b.getElementsByTagName('div');
		f[0].style.color='red';	
	};
			
};
