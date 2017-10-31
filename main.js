const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const fs = require('fs')
const dialog = electron.dialog

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

//configure and craeat application's menu 
const Menu = electron.Menu;
const templateMenu = [
	{
		label: "File",
		submenu: [
			{
				label: 'Open file',
				accelerator: 'CommandOrControl+O',
				click()  {
					openFile()
				}
			},
			{
				label: 'Save file as ...',
				accelerator: 'CommandOrControl+S',
				click () { mainWindow.webContents.send('save-file')}
			},
			{
				type: 'separator'
			},
			{
				label: 'Exit',
				accelerator: 'CommandOrControl+Q',
				click: () => {
					app.quit();
				}  
			}
		]
	},
	{
		label: 'Developer',
		submenu: [
			{
				label: 'Toggle Developer Tools',
				// accelerator: process.platform === 'darwin'
				//   ? 'Alt+Command+I'
				//   : 'Ctrl+Shift+I',
				accelerator: 'F12',
				click () { mainWindow.webContents.toggleDevTools() }
			},
			{
				label: 'About...',
				click() {
					showAbout()
				}
			}
		]
	}
]

const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({width: 970, height: 600, minHeight: 600, minWidth: 800, backgroundColor: '#2e2c29'})

	//mainWindow.setMenu();

	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
 
	 // Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	});  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow) 

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function openFile () {
	const files = dialog.showOpenDialog(mainWindow, {
		properties: ['openFile']
	})

	if (!files) return
	const file = files[0]
	const content = fs.readFileSync(file)

	mainWindow.webContents.send('file-opened', file, content)
}

function saveAsFile (content) {
	const fileName = dialog.showSaveDialog(mainWindow, {
		title: 'Save Contacts List',
		defaultPath: app.getPath('documents'),
	})

		if(!fileName) return
	 
		fs.writeFileSync(fileName, content)
}

function showAbout() {

	let child = new BrowserWindow({
		parent: mainWindow, 
		modal: true, 
		show: false, 
		menu: false,  
		minHeight: 350, 
		height: 350, 
		minWidth: 560, 
		width: 560, 
		titleBarStyle: 'hiddenInset'
	})

	child.setMenu(null)

	child.loadURL(url.format({
		pathname: path.join(__dirname, './src/assets/html/about.html'),
		protocol: 'file:',
		slashes: true
	})); 

	child.once('ready-to-show', () => {
		child.show()
	})
}


exports.saveAsFile = saveAsFile