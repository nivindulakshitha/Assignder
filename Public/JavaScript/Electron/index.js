const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const appJson = require("../Json/app.json")
require("electron-reloader")(module);

var appTheme = appJson.app.theme;
var assignder;

function createWindow() {
    assignder = new BrowserWindow({
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
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true
        }
    });
    
    assignder.loadFile("Public\\HTML\\index.html");
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


// Inter Process Communications
/* const fs = require('fs');

// Replace "ApplicationName" with the name of the application you want to retrieve information for
const appName = 'Microsoft Office 15/ClientX64/OfficeClickToRun.exe';
const programFilesPath = process.env.ProgramFiles;
const appPath = path.join(programFilesPath, appName);

try {
  const stats = fs.statSync(appPath);

  console.log(appPath);
  const sizeInBytes = stats.size;
  const sizeInMB = sizeInBytes / 1024 / 1024;

  console.log('Size:', sizeInMB, 'MB');
} catch (error) {
  console.error(`Error: ${error.message}`);
}

const ps = require('ps-node');

const app2Name = 'AssignderNMGR';

ps.lookup({ command: app2Name }, (err, resultList) => {
  if (err) {
    throw new Error(err);
  }

  const isRunning = resultList.length > 0;

  if (isRunning) {
    console.log(`${app2Name} is running.`);
  } else {
    console.log(`${app2Name} is not running.`);
  }
}); */


/* const fs = require('fs');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = Buffer.from('12a8d2e2a69f7fb92c6b71d7dce5852b25fa6c0e89195d9e1b197a8344c0f1f6', 'hex');
const iv = Buffer.from('3c858c5a5a9f5d5b37f7e1c78875b4d4', 'hex');
const originalFile = 'Public/JavaScript/Electron/original.txt';
const encryptedFile = 'Public/JavaScript/Electron/encrypted.asd';
const decryptedFile = 'Public/JavaScript/Electron/decrypted.txt';

// Encryption process
const readStream = fs.createReadStream(originalFile);
const writeStream = fs.createWriteStream(encryptedFile);

const cipher = crypto.createCipheriv(algorithm, key, iv);

readStream.pipe(cipher).pipe(writeStream);

writeStream.on('finish', () => {
  console.log('File encrypted successfully!');
  
  // Decryption process
  const readStream = fs.createReadStream(encryptedFile);
  const writeStream = fs.createWriteStream(decryptedFile);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  readStream.pipe(decipher).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('File decrypted successfully!');
  });
}); */
