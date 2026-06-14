<?php session_start(); ?>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>
<body>
<?php
// 以http://zm.soongsky.com/test/index.php/foo.bar?q=t为例：

// /home/soong/public_html/zm/tool/testserver.php
echo "被包含文件的完整路径和文件名(__FILE__): " . __FILE__ . "<br />\n";
// /home/soong/public_html/zm/tool
echo "dirname(__FILE__): " . dirname(__FILE__) .  "<br />\n";
// /home/soong/public_html/zm/
echo "运行脚本所在文档系统的根目录(DOCUMENT_ROOT): {$_SERVER['DOCUMENT_ROOT']}<br />\n";

// zm.soongsky.com
echo "运行脚本所在服务器名(SERVER_NAME): {$_SERVER['SERVER_NAME']}<br />\n";
// 223.104.246.51
echo "运行脚本所在服务器IP地址(SERVER_ADDR): {$_SERVER['SERVER_ADDR']}<br />\n";
// 80
echo "服务器端口(SERVER_PORT): {$_SERVER['SERVER_PORT']}<br />\n";

// /test/index.php/foo.bar?q=t
echo "不含服务器名的URI(REQUEST_URI): {$_SERVER['REQUEST_URI']}<br />\n";
// /test/index.php/foo.bar
echo "运行脚本的相对路径和文件名，带地址参数(PHP_SELF): {$_SERVER['PHP_SELF']}<br />\n";
// /test/index.php
echo "运行脚本的相对路径和文件名(SCRIPT_NAME): {$_SERVER['SCRIPT_NAME']}<br />\n";
// /home/soong/public_html/zm/test/index.php
echo "运行脚本的绝对路径和文件名(SCRIPT_FILENAME): {$_SERVER['SCRIPT_FILENAME']}<br />\n";
// /foo.bar
echo "地址参数(PATH_INFO): {$_SERVER['PATH_INFO']}<br />\n";
// /home/soong/public_html/zm/foo.bar
echo "地址参数对应的绝对路径(PATH_TRANSLATED): {$_SERVER['PATH_TRANSLATED']}<br />\n";
// q=t
echo "查询(QUERY_STRING): {$_SERVER['QUERY_STRING']}<br />\n";

// 空
echo "用户主机(REMOTE_HOST): {$_SERVER['REMOTE_HOST']}<br />\n";
// 223.104.246.51
echo "用户IP地址(REMOTE_ADDR): " . $_SERVER['REMOTE_ADDR'] . "<br />\n";	
// 56397
echo "用户端口(REMOTE_PORT): " . $_SERVER['REMOTE_PORT'] . "<br />\n";

// zm.soongsky.com
echo "HTTP请求Host(HTTP_HOST): " . $_SERVER['HTTP_HOST'] . "<br />\n";
if (!empty($_SERVER['HTTP_REFERER'])) {
	echo "HTTP_REFERER(链接到当前页面的前一页面的 URL 地址): " . $_SERVER['HTTP_REFERER'] . "<br />\n";
}
echo "HTTP_X_FORWARDED_FOR:" . $_SERVER['HTTP_X_FORWARDED_FOR'] . "<br />\n";
echo "HTTP_X_FORWARDED_HOST:" . $_SERVER['HTTP_X_FORWARDED_HOST'] . "<br />\n";
echo "HTTP_X_FORWARDED_SERVER:" . $_SERVER['HTTP_X_FORWARDED_SERVER'] . "<br />\n";
echo "HTTP_CLIENT_IP:" . $_SERVER['HTTP_CLIENT_IP'] . "<br />\n";
echo "HTTP_X_USER_IP:" . $_SERVER['HTTP_X_USER_IP'] . "<br />\n";
echo "HTTP_VIA:" . $_SERVER['HTTP_VIA'] . "<br />\n";	//1.0 translate.google.com (TWS/0.9), 1.0 proxy.google.com:80 (boomed)IPHTTP

// GET
echo "页面请求方式(REQUEST_METHOD):" . $_SERVER['REQUEST_METHOD'] . "<br />\n";
// 1497236415
echo "页面请求时间戳(REQUEST_TIME): {$_SERVER['REQUEST_TIME']}<br />\n";
/*
if(getenv("HTTP_CLIENT_IP")) { 
$ip = getenv("HTTP_CLIENT_IP"); 
$ip_agent = getenv("REMOTE_ADDR"); 
} elseif(getenv("HTTP_X_FORWARDED_FOR")) { 
$ip_real = getenv("HTTP_X_FORWARDED_FOR"); 
$ip_agent = getenv("REMOTE_ADDR"); 
} else { 
$ip_real = getenv("REMOTE_ADDR"); 
$ip_agent = ""; 
}*/

echo "<br \>_SERVER：";
print_r($_SERVER);
echo "<br \>";
echo "<br \>_COOKIE：";
print_r($_COOKIE);
echo "<br \>";
echo "<br \>_SESSION：";
print_r($_SESSION);
echo "<br \>";
echo "<br \>_REQUEST：";
print_r($_REQUEST);
echo "<br \>";
echo "<br \>_POST：";
print_r($_POST);
echo "<br \>";
echo "<br \>_GET：";
print_r($_GET);

?>
<script language="javascript">
	document.writeln("host:" + location.host + "<br />");	// soonghwee.cn
	document.writeln("hostname:" + location.hostname + "<br />");	//soonghwee.cn
</script>
</body>
</html>