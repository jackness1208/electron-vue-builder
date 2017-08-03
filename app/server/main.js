'use strict';
const 
    electron = require('electron'),
    path = require('path'),
    util = require('yyl-util'),
    BrowserWindow = electron.BrowserWindow,
    app = electron.app,
    isDebug = util.envPrase('debug');

var mainWindow = null;

function initialize () {
    var shouldQuit = makeSingleInstance();
    if (shouldQuit) {
        return app.quit();
    }


    function createWindow () {
        var windowOptions = {
            width: 1080,
            minWidth: 680,
            height: 840,
            title: app.getName()
        };

        if (process.platform === 'linux') {
            windowOptions.icon = path.join(__dirname, '../assets/app-icon/png/512.png');
        }

        mainWindow = new BrowserWindow(windowOptions);
        mainWindow.loadURL(path.join('file://', __dirname, '../assets/html/index.html'));

        // Launch fullscreen with DevTools open, usage: npm run debug
        if (isDebug) {
            mainWindow.webContents.openDevTools();
            mainWindow.maximize();
            require('devtron').install();
        }

        mainWindow.on('closed', function () {
            mainWindow = null;
        });
    }

    app.on('ready', function () {
        createWindow();
    });

    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', function () {
        if (mainWindow === null) {
            createWindow();
        }
    });
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
    if (process.mas) {
        return false;
    }

    return app.makeSingleInstance(function () {
        if (mainWindow) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        }
    });
}

// start
initialize();
