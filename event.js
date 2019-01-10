const remote = require('electron');
const dialog = remote.dialog;

function onClick_OpenFile() {
    console.log('点击按钮-打开文件对话框......');
    const label = document.getElementById('label');
    label.innerText = dialog.showOpenDialog({properties: ['openFile']})
}