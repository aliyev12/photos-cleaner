// require("electron-reload")(__dirname);
const path = require("path");

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

// require("electron-reload")(process.cwd(), {
//   electron: path.join(__dirname, "node_modules", ".bin", "electron.cmd"),
// });
// is go down to '/myproject/src/js/node_modules/.bin/electron.cmd'

// so i replace the __dirname to process.cwd() and it works.

const { app, BrowserWindow, Menu, screen, Tray } = require("electron");

app.on("ready", () => {
  appIcon = new Tray("public/favicon.png");

  const contextMenu = Menu.buildFromTemplate([
    { label: "Show", click: () => window.show() },
    {
      label: "Quit",
      click: () => {
        window.destroy();
        app.quit();
      },
    },
  ]);

  appIcon.setContextMenu(contextMenu);
});

const createWindow = () => {
  // Add it as the first things inside your `createWindow` function
  Menu.setApplicationMenu(false);
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  window = new BrowserWindow({
    width: width / 1.25,
    height: height / 1.25,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.loadFile("public/index.html");

  window.on("minimize", (e) => {
    e.preventDefault();
    window.hide();
  });

  window.on("close", (e) => {
    e.preventDefault();
    window.hide();
  });
};

let window = null;

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
