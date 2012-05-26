

/**
 * 起動ボタンが押された
 */
var clickLaunchButton = function() {
	air.trace("Hello World");
	
	var path = getPath(this.parentElement);
	air.trace("path: " + path);
	launch(path);
	
};

/**
 * ファイルパスを取得する
 * @param liElm liタグの要素
 */
var getPath = function(liElm) {
	air.trace("liElm: " + liElm);
	return liElm.getElementsByClassName('pathBox')[0].value.replace(/^\s+|\s+$/g, "");
};

var launch = function(path) {
	/*
	if(!air.NativeProcess.isSupported) {
		air.trace("bat bat");
		alert("batbat");
	
		return;
	} else {
		air.trace("good good");
		alert("goodgood");
	}
	*/
	
	var nativeProcessStartupInfo = new air.NativeProcessStartupInfo(); 
	var file = new air.File(path);
	file.openWithDefaultApplication();
	// var file = air.File.applicationDirectory.resolvePath("/Users/nao_pillows/Documents/Aptana Studio 3 Workspace/IntervalLauncher/src/hoge.txt"); 
	// nativeProcessStartupInfo.executable = file; 
// var processArgs = new air.Vector["<String>"](); 
// processArgs.push("hello"); 
// nativeProcessStartupInfo.arguments = processArgs; 
	// var process = new air.NativeProcess();
// var onOutputData = function(event) { 
    // var stdOut = process.standardOutput; 
    // var data = stdOut.readUTFBytes(process.standardOutput.bytesAvailable); 
    // air.trace("Got: ", data);
// };
// process.addEventListener(air.ProgressEvent.STANDARD_OUTPUT_DATA, onOutputData); 
	// process.start(nativeProcessStartupInfo); 

};

window.onload = function() {
	var launchButtons = document.getElementsByClassName('launchButton');
	for(var i = 0; i < launchButtons.length; i++) {
		var button = launchButtons[i];
		button.addEventListener('click', clickLaunchButton);
	}
};
