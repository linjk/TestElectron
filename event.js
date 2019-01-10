const { dialog } = require('electron').remote;

function onClick_OpenFile() {
    const label = document.getElementById('label');
    var options = {};
    // windows平台打开对话框的标题
    options.title = '打开文件';
    // mac平台打开对话框的标题
    options.message = '打开我的文件';
    options.buttonLabel = '选择';
    options.defaultPath = '.';
    options.properties = ['openFile'];
    // 在mac系统，不管选择哪一种文件类型，都会为列表显示，只是文件类型不对选择不了，而windows平台会过滤文件的类型
    options.filters = [
        {name: '图像文件', extensions: ['jpg', 'png', 'gif']},
        {name: '所有文件', extensions: ['*']}
    ];
    dialog.showOpenDialog(options, (filePaths) => {
        for (var i = 0; i < filePaths.length; i++) {
            label.innerText += filePaths[i];
        }
    });
}

// 保存对话框只提供了保存的文件名，至于实际的保存逻辑需要代码实现
function onClick_Save() {
    const label = document.getElementById('label');
    var options = {};
    options.title = '保存文件';
    options.buttonLabel = '保存';
    options.defaultPath = '.';
    // mac平台文件名左侧的提示文本
    options.nameFieldLabel = '请输入要保存的文件名';
    options.filters = [
        {name: '图像文件', extensions: ['jpg', 'png', 'gif']},
        {name: '所有文件', extensions: ['*']}
    ];
     dialog.showSaveDialog(options, (filename) => {
        label.innerText = filename;
    });
}

function onClick_MessageBox(msg) {
    const label = document.getElementById('label');
    var options = {};
    options.title = '提示';
    options.message = msg;
    options.icon = 'static/img/logo.png';
    options.type = 'info'; // none(默认)   info    error    question     warning
    label.innerText = dialog.showMessageBox(options);
}