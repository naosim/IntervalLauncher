// ADOBE AIRを触る部分の処理
var dev = {};

/**
 * 設定データの取得
 */
dev.getLocalData = function() {
	return air.SharedObject.getLocal("data").data.data;
};

/**
 * 設定データの保存
 */
dev.setLocalData = function(json) {
	var so = air.SharedObject.getLocal("data");
	so.data.data = json;
	so.flush();
};

/**
 * アプリケーションの起動
 */
dev.launch = function(path) {
	dev.log("path: " + path);
	
	var nativeProcessStartupInfo = new air.NativeProcessStartupInfo(); 
	var file = new air.File(path);
	file.openWithDefaultApplication();
};

/**
 * ログ出力
 */
dev.log = function(str) {
		air.trace(str);
};

// デバッグ用モック
// デバッグ中は内容を書き換える
/**
 * ブラウザがAIRかどうか
 */
var validAIR = function() {
	var index = navigator.userAgent.indexOf('AdobeAIR');
	var is = index != -1;
	return navigator.userAgent.indexOf('AdobeAIR') != -1;
};

if(!validAIR()) {
	// chrome用に潰す
	dev.getLocalData = function(){return null};
	dev.setLocalData = function(){};
	dev.launch = function(){};
	dev.log = function(){};
}

/**
 * 起動ボタンが押された
 */
var clickLaunchButton = function() {
	var path = getPath(this.parentElement.parentElement);
	dev.launch(path);
};

/**
 * ファイルパスを取得する
 * @param liElm liタグの要素
 */
var getPath = function(liElm) {
	return liElm.getElementsByClassName('pathBox')[0].value.replace(/^\s+|\s+$/g, "");
};

/**
 * ロード完了イベント
 */
window.onload = function() {
	// 起動ボタンの設定
	var launchButtons = document.getElementsByClassName('launchButton');
	for(var i = 0; i < launchButtons.length; i++) {
		var button = launchButtons[i];
		button.addEventListener('click', clickLaunchButton);
	}
	
	// 入力エリアの設定
	var data = dev.getLocalData();
	if(!data) {
		dev.log("data is null");
		dev.setLocalData(["","","","",""]);
		return;
	}
	else {
		dev.log("data exist");
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
 * 保存ボタンタッチ
 */
var clickSave = function() {
	dev.log("clickSave");
	var boxes = document.getElementsByClassName('pathBox');
	var data = ["","","","",""];
	for(var i = 0; i < boxes.length; i++) {
			var box = boxes[i];
			data[i] = box.value;
			dev.setLocalData(data);
	}
};
