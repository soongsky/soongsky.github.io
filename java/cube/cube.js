"use strict";
// 颜色值
var color = {"绿":"#008B0D", "蓝":"#00468B", "橙":"#FC7216", "红":"#A90034", "白":"#FFFFFF", "黄":"#FFF100", "灰":"#666666"}; // Rubiks官方贴纸
//var color = {"绿":"#029347", "蓝":"#0051BA", "橙":"#FF5800", "红":"#C62535", "白":"#EEEEEE", "黄":"#FFD313", "灰":"#666666"}; // WCA官方Logo
//var color = {"绿":"#009E60", "蓝":"#0051BA", "橙":"#FF5800", "红":"#C41E3A", "白":"#FFFFFF", "黄":"#FFD500", "灰":"#666666"};
// 常用魔方配色
var preset_face = [
	["绿前白顶", {"f":"绿", "b":"蓝", "l":"橙", "r":"红", "u":"白", "d":"黄", "x":"灰"}],
	["绿前黄顶", {"f":"绿", "b":"蓝", "l":"红", "r":"橙", "u":"黄", "d":"白", "x":"灰"}],
	["蓝前白顶", {"f":"蓝", "b":"绿", "l":"红", "r":"橙", "u":"白", "d":"黄", "x":"灰"}],
	["蓝前黄顶", {"f":"蓝", "b":"绿", "l":"橙", "r":"红", "u":"黄", "d":"白", "x":"灰"}],
	["白前蓝顶", {"f":"白", "b":"黄", "l":"橙", "r":"红", "u":"蓝", "d":"绿", "x":"灰"}]
];
// 转换AnimCube魔方配色
var anim_color = {"绿":"g", "蓝":"b", "橙":"0", "红":"r", "白":"w", "黄":"y", "灰":"*"};

// 背景色；默认为白色
var bg ="#FFFFFF";

// 魔方配色；默认“绿前白顶”
var fc = 0;
var face_color = preset_face[fc][1];

// 魔方由指定初状态，按公式转动后，输出终状态图片，如：
//	<script>cube("ffffffff", "bbbbbbbb", "lllllllll", "rrrrrrrrr", "uuuuuuuuu", "ddddddddd", "U2FL2U2R2FL2F2L'D'B2RD2R'B'U'L'B'", "blrud", 3,3,3)</script>
//	<canvas width="200" height="200"><script>cube("uuuuffufd", "dulrblurl", "blrblrfdb", "lbrdrdfbr", "dbbuurfff", "llrldddfb")</script></canvas>
//	<canvas width="1000" height="1000" style="width:200px; height:200px"><script>cube("", "", "", "", "", "", "U2FL2U2R2FL2F2L'D'B2RD2R'B'U'L'B'", "bld", 3)</script></canvas>
// 参数说明：
//	f,b,l,r,u,d：魔方初状态时前、后、左、右、顶、底各面所有方格的颜色
//		每个字母表示该方格颜色所对应的面色（面色实际颜色值由全局变量进行预定义，以便全站统一魔方配色），字母位置与方格位置的对应关系如下：
//			+-------+
//			| 0 1 2 |
//			| 3 U 5 |
//			| 6 7 8 |
//			+-------+-------+-------+-------+
//			| 0 1 2 | 0 1 2 | 0 1 2 | 0 1 2 |
//			| 3 F 5 | 3 R 5 | 3 B 5 | 3 L 5 |
//			| 6 7 8 | 6 7 8 | 6 7 8 | 6 7 8 |
//			+-------+-------+-------+-------+
//			| 0 1 2 |
//			| 3 D 5 |
//			| 6 7 8 |
//			+-------+
//		例如：“uuuuffufd”表示前面颜色状态为：
//			+-------+
//			| u u u |
//			| u f f |
//			| u f d |
//			+-------+
//	move：转动公式
//	v：需显示的面，默认为“fru”（显示前、右、顶面）
//	nx：魔方x方向阶数，默认为“3”
//	ny,nz：魔方y、z方向阶数，默认与nx同
function cube(f,b,l,r,u,d, move, v, nx,ny,nz){
	// 颜色状态
	var front=[], back=[], left=[], right=[], up=[], down=[];
	// 输出图片大小；默认为100
	var size = 100;

	// 显示左面时的α角度；默认为-30°
	var alpha_left = -30;
	// 显示右面时的α角度；默认为30°
	var alpha_right = 30;
	// 显示顶面时的β角度；默认为-25°
	var beta_up = -25;
	// 显示底面时的β角度；默认为20°
	var beta_down = 20;

	// 视角绕z轴旋转α角度；默认为显示右面
	var alpha = alpha_right;
	// 视角绕x轴旋转β角度；默认为显示顶面
	var beta = beta_up;

	// 魔方阶数默认为3阶
	if (nx === undefined) nx = 3;
	if (ny === undefined) ny = nx;
	if (nz === undefined) nz = nx;
	var n = Math.max(nx, ny, nz);
	
	for (var i=0; i<nx*nz; ++i) {
		front[i] = (f!==undefined&&i<f.length) ? f.charAt(i) : "f";
		back[i] = (b!==undefined&&i<b.length) ? b.charAt(i) : "b";
	}
	for (var i=0; i<ny*nz; ++i) {
		left[i] = (l!==undefined&&i<l.length) ? l.charAt(i) : "l";
		right[i] = (r!==undefined&&i<r.length) ? r.charAt(i) : "r";
	}
	for (var i=0; i<nx*ny; ++i) {
		up[i] = (u!==undefined&&i<u.length) ? u.charAt(i) : "u";
		down[i] = (d!==undefined&&i<d.length) ? d.charAt(i) : "d";
	}

	if (move !== undefined) {
		// 按公式转动
		turn(move);
	}

	// 默认显示前、右、顶面
	if (v === undefined) v = "fru";
	// 如果显示左面而显示右面，视角为左面
	if (v.indexOf("l")>=0 && v.indexOf("r")<0) {
		alpha = alpha_left;
	}
	// 如果显示底面而不显示顶面，视角为底面
	if (v.indexOf("d")>=0 && v.indexOf("u")<0) {
		beta = beta_down;
	}

	// 显示魔方
	var node = document.currentScript.parentNode;
	var canvas;
	if (node.tagName === "CANVAS") {
		canvas = node;
	} else {
		canvas = document.createElement("canvas");
		node.appendChild(canvas);
		canvas.width = canvas.height = size;
	}
	// 取显示区大小
	var rect = canvas.getBoundingClientRect();
	// 设置显示区大小
	canvas.style.width = rect.width + "px";
	canvas.style.height = rect.height + "px";
	
	// 为了提高图像质量，画板放大至4倍，同时考虑人为设定值，取其大值
	var k = Math.max(4, canvas.width/rect.width, canvas.height/rect.height);
	// 设置画板大小
	canvas.width = rect.width * k;
	canvas.height = rect.height * k;
	size = Math.min(canvas.width, canvas.height);

	// 2D上下文对象
	var ctx = canvas.getContext("2d");

	// 画背景底色
	ctx.fillStyle = bg;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	alpha *= Math.PI / 180;
	var sina = Math.sin(alpha);
	var cosa = Math.cos(alpha);
	beta *= Math.PI / 180;
	var sinb = Math.sin(beta);
	var cosb = Math.cos(beta);

	// 坐标系绕z轴旋转α角度，再绕新的x轴旋转β角度，旋转矩阵为：
	// |a11 a12 a13|   |1    0      0  |  | cosα  sinα 0|   | cosα       sinα        0  |
	// |a21 a22 a23| = |0  cosβ  sinβ|×|-sinα  cosα 0| = |-sinαcosβ  cosαcosβ sinβ|
	// |a31 a32 a33|   |0 -sinβ  cosβ|  |   0      0   1|   | sinαsinβ -cosαsinβ cosβ|
	var a11 = cosa;
	var a12 = sina;
	var a13 = 0;
	var a21 = -sina * cosb;
	var a22 = cosa * cosb;
	var a23 = sinb;
	var a31 = sina * sinb;
	var a32 = -cosa * sinb;
	var a33 = cosb;

	// |x|   |a11 a12 a13|  |x|
	// |y| = |a21 a22 a23|×|y|
	// |z|   |a31 a32 a33|  |z|
	// 魔方x方向边长
	var lrx = a11 * nx / n;
	var lry = a21 * nx / n;
	var lrz = a31 * nx / n;
	// 魔方y方向边长
	var fbx = a12 * ny / n;
	var fby = a22 * ny / n;
	var fbz = a32 * ny / n;
	// 魔方z方向边长
	var udx = a13 * nz / n;
	var udy = a23 * nz / n;
	var udz = a33 * nz / n;

	// 前左上顶点坐标：
	var flux = (-lrx - fbx + udx) / 2;
	var fluy = (-lry - fby + udy) / 2;
	var fluz = (-lrz - fbz + udz) / 2;
	// 前右上顶点坐标：
	var frux = (lrx - fbx + udx) / 2;
	var fruy = (lry - fby + udy) / 2;
	var fruz = (lrz - fbz + udz) / 2;
	// 后右上顶点坐标：
	var brux = (lrx + fbx + udx) / 2;
	var bruy = (lry + fby + udy) / 2;
	var bruz = (lrz + fbz + udz) / 2;
	// 后左上顶点坐标：
	var blux = (-lrx + fbx + udx) / 2;
	var bluy = (-lry + fby + udy) / 2;
	var bluz = (-lrz + fbz + udz) / 2;
	// 前左下顶点坐标：
	var fldx = (-lrx - fbx - udx) / 2;
	var fldy = (-lry - fby - udy) / 2;
	var fldz = (-lrz - fbz - udz) / 2;
	
	if (v.indexOf("b") >= 0) {
		// 后面投影远离0.13
		var k = 0.13 / Math.sqrt(a12 * a12 + a32 * a32);
		// 画后面投影
		face(brux+a12*k,bruy+a22*k,bruz+a32*k, -lrx,-lry,-lrz, -udx,-udy,-udz, nx,nz, back);
	}
	if (v.indexOf("l")>=0 && v.indexOf("r")>=0) {
		// 左面投影远离0.13
		var k = 0.13 / Math.sqrt(a11 * a11 + a31 * a31);
		// 画左面投影
		face(blux-a11*k,bluy-a21*k,bluz-a31*k, -fbx,-fby,-fbz, -udx,-udy,-udz, ny,nz, left);
	}
	if (v.indexOf("d")>=0 && v.indexOf("u")>=0) {
		// 底面投影远离0.13
		var k = 0.13 / Math.sqrt(a13 * a13 + a33 * a33);
		// 画底面投影
		face(fldx-a13*k,fldy-a23*k,fldz-a33*k, lrx,lry,lrz, fbx,fby,fbz, nx,ny, down);
	}

	// 画前面
	face(flux,fluy,fluz, lrx,lry,lrz, -udx,-udy,-udz, nx,nz, front);

	if (v.indexOf("l")>=0 && v.indexOf("r")<0) {
		// 画左面
		face(blux,bluy,bluz, -fbx,-fby,-fbz, -udx,-udy,-udz, ny,nz, left);
	} else {
		// 画右面
		face(frux,fruy,fruz, fbx,fby,fbz, -udx,-udy,-udz, ny,nz, right);
	}

	if (v.indexOf("d")>=0 && v.indexOf("u")<0) {
		// 画底面
		face(fldx,fldy,fldz, lrx,lry,lrz, fbx,fby,fbz, nx,ny, down);
	} else {
		// 画顶面
		face(blux,bluy,bluz, lrx,lry,lrz, -fbx,-fby,-fbz, nx,ny, up);
	}

	// 魔方视角坐标值转换为屏幕坐标值
	//	x,y,z：魔方角坐标值；从左到右为x轴，从前到后为y轴，从下到上为z轴；原点位于魔方中心，坐标值以魔方最大边长为单位
	// 返回：屏幕坐标值；从左到右为vx轴，从上到下为vy轴；原点位于左上角，坐标值以输出图片大小为单位
	function vs(x, y, z){
		// 魔方显示比例为0.57（对顶角距离√3），从3倍距离的地方观看，并调整到屏幕中心（预留投影面位置）
		var vx = 0.52 + x / (1 / 0.57 + y / 3);
		var vy = 0.45 - z / (1 / 0.57 + y / 3);
		return [vx, vy];
	}

	// 画方块
	//	x,y,z：起点坐标
	//	dux,duy,duz：u方向上的x、y、z增量
	//	dvx,dvy,dvz：v方向上的x、y、z增量
	//	color：颜色值
	function square(x,y,z, dux,duy,duz, dvx,dvy,dvz, color){
		// 另三个顶点坐标值
		var x2 = x + dux;
		var y2 = y + duy;
		var z2 = z + duz;
		
		var x3 = x2 + dvx;
		var y3 = y2 + dvy;
		var z3 = z2 + dvz;
		
		var x4 = x + dvx;
		var y4 = y + dvy;
		var z4 = z + dvz;

		// 屏幕坐标值
		var vxy1 = vs(x, y, z);
		var vxy2 = vs(x2, y2, z2);
		var vxy3 = vs(x3, y3, z3);
		var vxy4 = vs(x4, y4, z4);
		
		// 画方块
		ctx.beginPath();
		ctx.moveTo(vxy1[0]*size, vxy1[1]*size);
		ctx.lineTo(vxy2[0]*size, vxy2[1]*size);
		ctx.lineTo(vxy3[0]*size, vxy3[1]*size);
		ctx.lineTo(vxy4[0]*size, vxy4[1]*size);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
	}

	// 画一个面
	//	x,y,z：起点坐标
	//	dux,duy,duz：u方向上的边长增量
	//	dvx,dvy,dvz：v方向上的边长增量
	//	nu,nv：u、v方向上的阶数
	//	f：所在面的颜色状态
	function face(x,y,z, dux,duy,duz, dvx,dvy,dvz, nu,nv, f){
		// 画平面
		square(x,y,z, dux,duy,duz, dvx,dvy,dvz, "#111111");

		// u方向上的方格边长增量
		dux /= nu;
		duy /= nu;
		duz /= nu;
		// v方向上的方格边长增量
		dvx /= nv;
		dvy /= nv;
		dvz /= nv;

		// u方向上的方格边框增量
		var bux = dux * 0.05;
		var buy = duy * 0.05;
		var buz = duz * 0.05;
		// v方向上的方格边框增量
		var bvx = dvx * 0.05;
		var bvy = dvy * 0.05;
		var bvz = dvz * 0.05;

		// u方向上的贴纸边长增量
		var sux = dux - bux - bux;
		var suy = duy - buy - buy;
		var suz = duz - buz - buz;
		// v方向上的贴纸边长增量
		var svx = dvx - bvx - bvx;
		var svy = dvy - bvy - bvy;
		var svz = dvz - bvz - bvz;

		// 画方格贴纸
		for (var v=0,m=0,x0=x+bux+bvx,y0=y+buy+bvy,z0=z+buz+bvz; v<nv; ++v, x0+=dvx,y0+=dvy,z0+=dvz) {
			for (var u=0, x1=x0,y1=y0,z1=z0; u<nu; ++u,++m, x1+=dux,y1+=duy,z1+=duz) {
				// 画方块
				square(x1,y1,z1, sux,suy,suz, svx,svy,svz, color[face_color[f[m]]]);
			}
		}
	}

	// 转动一个面
	//	f：所转动面的颜色状态
	//	n_turn：转动角度
	//	nu,nv：u、v方向阶数
	function turn_face(f, n_turn, nu,nv){
		for (var i=0; i<n_turn; ++i) {
			var f0 = f.slice();
			// 非等边魔方每次必须转动两个角度
			// +-------+u   +-------+
			// | 0 1 2 |    | 5 4 3 |
			// | 3 F 5 | => | 2 F 0 |
			// +-------+    +-------+
			// v
			if (nu != nv) {
				for (var v=0,m0=0,m1=nu*nv-1; v<nv; ++v) {
					for (var u=0; u<nu; ++u,++m0,--m1) {
						f[m1] = f0[m0];
					}
				}
				++i;
				continue;
			}
			// +-------+u   +-------+
			// | 0 1 2 |    | 6 3 0 |
			// | 3 F 5 | => | 7 F 1 |
			// | 6 7 8 |    | 8 5 2 |
			// +-------+    +-------+
			// v
			for (var v=0,m0=0; v<nv; ++v) {
				for (var u=0,m1=nv-v-1; u<nu; ++u,++m0,m1+=nv) {
					f[m1] = f0[m0];
				}
			}
		}
	}

	// 转动一层的侧面
	//	fu1,fv1,fu2,fv2：所转动四个侧面的颜色状态
	//	n_turn：转动角度
	//	nu,nv：u、v方向阶数
	//	u01,du1, v01,dv1：fu1、fv1侧面所转动层的方格序号起点、增量
	//	u02,du2, v02,dv2：fu2、fv2侧面所转动层的方格序号起点、增量
	function turn_layer(fu1,fv1,fu2,fv2, n_turn, nu,nv, u01,du1, v01,dv1, u02,du2, v02,dv2){
		for (var i=0; i<n_turn; ++i) {
			// 非等边魔方每次必须转动两个角度
			//   +-------+                        +-------+
			//   | 0 U 2 |u1                      |D5 U D3|
			//   | 3 4 5 |               v2       | 3 4 5 |
			//   +-------+-----+-------+-----+    +-------+-----+-------+-----+
			//   | F F F | 0 1 | B B B | 0 1 |    | F F F | 0 L2| B B B | 0 D3 2|
			//   | F F F | 2 R | B B B | 2 L | => | F F F | 2 R | B B B | 3 L  5|
			//   +-------+-----+-------+-----+    +-------+-----+-------+-----+
			//   | 0 1 2 |   v1                   | 0 1 2 |
			// u2| 3 D 5 |                        |U2 D U0|
			//   +-------+                        +-------+
			if (nu != nv) {
				for (var u=0,m1=u01,m2=u02; u<nu; ++u,m1+=du1,m2+=du2) {
					var t = fu1[m1];
					fu1[m1] = fu2[m2];
					fu2[m2] = t;
				}
				for (var v=0,m1=v01,m2=v02; v<nv; ++v,m1+=dv1,m2+=dv2) {
					var t = fv1[m1];
					fv1[m1] = fv2[m2];
					fv2[m2] = t;
				}
				++i;
				continue;
			}
			//   +-------+                            +-------+
			//   | 0 1 2 |                            | 0 1 2 |
			//   | 3 U 5 |u1                          |L7 U L1|
			//   | 6 7 8 |                   v2       | 6 7 8 |
			//   +-------+-------+-------+-------+    +-------+-------+-------+-------+
			//   | F F F | 0 1 2 | B B B | 0 1 2 |    | F F F | 0 U3 2| B B B | 0 D3 2|
			//   | F F F | 3 R 5 | B B B | 3 L 5 | => | F F F | 3 R  5| B B B | 3 L  5|
			//   | F F F | 6 7 8 | B B B | 6 7 8 |    | F F F | 6 U5 8| B B B | 6 D5 8|
			//   +-------+-------+-------+-------+    +-------+-------+-------+-------+
			//   | 0 1 2 |   v1                       | 0 1 2 |
			// u2| 3 D 5 |                            |R7 D R1|
			//   | 6 7 8 |                            | 6 7 8 |
			//   +-------+                            +-------+
			for (var u=0,mu1=u01,mv1=v01,mu2=u02,mv2=v02; u<nu; ++u,mu1+=du1,mv1+=dv1,mu2+=du2,mv2+=dv2) {
				var t = fu1[mu1];
				fu1[mu1] = fv2[mv2];
				fv2[mv2] = fu2[mu2];
				fu2[mu2] = fv1[mv1];
				fv1[mv1] = t;
			}
		}
	}

	// 转动前面
	//	layer：所转动的层序号
	//	n_turn：转动角度
	function turn_F(layer, n_turn){
		if (layer == 0) {
			turn_face(front, n_turn, nx,nz);
		} else if (layer == ny-1) {
			turn_face(back, 4-n_turn, nx,nz);
		}
		turn_layer(up,right,down,left, n_turn, nx,nz, (ny-layer-1)*nx,1, layer,ny, (layer+1)*nx-1,-1, ny*nz-layer-1,-ny);
	}

	// 转动后面
	//	layer：所转动的层序号
	//	n_turn：转动角度
	function turn_B(layer, n_turn){
		if (layer == 0) {
			turn_face(back, n_turn, nx,nz);
		} else if (layer == ny-1) {
			turn_face(front, 4-n_turn, nx,nz);
		}
		turn_layer(up,left,down,right, n_turn, nx,nz, (layer+1)*nx-1,-1, layer,ny, (ny-layer-1)*nx,1, ny*nz-layer-1,-ny);
	}

	// 转动左面
	//	layer：所转动的层序号
	//	n_turn：转动角度
	function turn_L(layer, n_turn){
		if (layer == 0) {
			turn_face(left, n_turn, ny,nz);
		} else if (layer == nx-1) {
			turn_face(right, 4-n_turn, ny,nz);
		}
		turn_layer(up,front,down,back, n_turn, ny,nz, layer,ny, layer,nx, layer,ny, nx*nz-layer-1,-nx);
	}

	// 转动右面
	//	layer：所转动的层序号
	//	n_turn：转动角度
	function turn_R(layer, n_turn){
		if (layer == 0) {
			turn_face(right, n_turn, ny,nz);
		} else if (layer == nx-1) {
			turn_face(left, 4-n_turn, ny,nz);
		}
		turn_layer(up,back,down,front, n_turn, ny,nz, nx*ny-layer-1,-ny, layer,nx, nx*ny-layer-1,-ny, nx*nz-layer-1,-nx);
	}

	// 转动顶面
	//	layer：所转动的层序号
	//	n_turn：转动角度
	function turn_U(layer, n_turn){
		if (layer == 0) {
			turn_face(up, n_turn, nx,ny);
		} else if (layer == nz-1) {
			turn_face(down, 4-n_turn, nx,ny);
		}
		turn_layer(back,right,front,left, n_turn, nx,ny, (layer+1)*nx-1,-1, (layer+1)*ny-1,-1, (layer+1)*nx-1,-1, (layer+1)*ny-1,-1);
	}

	// 转动底面
	//	layer：所转动的层序号
	//	n_turn：转动角度
	function turn_D(layer, n_turn){
		if (layer == 0) {
			turn_face(down, n_turn, nx,ny);
		} else if (layer == nz-1) {
			turn_face(up, 4-n_turn, nx,ny);
		}
		turn_layer(front,right,back,left, n_turn, nx,ny, (nz-layer-1)*nx,1, (nz-layer-1)*ny,1, (nz-layer-1)*nx,1, (nz-layer-1)*ny,1);
	}

	// 按公式转动
	//	move：转动公式
	//		F、B、L、R、U、D：转动第一层
	//		TF、TB、TL、TR、TU、TD：同时转动第一层、第二层
	//		T3F、T3B、T3L、T3R、T3U、T3D：同时转动第一层~第三层
	//		NF、NB、NL、NR、NU、ND：转动第二层
	//		N3F、N3B、N3L、N3R、N3U、N3D：转动第三层
	//		VF、VB、VL、VR、VU、VD：同时转动第二层、第三层
	//		V3F、V3B、V3L、V3R、V3U、V3D：同时转动第二层~第四层
	//		MF、MB、ML、MR、MU、MD：转动中间一层（偶数阶为最靠近中间的一层）
	//		M2F、M2B、M2L、M2R、M2U、M2D：转动中间两层（偶数阶为最靠近中间的两层）
	//		SF、SB、SL、SR、SU、SD：同时转动转动第一层、倒一层
	//		S2F、S2B、S2L、S2R、S2U、S2D：同时转动转动第一层~第二层、倒二层~倒一层
	//		WF、WB、WL、WR、WU、WD：同时转动转动第二层~倒二层
	//		CF、CB、CL、CR、CU、CD：转动整个魔方
	function turn(move){
		var len = move.length;
		for (var i=0; i<len; ++i) {
			var type = "N";
			var num = 1;
			if ("TNVMSWC".indexOf(move.charAt(i)) >= 0) {
				type = move.charAt(i);
				if (++i >= len) break;
				// 如果后面带数字
				var nc = 0;
				while ("0123456789".indexOf(move.charAt(i+nc)) >= 0) ++nc;
				if (nc) {
					num = move.substr(i, nc);
					i += nc;
				} else if (type=="T" || type=="N" || type=="V") num = 2;
			}
			var f = move.charAt(i);
			var n_turn = 1;
			if (i+1 < len) {
				if (move.charAt(i+1) == "2") {
					n_turn = 2;
					++i;
				} else if (move.charAt(i+1)=="'" || move.charAt(i+1)=="i") {
					n_turn = 3;
					++i;
				}
			}

			var m;
			var turn_func;
			if (f == "F") {
				turn_func = turn_F;
				m = ny;
			} else if (f == "B") {
				turn_func = turn_B;
				m = ny;
			} else if (f == "L") {
				turn_func = turn_L;
				m = nx;
			} else if (f == "R") {
				turn_func = turn_R;
				m = nx;
			} else if (f == "U") {
				turn_func = turn_U;
				m = nz;
			} else if (f == "D") {
				turn_func = turn_D;
				m = nz;
			} else {
				continue;
			}

			if (type == "T") {
				if (num > m) num = m;
				for (var k=0; k<num; ++k) turn_func(k, n_turn);
			} else if (type == "N") {
				if (num > m) num = m;
				turn_func(num-1, n_turn);
			} else if (type == "V") {
				if (num+1 > m) num = m-1;
				for (var k=1; k<num+1; ++k) turn_func(k, n_turn);
			} else if (type == "M") {
				var from = Math.floor((m-num)/2);
				if (from < 0) from = 0;
				if (num+from > m) num = m-from;
				for (var k=from; k<from+num; ++k) turn_func(k, n_turn);
			} else if (type == "S") {
				if (num > m/2) num = Math.floor(m/2);
				for (var k=0; k<num; ++k) {
					turn_func(k, n_turn);
					turn_func(m-k-1, n_turn);
				}
			} else if (type == "W") {
				for (var k=1; k<m-1; ++k) turn_func(k, n_turn);
			} else if (type == "C") {
				for (var k=0; k<m; ++k) turn_func(k, n_turn);
			}
		}
	}
}

// 取魔方配色
function get_color(face){
	var node = document.currentScript.parentNode;
	for (var i=0; i<face.length; ++i) {
		var elem;
		if (i) {
			elem = document.createElement("span");
			node.appendChild(elem);
		} else elem = node;
		elem.innerHTML = face_color[face.charAt(i)];
		elem.style.border = "1px solid gray";
		elem.style.background = color[face_color[face.charAt(i)]];
	}
}

// 魔方配色选择器
function selector(){
	// 所保存的魔方配色
	fc = localStorage.getItem("fc");
	if (fc===null || fc<0) fc = 0;
	else if (fc >= preset_face.length) fc = preset_face.length - 1;
	face_color = preset_face[fc][1];

	var node = document.currentScript.parentNode;
	var label = document.createElement("label");
	node.appendChild(label);
	label.innerHTML = "魔方配色";
	node.appendChild(document.createElement("br"));
	var select = document.createElement("select");
	node.appendChild(select);
	for (var i=0; i<preset_face.length; ++i) {
		var option = document.createElement("option");
		select.appendChild(option);
		option.text = preset_face[i][0];
	}
	select.selectedIndex = fc;
	select.onchange = function(){
		localStorage.setItem("fc", select.selectedIndex);
		location.reload();
	};
}

// AnimCube魔方facelets配色的位置对应如下：
// +----------+
// | 17 18 19 |
// | 14  U 16 |
// | 11 12 13 |
// +----------+----------+----------+----------+
// | 31 34 37 | 61 64 67 | 41 44 47 | 53 52 51 |
// | 32  F 38 | 62  R 68 | 42  B 48 | 56  L 54 |
// | 33 34 39 | 63 66 69 | 43 46 49 | 59 58 57 |
// +----------+----------+----------+----------+
// | 21 24 27 |
// | 22  D 28 |
// | 23 26 29 |
// +----------+
function animcube(f, b, l, r, u, d, move, n, init){
	if (move === undefined) move = "";
	if (n === undefined) n = 3;
	if (init === undefined) init = "";
	
	var facelets = "";
	// 上面
	for (var i=0; i<n; ++i) {
		for (var j=0; j<n; ++j) {
			var z = (n-1-i)*n + j;
			facelets += anim_color[face_color[(u!==undefined && z<u.length) ? u.charAt(z) : "u"]];
		}
	}
	// 下面
	for (var i=0; i<n; ++i) {
		for (var j=0; j<n; ++j) {
			var z = j*n + i;
			facelets += anim_color[face_color[(d!==undefined && z<d.length) ? d.charAt(z) : "d"]];
		}
	}
	// 前面
	for (var i=0; i<n; ++i) {
		for (var j=0; j<n; ++j) {
			var z = j*n + i;
			facelets += anim_color[face_color[(f!==undefined && z<f.length) ? f.charAt(z) : "f"]];
		}
	}
	// 后面
	for (var i=0; i<n; ++i) {
		for (var j=0; j<n; ++j) {
			var z = j*n + i;
			facelets += anim_color[face_color[(b!==undefined && z<b.length) ? b.charAt(z) : "b"]];
		}
	}
	// 左面
	for (var i=0; i<n; ++i) {
		for (var j=0; j<n; ++j) {
			var z = i*n + (n-1-j);
			facelets += anim_color[face_color[(l!==undefined && z<l.length) ? l.charAt(z) : "l"]];
		}
	}
	// 右面
	for (var i=0; i<n; ++i) {
		for (var j=0; j<n; ++j) {
			var z = j*n + i;
			facelets += anim_color[face_color[(r!==undefined && z<r.length) ? r.charAt(z) : "r"]];
		}
	}
	var func;
	if (n == 2) func = AnimCube2;
	else if (n == 3) func = AnimCube3;
	else if (n == 4) func = AnimCube4;
	else if (n == 5) func = AnimCube5;
	else if (n == 6) func = AnimCube6;
	else if (n == 7) func = AnimCube7;
	else return;

	var node = document.currentScript.parentNode;
	node.style.width = "160px";
	node.style.height = "179px";
	func("buttonbar=1&snap=1&hint=3&hintborder=1&scale=2&repeat=0&facelets="+facelets+"&move="+move+"&initmove="+init);
}
