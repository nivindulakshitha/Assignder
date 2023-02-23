const { app, BrowserWindow } = require("electron");
const path = require("path");
const appJson = require("../Json/app.json")
require("electron-reloader")(module);

var appTheme = appJson.app.theme;

function createWindow() {
    const assignder = new BrowserWindow({
        width: 900,
        height: 620,
        minWidth: 900,
        minHeight: 620,
        backgroundColor: appTheme === "dark" ? "#212529" : "#F8F9FA",
        icon: "Public\\Images\\Assignderx512.png",
        title: "Assignder",
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            padding: 10,
            height: 35,
            color: appTheme === "dark" ? "#212529" : "#F8F9FA",
            symbolColor: appTheme === "dark" ? "#F8F9FA" : "#212529",
        },
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            defaultFontSize: 18,
            minimumFontSize: 8,
            safeDialogs: true,
            accessibleTitle: "Assignder © Alpha CodeNox",
            spellcheck: false,

        }
    });
    
    assignder.loadFile("Public\\HTML\\index.html");
    assignder.webContents.openDevTools()

}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
