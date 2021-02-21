// require("electron-reload")(__dirname);
const fs = require("fs");
const path = require("path");
const Similarities = require("./js/Similarities");
const log = require("simple-node-logger").createSimpleFileLogger("project.log");

// require("electron-reload")(__dirname, {
//   electron: path.join(__dirname, "node_modules", ".bin", "electron"),
//   awaitWriteFinish: true,
// });

// require("electron-reload")(process.cwd(), {
//   electron: path.join(__dirname, "node_modules", ".bin", "electron.cmd"),
// });
// is go down to '/myproject/src/js/node_modules/.bin/electron.cmd'

// so i replace the __dirname to process.cwd() and it works.

const {
  app,
  BrowserWindow,
  Menu,
  screen,
  Tray,
  MenuItem,
  ipcMain,
  dialog,
} = require("electron");

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
    width: width,
    height: height,
    // width: width / 1.25,
    // height: height / 1.25,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.webContents.openDevTools();

  //Setup Message Listeners
  ipcMain.on("runsimilarities", (e, content) => {
    const similarities = new Similarities(window);
    console.log("67 main.js runsimilarities");
    log.isInfo("67 main.js runsimilarities \n");
    similarities.getImageFeatureVectors();
  });

  window.loadFile("./public/index.html");

  // window.on("similarities_analysis_completed", (e, similarImages) => {
  //   console.log("similarImages = ", similarImages);
  //   log.info(">>> in similarities_analysis_completed listener main.js 69");

  //   window.webContents.send("receiving_similar_images_list", { similarImages });
  // });

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
