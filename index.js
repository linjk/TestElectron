// 打包工具: npm install electron-packager -g
// 发布(electron -v): electron-packager . TestElectron --electron-version=4.0.1

const {app, BrowserWindow, Menu} = require('electron');

const template = [
	{
		label: '文件',
		submenu: [
			{
				label: '关于',
				role: 'about',
				click: () => {
					var aboutWin = new BrowserWindow({width:300, height: 200, parent: win, modal: true});
					aboutWin.loadFile('https://www.baidu.com');
				}
			},
			{
				type: 'separator'
			},
			{
				label: '关闭',
				accelerator: 'Command+Q',
				click: () => {
					win.close();
				}
			}
		]
	},
	{
		label: '编辑',
		submenu: [
			{
				label: '复制',
				click: () => {win.webContents.insertText('复制')}
			},
			{
				label: '剪切',
				click: () => {win.webContents.insertText('剪切')}
			},
			{
				type: 'separator'
			},
			{
				label: '查找',
				accelerator: 'Command+F',
				click: () => {win.webContents.insertText('查找')}
			},
			{
				label: '替换',
				accelerator: 'Command+R',
				click: () => {win.webContents.insertText('替换')}
			}
		]
	}
];

function createWindow() {
	win = new BrowserWindow({width: 800, height: 600});
	win.webContents.openDevTools();                        // 打开调试窗口
	win.loadFile('index.html')
	// 创建菜单对象
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
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
// 该事件在Mac OS X系统才会触发(缩小回dock再点击放大显示时)
app.on('activate', () => {
	console.log('activate');
	if (win === null) {
		createWindow();
	}
});