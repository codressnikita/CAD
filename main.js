const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Optional for IPC
            nodeIntegration: false,
        },
    });

    const startUrl = process.env.ELECTRON_START_URL || file://${path.join(__dirname, './out/index.html')};
    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', () => (mainWindow = null));
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});