const fs = require("fs");
const path = require("path");
const Similarities = require("./js/Similarities");
const log = require("simple-node-logger").createSimpleFileLogger("project.log");
const {
  app,
  BrowserWindow,
  Menu,
  screen,
  Tray,
  MenuItem,
  ipcMain,
  dialog,
  globalShortcut,
} = require("electron");

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  awaitWriteFinish: true,
});

// Set env
process.env.NODE_ENV = "development";
const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isMac = process.platform === "darwin" ? true : false;

let mainWindow;
let aboutWindow;

function createMainWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    title: "PhotosCleaner",
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.loadFile(`./public/index.html`);
}
function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: "About PhotosCleaner",
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: false,
    width: 300,
    height: 300,
    backgroundColor: "#12937",
  });

  aboutWindow.loadFile(`./public/about.html`);
}

app.on("ready", () => {
  createMainWindow();
  const mainMenu = Menu.buildFromTemplate(menu);
  const appIcon = new Tray("public/favicon.png");
  Menu.setApplicationMenu(mainMenu);
  appIcon.setContextMenu(contextMenu);

  // globalShortcut.register("CmdOrCtrl+R", () => mainWindow.reload());
  // globalShortcut.register(isMac ? "Command+Alt+I" : "Ctrl+Shift+I", () =>
  //   mainWindow.toggleDevTools()
  // );

  //Setup Message Listeners
  ipcMain.on("runsimilarities", (e, rootFolderPath, similarityPercentage) => {
    mainWindow.webContents.send("status_message", {
      msg: "Similarities analysis has been launched",
      status: "start_similarities_analysis",
      time: Date.now(),
    });
    const similarities = new Similarities(
      mainWindow,
      rootFolderPath,
      similarityPercentage
    );
    // similarities.getImageFeatureVectors();
    similarities.compareImagesUsingSSIM();
  });

  ipcMain.on("select-dirs", async (event, arg) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    });
    if (result && result.filePaths && result.filePaths.length) {
      mainWindow.webContents.send(
        "root_folder_path_received",
        result.filePaths[0]
      );
    }
  });

  mainWindow.on("closed", () => (mainWindow = null));
});

const aboutMenuItem = {
  label: app.name,
  submenu: [
    {
      label: isMac ? "About" : "Help",
      click: createAboutWindow,
    },
  ],
};

const contextMenu = Menu.buildFromTemplate([
  { label: "Show", click: () => mainWindow.show() },
  {
    label: "Quit",
    click: () => {
      mainWindow.destroy();
      app.quit();
    },
  },
]);

const menu = [
  ...(isMac ? [aboutMenuItem] : []),
  {
    role: "fileMenu",
  },
  ...(!isMac ? [aboutMenuItem] : []),
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { type: "separator" },
            { role: "toggledevtools" },
          ],
        },
      ]
    : []),
  { label: "Show", click: () => mainWindow.show() },
  {
    label: "Quit",
    click: () => {
      mainWindow.destroy();
      app.quit();
    },
  },
];

app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});

// Nonesense just to remove the terminal warning
app.allowRendererProcessReuse = true;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// app.on("ready", () => {
//   appIcon = new Tray("public/favicon.png");

//   const contextMenu = Menu.buildFromTemplate([
//     { label: "Show", click: () => window.show() },
//     {
//       label: "Quit",
//       click: () => {
//         window.destroy();
//         app.quit();
//       },
//     },
//   ]);

//   appIcon.setContextMenu(contextMenu);
// });

// const createWindow = () => {
//   // Add it as the first things inside your `createWindow` function
//   Menu.setApplicationMenu(false);
//   const { width, height } = screen.getPrimaryDisplay().workAreaSize;

//   window = new BrowserWindow({
//     width: width,
//     height: height,
//     // width: width / 1.25,
//     // height: height / 1.25,
//     webPreferences: {
//       nodeIntegration: true,
//     },
//   });

//   window.webContents.openDevTools();

//   //Setup Message Listeners
//   ipcMain.on("runsimilarities", (e, similarityPercentage) => {
//     console.log("similarityPercentage = ", similarityPercentage);
//     const similarities = new Similarities(window, similarityPercentage);
//     console.log("67 main.js runsimilarities");
//     log.isInfo("67 main.js runsimilarities \n");
//     similarities.getImageFeatureVectors();
//   });

//   window.loadFile("./public/index.html");

// window.on("similarities_analysis_completed", (e, similarImages) => {
//   console.log("similarImages = ", similarImages);
//   log.info(">>> in similarities_analysis_completed listener main.js 69");

//   window.webContents.send("receiving_similar_images_list", { similarImages });
// });

//   window.on("minimize", (e) => {
//     e.preventDefault();
//     window.hide();
//   });

//   window.on("close", (e) => {
//     e.preventDefault();
//     window.hide();
//   });
// };

// let window = null;

// app.whenReady().then(createWindow);
// app.on("window-all-closed", () => app.quit());

// require("electron-reload")(process.cwd(), {
//   electron: path.join(__dirname, "node_modules", ".bin", "electron.cmd"),
// });
// is go down to '/myproject/src/js/node_modules/.bin/electron.cmd'

// so i replace the __dirname to process.cwd() and it works.
