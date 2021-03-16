"use strict";

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  Notification,
  dialog,
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { default as fsWithCallbacks } from "fs";
import path from "path";
import Store from "electron-store";
const fs = fsWithCallbacks.promises;

const store = new Store({
  defaults: {
    currentProject: {
      path: "",
      config: false,
    },
    recentProjects: {},
    allProjects: {},
  },
});

const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "UI for mmmDocs",
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
    },
  });

  win.on("page-title-updated", (event) => event.preventDefault());

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

ipcMain.on("showNote", (event, args) => {
  if (args.title === "") args.title = "You sent empty title field";
  if (args.text === "") args.text = "So take this";
  const notification = {
    title: args.title,
    body: args.text,
  };
  const note = new Notification(notification);
  note.on("click", () => {
    event.reply("noteClicked");
  });
  note.show();
});

ipcMain.handle("loadDocument", async (event, pathArray) => {
  let payload = await fs.readFile(path.join(...pathArray), "utf-8");
  return payload;
});

ipcMain.handle("selectProject", async (event, pathToFolder) => {
  let payload = {
    path: pathToFolder,
    config: false,
  };

  // Config file
  let configPath = path.join(payload.path, "mmmdocs-config.json");
  try {
    payload.config = await fs.readFile(configPath);
    payload.config = JSON.parse(payload.config);
  } catch (error) {
    let projectConfig = {};
    projectConfig.name = path.parse(payload.path).name;
    await fs.writeFile(configPath, JSON.stringify(projectConfig));
    payload.config = projectConfig;
  }

  // Navigation file
  let navFilePath = path.join(
    payload.path,
    "public",
    "docs",
    "navigation.json"
  );
  try {
    payload.navigation = await fs.readFile(navFilePath);
    payload.navigation = JSON.parse(payload.navigation);
  } catch (error) {
    let projectNavigation = [];
    await fs.mkdir(path.join(pathToFolder, "public"));
    await fs.mkdir(path.join(pathToFolder, "public", "docs"));
    await fs.writeFile(navFilePath, JSON.stringify(projectNavigation));
    payload.navigation = projectNavigation;
  }

  return payload;
});

ipcMain.handle(
  "addFile",
  async (event, { pathToFolder, newNav, base, title, url }) => {
    // Navigation file
    let navFilePath = path.join(
      pathToFolder,
      "public",
      "docs",
      "navigation.json"
    );

    let filePath;

    if (base) {
      filePath = path.join(pathToFolder, "public", "docs", base, url + ".md");
    } else {
      filePath = path.join(pathToFolder, "public", "docs", url + ".md");
    }
    try {
      await fs.mkdir(path.join(pathToFolder, "public", "docs", title));
      await fs.writeFile(filePath, "# " + title);
      await fs.writeFile(navFilePath, JSON.stringify(newNav));
      return "success";
    } catch (error) {
      return error;
    }
  }
);

ipcMain.handle("addBase", async (event, { pathToFolder, newNav, title }) => {
  // Navigation file
  let navFilePath = path.join(
    pathToFolder,
    "public",
    "docs",
    "navigation.json"
  );
  try {
    await fs.mkdir(path.join(pathToFolder, "public", "docs", title));
    await fs.writeFile(navFilePath, JSON.stringify(newNav));
    return "success";
  } catch (error) {
    return error;
  }
});

ipcMain.handle("newProject", async (event, args) => {
  let payload = {
    path: "",
    config: false,
  };
  let projectFolder = await dialog.showOpenDialog(
    {
      title: "Select a folder",
      properties: ["openDirectory"],
    },
    (folderPaths) => {
      // folderPaths is an array that contains all the selected paths
      if (fileNames === undefined) {
        return "No destination folder selected";
      } else {
        return folderPaths;
      }
    }
  );

  payload.path = projectFolder.filePaths[0];

  let configPath = path.join(payload.path, "mmmdocs-config.json");

  try {
    payload.config = await fs.readFile(configPath);
    payload.config = JSON.parse(payload.config);
  } catch (error) {
    let projectConfig = {};
    projectConfig.name = path.parse(payload.path).name;
    await fs.writeFile(configPath, JSON.stringify(projectConfig));
    payload.config = projectConfig;
  }

  // Update config - add new Project
  let allProjects = store.get("allProjects");
  if (!allProjects[payload.config.name])
    allProjects[payload.config.name] = payload.path;
  store.set("allProjects", allProjects);

  let recentProjects = store.get("recentProjects");

  let isProjectInRecent = false;

  Object.keys(recentProjects).map((key) => {
    if (recentProjects[key].config.name === payload.config.name) {
      isProjectInRecent = true;
    }
  });

  if (!isProjectInRecent) {
    if (Object.keys(recentProjects).length <= 3) {
      recentProjects[Object.keys(recentProjects).length] = payload;
    } else {
      delete recentProjects[0];
      Object.keys(recentProjects).map((key) => {
        recentProjects[key - 1] = recentProjects[key];
      });
      recentProjects[Object.keys(recentProjects).length] = payload;
    }
  }

  store.set("recentProjects", recentProjects);

  return payload;
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
