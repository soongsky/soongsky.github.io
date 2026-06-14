"use strict";
function utf(ucs){
	var t = "U+" + ucs.toString(16).toUpperCase();
	if (TG.has(String.fromCodePoint(ucs))) t += "（通规）";
	t += "\nUTF-8：";
	var utf8 = utou8(ucs);
	for (var i=0; i<utf8.length; ++i) {
		if (i > 0) t += " ";
		var u = utf8[i].toString(16).toUpperCase();
		t += "0".repeat(2 - u.length) + u;
	}
	t += "\nUTF-16：";
	var utf16 = utou16(ucs);
	for (i=0; i<utf16.length; ++i) {
		if (i > 0) t += " ";
		var u = utf16[i].toString(16).toUpperCase();
		t += "0".repeat(4 - u.length) + u;
	}
	t += "\nGB：" + utogb(ucs).toString(16).toUpperCase();
	alert(t);
}

function single(ch){
	var ucs = ch.codePointAt(0);
	var info = document.getElementById("info");
	var a = document.createElement("a");
	info.appendChild(a);
	a.href = "http://zi.tools/zi/" + ch;
	a.target="_blank";
	a.innerHTML = ch;
	info.innerHTML += "（U+";

	a = document.createElement("a");
	info.appendChild(a);
	a.href = "javascript:utf(" + ucs + ")";
	a.innerHTML = ucs.toString(16).toUpperCase();
	info.innerHTML += "）："

	// 查编码
	var c = code[ch];
	if (c === undefined) {
		info.innerHTML += "-";
		return;
	}
	
	var elem = info;
	// 拆分加字体显示
	for (var i=0; i<c.length; ++i) {
		if (c.charAt(i)=="[" || c.charAt(i)=="·") {
			elem.innerHTML += "·";
			elem = document.createElement("span");
			info.appendChild(elem);
			elem.className = "sky";
		} else if (c.charAt(i) == "]") elem = info;
		else elem.innerHTML += c.charAt(i);
	}
}

function word(txt){
	var wd = [];
	// 分字
	for (var i=0; i<txt.length; ++i) {
		var ch = txt.charAt(i);
		var ucs = txt.codePointAt(i);
		// 超集
		if (ucs >= 0x10000) ch += txt.charAt(++i);
		wd.push(ch);
	}
	// 单字
	if (wd.length == 1) {
		single(wd[0]);
		return;
	}
	
	var info = document.getElementById("info");
	info.innerHTML += txt + "：";
	// 词码
	var wc="";
	for (i=0; i<wd.length; ++i) {
		// 取前3后1
		if (i>=3 && i!=wd.length-1) continue;
		// 单字编码
		var cc = code[wd[i]];
		if (cc === undefined) {
			info.innerHTML += "-";
			return;
		}
		wc += cc[0];
		// 双字词、三字词末字
		if (wd.length==2 || i==2 && wd.length==3) wc += cc[1];
	}
	info.innerHTML += wc;
}

function lookup(){
	// 汉字条目
	var txt = document.getElementById("txt").value.trim();
	var k = document.getElementById("single").checked;
	document.getElementById("txt").value = "";
	var info = document.getElementById("info");
	info.innerHTML = "";

	// 字词分段
	var seg = [];
	// 单字
	if (k) for (var i=0; i<txt.length; ++i) {
		var ch = txt.charAt(i);
		if (ch == " ") continue;
		var ucs = txt.codePointAt(i);
		// 超集
		if (ucs >= 0x10000) ch += txt.charAt(++i);
		seg.push(ch);
	// 词组
	} else {
		seg = txt.split(" ");
	}
	
	for (i=0; i<seg.length; ++i) {
		if (i > 0) info.innerHTML += "<br />";
		if (i >= 10) {
			info.innerHTML += "……";
			break;
		}
		if (k) single(seg[i]);
		else word(seg[i]);
	}
}