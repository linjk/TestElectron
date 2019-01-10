const {app, BrowserWindow} = require('electron');

function createWindow() {
	win = new BrowserWindow({width: 800, height: 600});
	//win.webContents.openDevTools();                        // 打开调试窗口
	win.loadFile('index.html')
	win.on('closed', () => {
		console.log('closed');
		win = null;
	})
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
	console.log('window-all-closed');
	if (process.platform != 'darwin') {
		app.quit();
	}
});
// 该事件在Mac OS X系统才会触发
app.on('activate', () => {
	console.log('activate');
	if (win === null) {
		createWindow();
	}
});