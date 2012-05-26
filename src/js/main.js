

/**
 * 起動ボタンが押された
 */
var clickLaunchButton = function() {
	air.trace("Hello World");
	
	var path = getPath(this.parentElement);
	air.trace("path: " + path);
	launch();
	
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
var nativeProcessStartupInfo = new air.NativeProcessStartupInfo(); 
var file = air.File.applicationDirectory.resolvePath("test.exe"); 
nativeProcessStartupInfo.executable = file; 
var processArgs = new air.Vector["<String>"](); 
processArgs.push("hello"); 
nativeProcessStartupInfo.arguments = processArgs; 
process = new air.NativeProcess();
var onOutputData = function(event) { 
    var stdOut = process.standardOutput; 
    var data = stdOut.readUTFBytes(process.standardOutput.bytesAvailable); 
    air.trace("Got: ", data); 
};
process.addEventListener(air.ProgressEvent.STANDARD_OUTPUT_DATA, onOutputData); 
process.start(nativeProcessStartupInfo); 

};

window.onload = function() {
	var launchButtons = document.getElementsByClassName('launchButton');
	for(var i = 0; i < launchButtons.length; i++) {
		var button = launchButtons[i];
		button.addEventListener('click', clickLaunchButton);
	}
};
