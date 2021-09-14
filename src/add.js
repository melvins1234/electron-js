const remote = require('electron').remote
const electron = require('electron')
const path = require('path')
const ipcRenderer = electron.ipcRenderer

const closeWindow = document.getElementById('closeBtn');

closeWindow.addEventListener('click', (event) => {
    let window = remote.getCurrentWindow();
    window.close();
})

const updateBtn = document.getElementById('updateBtn');
updateBtn.addEventListener('click', () => {
    ipcRenderer.send('update-notify-value', document.getElementById('notifyVal').value)
    remote.getCurrentWindow().close();
})