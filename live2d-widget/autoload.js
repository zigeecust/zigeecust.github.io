//注意：live2d_path参数应使用绝对路径
//const live2d_path = "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget/";
const live2d_path = "/live2d-widget/";

//封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;

		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

//加载waifu.css live2d.min.js waifu-tips.js
Promise.all([
	loadExternalResource(live2d_path + "waifu.css", "css"),
	loadExternalResource(live2d_path + "live2d.min.js", "js"),
	loadExternalResource(live2d_path + "waifu-tips.js", "js")
]).then(() => {
	initWidget(live2d_path + "waifu-tips.json", "https://live2d.fghrsh.net/api");
});
//initWidget第一个参数为waifu-tips.json的路径，第二个参数为api地址
//api后端可自行搭建，参考https://github.com/fghrsh/live2d_api
//初始化看板娘会自动加载指定目录下的waifu-tips.json
