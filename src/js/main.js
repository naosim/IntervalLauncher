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
	dev.launch = function(path){dev.log("launch : " + path);};
	dev.log = function(str){console.log(str)};
}

/**
 * 起動ボタンが押された
 */
var clickLaunchButton = function() {
	dev.log("clickLaunchButton");
	var path = getPath(this.parentElement.parentElement);
	dev.launch(path);
};

/**
 * 起動ボタンが押された
 */
var clickStartButton = function() {
	dev.log("clickStartButton");
	var cell = this.parentElement.parentElement;
	cell.isStarted = !cell.isStarted;
	cell.nextDate = createNextDate(getInterval(cell));
	checkCell(cell);
};

/**
 * 間隔を取得する[ミリsec]
 */
var getInterval = function(cell) {
	return parseInt(cell.getElementsByClassName('intervalBox')[0].value) * 60 * 1000;
};

var createNextDate = function(interval) {
	return new Date().getTime() + interval;
};

/**
 * 起動ボタンが押された
 */
// var clickStopButton = function() {
	// dev.log("clickStopButton");
	// var cell = this.parentElement.parentElement;
	// cell.isStarted = false;
	// checkCell(cell);
// };

/**
 * ファイルパスを取得する
 * @param cellElm liタグの要素
 */
var getPath = function(cellElm) {
	return cellElm.getElementsByClassName('pathBox')[0].value.replace(/^\s+|\s+$/g, "");
};

var initButtons = function(className, clickFunction){
	var btns = document.getElementsByClassName(className);
	for(var i = 0; i < btns.length; i++) {
		var button = btns[i];
		button.addEventListener('click', clickFunction);
	}
};

/**
 * 起動ボタンのセットアップ
 */
// var initLaunchButtons = function() {
	// var launchButtons = document.getElementsByClassName('launchButton');
	// for(var i = 0; i < launchButtons.length; i++) {
		// var button = launchButtons[i];
		// button.addEventListener('click', clickLaunchButton);
	// }
// };

/**
 * パスのセットアップ
 * @param {Array} defaults パスの配列
 */
var initPathBoxes = function(defaults) {	
	var boxes = document.getElementsByClassName('pathBox');
	var intervalBoxes = document.getElementsByClassName('intervalBox');
	for(var i = 0; i < boxes.length; i++) {
			var box = boxes[i];
			var intervalBox = intervalBoxes[i];
			var cell = box.parentElement.parentElement.parentElement.parentElement;
			
			cell.isStarted = false;
			box.value = defaults[i];
			
			box.oninput = function(){checkCell(this.parentElement.parentElement.parentElement.parentElement)};
			intervalBox.oninput = function(){checkCell(this.parentElement.parentElement.parentElement.parentElement)};
	}
};

/**
 * 保存ボタンのセットアップ
 */
var initSaveButton = function() {
	var saveButton = document.getElementsByClassName('saveButton')[0];
	saveButton.addEventListener('click', clickSave);
};

/**
 * ロード完了イベント
 */
window.onload = function() {
	// 起動ボタンの設定
	// initLaunchButtons();
	initButtons("startButton", clickStartButton);
	// initButtons("stopButton", clickStopButton);
	initButtons("launchButton", clickLaunchButton);
	
	// 入力エリアの設定
	var data = dev.getLocalData();
	if(!data) {
		data = ["","","","",""];
	}
	initPathBoxes(data);
	
	// 保存ボタンの設定
	initSaveButton();
	
	// Cellの状態をチェック
	checkAllCell();
	
	mainLoop();
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

/**
 * 起動ボタンのenable/disableをチェック
 * 条件：パスがあったらenable
 */
var validLaunch = function(path) {
	return path.length > 0;
};

/**
 * スタートボタンのenable/disableをチェック
 * 条件：パスがある && 間隔がある && スタートしてない
 */
var validStart = function(path, interval, isStarted) {
	return path.length > 0 && interval.length > 0;
};

/**
 * スタートボタンのenable/disableをチェック
 * 条件：パスがある && 間隔がある && スタートしている
 */
var validStop = function(path, interval, isStarted) {
	return isStarted;
};

var checkAllCell = function() {
	var trElms = document.getElementsByClassName('cell');
	for(var i = 0; i < trElms.length; i++) {
		checkCell(trElms[i]);
	}
};

var checkCell = function(cellElm) {
	var statusLabel = cellElm.getElementsByClassName('status')[0];
	
	var pathBox = cellElm.getElementsByClassName('pathBox')[0];
	var intervalBox = cellElm.getElementsByClassName('intervalBox')[0];
	
	var startButton = cellElm.getElementsByClassName('startButton')[0];
	// var stopButton = cellElm.getElementsByClassName('stopButton')[0];
	var launchButton = cellElm.getElementsByClassName('launchButton')[0];
	
	var pathBox = cellElm.getElementsByClassName('pathBox')[0];
	var intervalBox = cellElm.getElementsByClassName('intervalBox')[0];
	
	if(cellElm.isStarted) {
		// 残り時間
		var restTime = cellElm.nextDate - new Date().getTime();
		if(restTime < 0) {
			launchButton.click();
			cellElm.nextDate = createNextDate(getInterval(cellElm));
		}
		
		statusLabel.className = "status label label-info";
		statusLabel.innerHTML = formatTime(restTime);
		
		pathBox.readOnly = true;
		pathBox.className = "pathBox xlarge uneditable-input";
		
		intervalBox.readOnly = true;
		intervalBox.className = "intervalBox xlarge uneditable-input";
		
		startButton.innerHTML = "ストップ";
	} else {
		statusLabel.className = "status label";
		statusLabel.innerHTML = "停止中";
		
		pathBox.readOnly = false;
		pathBox.className = "pathBox xlarge";
		
		intervalBox.readOnly = false;
		intervalBox.className = "intervalBox xlarge input";
		
		startButton.innerHTML = "スタート";
	}
	
	updateButton(startButton, 'startButton', validStart(pathBox.value, intervalBox.value, cellElm.isStarted));
	// updateButton(stopButton, 'stopButton', validStop(pathBox.value, intervalBox.value, cellElm.isStarted));
	updateButton(launchButton, 'launchButton', validLaunch(pathBox.value));
	
};

var updateButton = function(btn, className, isValid) {
	btn.disabled = !isValid;
	btn.className = className + ' btn';
	if(!isValid) {
		btn.className += ' disabled';
	}
}

/**
 * 残り時間表示のフォーマッター
 */
var formatTime = function(restTime) {
	if(restTime < 60 * 1000) {
		// 1分以内
		return Math.ceil(restTime / 1000) + "秒";
	} else if(restTime < 60 * 60 * 1000) {
		// １時間以内
		return Math.ceil(restTime / 1000 / 60) + "分"; 
	} else {
		// 1時間以上
		return Math.ceil(restTime / 1000 / 60 / 60) + "時間";
	}
}

/**
 * メインループ
 * 1秒おきに実行される
 */
var mainLoop = function() {
	// dev.log("mainLoop");
	
	checkAllCell();
	
	window.setTimeout(mainLoop, 1000);
}
