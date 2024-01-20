import electron, { app, shell, BrowserWindow, Tray, Menu, Notification } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let mainWindow: electron.BrowserWindow
let visibleState = true

function createWindow(): void {
  if (BrowserWindow.getAllWindows().length < 1) {
    const display = electron.screen.getPrimaryDisplay()
    const width = display.workAreaSize.width
    const height = display.workAreaSize.height
    // console.log(electron.screen.)
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 150,
      height: 200,
      opacity: 1,
      transparent: true,
      resizable: false,
      skipTaskbar: true,
      x: width - 150,
      y: height - 200,
      // movable: false,
      maximizable: false,
      minimizable: false,
      title: 'HR Notification',
      // frame: false,
      autoHideMenuBar: true,
      alwaysOnTop: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })
    // mainWindow.set
    mainWindow.on('ready-to-show', () => {
      mainWindow.show()
      // mainWindow.hide()
      mainWindow.removeMenu()
    })

    mainWindow.on('close', (e) => {
      e.preventDefault()
      mainWindow.hide()
      visibleState = false
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }
}

function createTray(): void {
  const tray = new Tray(join(__dirname, '../../resources/icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Close/Show',
      checked: visibleState,
      click: (): void => {
        if (visibleState) mainWindow.hide()
        else mainWindow.show()
        visibleState = !visibleState
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Opacity',
      type: 'submenu',
      submenu: [
        {
          type: 'radio',
          label: '25%',
          click: (): void => {
            mainWindow.setOpacity(0.25)
          }
        },
        {
          type: 'radio',
          label: '50%',
          click: (): void => {
            mainWindow.setOpacity(0.5)
          }
        },
        {
          type: 'radio',
          label: '75%',
          click: (): void => {
            mainWindow.setOpacity(0.75)
          }
        },
        {
          type: 'radio',
          label: '100%',
          checked: true,
          click: (): void => {
            mainWindow.setOpacity(1)
          }
        }
      ]
    },
    {
      label: 'Docker',
      type: 'checkbox',
      checked: true,
      click: (): void => {
        const notification = new Notification({
          icon: join(__dirname, '../../resources/icon.png'),
          title: 'asdfasfd',
          body: 'aaaaaaaaa',
          subtitle: 'ssdddfff',
          actions: []
        })
        notification.on('click', () => console.log('noti -> click'))
        notification.show()
        // mainWindow.set
      }
    },
    {
      label: 'Always on Top',
      type: 'checkbox',
      checked: true,
      click: (e): void => {
        mainWindow.setAlwaysOnTop(e.checked)
      }
    },
    {
      label: 'Startup',
      type: 'checkbox',
      checked: true,
      click: (e): void => {
        app.setLoginItemSettings({
          openAtLogin: e.checked
        })
      }
    },

    {
      type: 'separator'
    },
    {
      label: 'Exit',
      click: (): void => {
        app.exit()
      }
    }
  ])
  tray.addListener('double-click', () => {
    mainWindow.show()
    visibleState = true
  })

  tray.addListener('click', () => {
    mainWindow.show()
    visibleState = true
  })

  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  createTray()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length < 1) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
