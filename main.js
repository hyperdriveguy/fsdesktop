const {app, BrowserWindow, Menu, shell, nativeImage} = require('electron')
  
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // Create the window
    icon = nativeImage.createFromDataURL('https://edge.fscdn.org/assets/docs/fs_logo_favicon_sq.png')
    win = new BrowserWindow(
      {
        width: 800,
        height: 600,
        title: "FamilySearchDesktop",
        icon: 'icon'
      }
    )
    makeMenu()
  
    // Load the FamilySearch website
    win.loadURL('https://www.familysearch.org')
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }
  
  function makeMenu () {
  
    const menuItems = [
      {
        label: 'View',
        submenu: [
          {role: 'reload'},
          {type: 'separator'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]
      },
      {
        role: 'Help',
        submenu: [
          {
            label: 'Report Bug',
            click () { shell.openExternal('https://github.com/hyperdriveguy/fsdesktop/issues') }
          },
          {
            label: 'Contact Developer',
            click () { shell.openExternal('mailto:hyperdriveguy@gmail.com') }
          },
          {
            label: 'Source Code',
            click () { shell.openExternal('https://github.com/hyperdriveguy/fsdesktop') }
          }
        ]
      }
    ]
    
    const menu = Menu.buildFromTemplate(menuItems)
    Menu.setApplicationMenu(menu)
  
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })
