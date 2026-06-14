"use strict";
// 练习权重
var weight = {};

// 随机选字
function rand(n, txt){
	var lower=n, upper=n+1, sum=0;
	if (n == 0) {
		lower = 1;
		upper = group.length;
	}
	for (var i=lower; i<upper; ++i) {
		for (var j=0; j<group[i].length; ++j) sum += weight[group[i][j]];
	}
	
	var r = Math.floor(Math.random() * sum);
	for (i=lower; i<upper; ++i) {
		for (j=0; j<group[i].length; ++j) {
			r -= weight[group[i][j]];
			if (r < 0) break;
		}
		if (r < 0) break;
	}
	// 如果重复
	if (group[i][j]==txt) if (++j >= group[i].length) j = 0;

	document.getElementById("txt" + n).innerHTML = group[i][j];
	document.getElementById("info" + n).innerHTML = "请输入编码";
}

function check(n){
	// 汉字条目
	var txt = document.getElementById("txt" + n).innerHTML;
	// 输入编码
	var ans = document.getElementById("ans" + n).value.trim();
	// 正确编码
	var c = dict[txt];
	// 简码
	var s = (typeof sc !== "undefined") ? sc[txt] : undefined;

	var info = document.getElementById("info" + n);
	// 输入正确
	if (ans == c || ans == s) {
		if (group[0] == "简码" && (s !== undefined) && ans != s) {
			info.innerHTML = "提示：有简码 " + s;
		} else {
			if (weight[txt] > 1) weight[txt] /= 2;
			rand(n, txt);
		}
	// 输入错误
	} else {
		info.innerHTML = "提示：" + c;
		if (s !== undefined) info.innerHTML += "<br />简码：" + s;
		if (typeof div !== "undefined") {
			var d = div[txt];
			if (d !== undefined) info.innerHTML += "<br />拆分：<span style='font-family: Sky'>" + d + "</span>";
		}
		if (weight[txt] < 16) weight[txt] *= 2;
	}
	document.getElementById("ans" + n).value = "";
}

function train(n){
	for (var i=1; i<group.length; ++i) {
		if (n && i!=n) continue;
		for (var j=0; j<group[i].length; ++j) weight[group[i][j]] = 4;
	}

	// <form action="javascript:check(1)">
	//	<label id="txt1" for="ans1" style="font-size: 200%"><br />
	//	<input type="text" id="ans1" size="8" placeholder="空格提示答案" autocomplete="off" onkeyup="if(this.value.length>=2||this.value.charAt(this.value.length-1)==' ') check(1)" /><br />
	//	<label id="info1" for="ans1"></label>
	// </form>
	var node = document.currentScript.parentNode;
	var form = document.createElement("form");
	node.appendChild(form);
	form.action = "javascript:check(" + n + ")";

	var label = document.createElement("label");
	form.appendChild(label);
	label.id = "txt" + n;
	label.htmlFor = "ans" + n;
	label.style.fontSize = "200%";
	var cl = 4;
	if (group[0] == "字根") {
		cl = 2;
		label.style.fontFamily = "Sky";
	}
	form.innerHTML += "<br />";

	var input = document.createElement("input");
	form.appendChild(input);
	input.type = "text";
	input.id = "ans" + n;
	input.size = "8";
	input.placeholder = "空格提示答案";
	input.autocomplete = "off";
	input.onkeyup = function(){
		if (input.value.length>=cl || input.value.charAt(input.value.length-1) == " ") check(n);
	}
	form.appendChild(document.createElement("br"));

	label = document.createElement("label");
	form.appendChild(label);
	label.id = "info" + n;
	label.htmlFor = "ans" + n;
	
	rand(n, "");
}
