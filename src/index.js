const { BrowserWindow } = require('electron').remote
const path = require('path')
const axios = require('axios')
const ipcRenderer = require('electron').ipcRenderer

const newWindowBtn = document.getElementById('notifyBtn')
let price = document.getElementById('price')
let targetPrice = document.getElementById('targetPrice')
let targetPriceVal;

const notification = {
    title: 'BTC Alert',
    body: 'Beeepp Beeeep'
}

let getBTC = () => {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=PHP')
        .then(res => {
            const cryptos = res.data.BTC.PHP
            price.innerHTML = `PHP ${Number(cryptos).toLocaleString('en')}`;

            if (targetPrice.innerHTML != '' && Number(targetPriceVal) > res.data.BTC.PHP) {
                const myNotification = new window.Notification(notification.title, notification)
            }
        })
}
getBTC()
setInterval(getBTC, 10000)

newWindowBtn.addEventListener('click', (event) => {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({
        frame: false,
        width: 400,
        height: 200,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    win.on('close', () => { win = null })
    win.loadURL(modalPath)
    win.show()
})

ipcRenderer.on('targetPriceVal', (event, arg) => {
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = `PHP ${targetPriceVal.toLocaleString('en')}`
})