'use strict';

var
    electron = require('electron'),
    client = require('electron-connect').client,
    app = electron.app,
    path = require('path'),
    BrowserWindow = electron.BrowserWindow,
    globalShortcut = electron.globalShortcut,
    mainWindow = null,
    submenu = null,
    ipc = electron.ipcMain;

app.on('ready', function(){
    mainWindow = new BrowserWindow({
        resizable: false,
        frame: false,
        width: 800, 
        height: 600,
        titleBarStyle: 'hidden'
    });

    mainWindow.loadURL(path.join('file://', __dirname, 'views/html/index.html'));

    globalShortcut.register('f4', function(){
        mainWindow.webContents.send('global-shortcut', 0);

    });

    // client.create(mainWindow);
});

ipc.on('close-main-window', function(){
    console.log('===', 'close-main-window')
    app.quit();
});

ipc.on('open-submenu', function(){
    if(submenu){
        return;
    }
    submenu = new BrowserWindow({
        frame: false,
        height: 400,
        width: 200,
        resizable: false
    });

    submenu.loadURL('file://' + __dirname + '/app/pages/submenu/submenu.html');


    submenu.on('closed', function(){
        submenu = null;
    });
});

ipc.on('close-submenu', function(){
    if(submenu){
        submenu.close();
    }
});
