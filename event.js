const { dialog } = require('electron').remote;

function onClick_OpenFile() {
    const label = document.getElementById('label');
    label.innerText = dialog.showOpenDialog({properties: ['openFile']});
}