// 打包工具: npm install electron-packager -g
// 发布(electron -v): electron-packager . TestElectron --electron-version=4.0.1

const {app, BrowserWindow, Menu, Tray} = require('electron');

let tray;
let contextMenu;

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
				label: '撤销',
				role: 'undo'
			},
			{
				label: '重做',
				role: 'redo'
			},
			{
				label: '剪切',
				role: 'cut'
			},
			{
				label: '复制',
				role: 'copy'
			},
			{
				label: '粘贴',
				role: 'paste'
			}
		]
	},
	{
		label: '调试',
		submenu: [
			{
				label: '显示调试工具',
				role: 'toggleDevTools'
			}
		]
	}
];

function createWindow() {
	win = new BrowserWindow({width: 800, height: 600});
	win.webContents.openDevTools();                        // 打开调试窗口
	win.loadFile('index.html')
	if (process.platform == 'darwin') {
		template.unshift({
			label: 'Mac',
			submenu: [
				{
					label: '关于',
					role: 'about'
				},
				{
					label: '开始说话',
					role: 'startSpeaking'
				},
				{
					label: '停止说话',
					role: 'stopSpeaking'
				}
			]
		})
	}
	// 创建托盘对象
	tray = new Tray('static/img/app.png');
	contextMenu = Menu.buildFromTemplate([
		{label: '复制', role: 'copy'},   // 在windows中，使用role设置菜单项的预定功能不起作用(作为应用菜单可以)
		{label: '粘贴', role: 'paste'},
		{label: '剪切', role: 'cut'},
		{label: '关闭', role: 'close', click:()=>{win.close()}}
	])
	tray.setToolTip('TestElectron');
	tray.setContextMenu(contextMenu);
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