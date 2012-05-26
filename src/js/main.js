

/**
 * 起動ボタンが押された
 */
var clickLaunchButton = function() {
	air.trace("Hello World");
	
	var path = getPath(this.parentElement);
	air.trace("path: " + path);
	
};

/**
 * ファイルパスを取得する
 * @param liElm liタグの要素
 */

var getPath = function(liElm) {
	air.trace("liElm: " + liElm);
	return liElm.getElementsByClassName('pathBox')[0].value;
};

var launch = function(path) {
	
};

window.onload = function() {
	var launchButtons = document.getElementsByClassName('launchButton');
	for(var i = 0; i < launchButtons.length; i++) {
		var button = launchButtons[i];
		button.addEventListener('click', clickLaunchButton);
	}
};
