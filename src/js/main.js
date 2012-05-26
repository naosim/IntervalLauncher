

/**
 * 起動ボタンが押された
 */
var clickLaunchButton = function() {
	var path = getPath(this.parentElement.parentElement);
	launch(path);
};

/**
 * ファイルパスを取得する
 * @param liElm liタグの要素
 */
var getPath = function(liElm) {
	return liElm.getElementsByClassName('pathBox')[0].value.replace(/^\s+|\s+$/g, "");
};

var getLocalData = function() {
	return air.SharedObject.getLocal("data").data.data;
};

var setLocalData = function(json) {
	var so = air.SharedObject.getLocal("data");
	so.data.data = json;
	so.flush();
};

var launch = function(path) {
	air.trace("path: " + path);
	
	var nativeProcessStartupInfo = new air.NativeProcessStartupInfo(); 
	var file = new air.File(path);
	file.openWithDefaultApplication();
};

window.onload = function() {
	// ボタンの設定
	var launchButtons = document.getElementsByClassName('launchButton');
	for(var i = 0; i < launchButtons.length; i++) {
		var button = launchButtons[i];
		button.addEventListener('click', clickLaunchButton);
	}
	
	// 入力エリアの設定
	var data = getLocalData();
	if(!data) {
		air.trace("data is null");
		setLocalData(["","","","",""]);
		return;
	}
	else {
		air.trace("data exist");
	}
	var boxes = document.getElementsByClassName('pathBox');
	for(var i = 0; i < boxes.length; i++) {
			var box = boxes[i];
			box.value = data[i];
	}
	
	// 保存ボタン
	var saveButton = document.getElementsByClassName('saveButton')[0];
	saveButton.addEventListener('click', clickSave);
};

/**
 * 保存
 */
var clickSave = function() {
	air.trace("clickSave");
	var boxes = document.getElementsByClassName('pathBox');
	var data = ["","","","",""];
	for(var i = 0; i < boxes.length; i++) {
			var box = boxes[i];
			data[i] = box.value;
			setLocalData(data);
	}
};
