"use strict";
function album(photo){
	// <div style="text-align:right"><a>&lt;&lt;上图</a> <a>下图&gt;&gt;</a></div>
	// <a target="_blank"><img id="image" width="320" /></a>
	// <div style="text-align:center"></div>
	var n = 0;
	var alb = document.currentScript.parentNode;
	var div = document.createElement("div");
	alb.appendChild(div);
	div.style.textAlign = "right";
	
	var pre = document.createElement("input");
	div.appendChild(pre);
	pre.type = "button";
	pre.value = "<<上图";
	pre.onclick = function(){
		--n;
		show();
	};

	div.appendChild(document.createTextNode(" "));

	var next = document.createElement("input");
	div.appendChild(next);
	next.type = "button";
	next.value = "下图>>";
	next.onclick = function(){
		++n;
		show();
	};

	var a = document.createElement("a");
	alb.appendChild(a);
	a.target="_blank";
	var img = document.createElement("img");
	a.appendChild(img);
	img.width = "320";
	
	div = document.createElement("div");
	alb.appendChild(div);
	div.style.textAlign = "center";
	
	show();

	function show(){
		if (n < 0) n = photo.length-1;
		else if (n >= photo.length) n = 0;
		a.href = img.src = "../img/soongs/" + photo[n][0];
		div.textContent = img.alt = photo[n][1];
	}
}
