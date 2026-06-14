"use strict";
// 取得年份
function get_year(){
	var node = document.currentScript.parentNode;

	// 通过HTTP请求获取服务器时间
	fetch(location.origin, {method: "HEAD", cache: "no-store"})
	.then(response => {
		// 从响应头获取时间
		node.innerHTML = new Date(response.headers.get("Date")).getFullYear();
	// 获取服务器时间失败
	}).catch(error => {
		// 取本地时间
		node.innerHTML = new Date().getFullYear();
	});
}

// 下载文件函数
//	<a><script>download("点击下载", "目录/文件")</script></a>
function download(title, url){
	var node = document.currentScript.parentNode;
	node.href = "/download.php/" + url + "?id=" + (Date.now() / 1000);
	node.target="_blank"
	node.innerHTML = title;
}

