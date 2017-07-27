'use strict';

const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = require('electron');

let win;

function createWindow () {

    win = new BrowserWindow({
        width : 300,
        height : 685,
        show : false,
        resizable : false,
        fullscreenable : false,
        titleBarStyle : 'hidden',
        closable : false,
        minimizable : false,
        maximizable : false,
        // focusable : false,
        transparent : true,
        skipTaskbar : true,
    });

    win.loadURL(url.format({
        slashes : true,
        protocol : 'file:',
        pathname : path.join(__dirname, 'index.html'),
    }));

    win.once('ready-to-show', () => win.show());

    win.on('closed', () => win = null);

    win.webContents.on('will-navigate', ( event ) => {
        event.preventDefault();
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate([]));

    ipcMain.on('close', ( event ) => {
        win.setClosable(true);
        app.quit();
        event.returnValue = '';
    });

    // win.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => app.quit());

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

app.dock.hide();
