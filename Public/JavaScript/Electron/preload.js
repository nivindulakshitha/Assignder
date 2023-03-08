// preload.js
const { contextBridge, ipcRenderer } = require('electron');
const uuid = require('uuid');


// Expose ipcRenderer to the renderer process
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
contextBridge.exposeInMainWorld('uuid', uuid);

window.onload = () => {
    updateTime();
    updateDate();
}

const updateTime = () => {
    setInterval(() => {
        var currentDate = new Date();

        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var seconds = currentDate.getSeconds();
        
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        var formattedTime = hours + ":" + minutes + ":" + seconds;
        document.getElementById("current-time").innerText = formattedTime;

        if (formattedTime === "00:00:00") {
            updateDate();
        }
    }, 1000)
}

const updateDate = () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
    document.getElementById("current-date").innerText = formattedDate;
}

// Inter Process Communications
/* const ipcThemeChange = () => {
    ipcRenderer.send("theme-change", appTheme);
} */