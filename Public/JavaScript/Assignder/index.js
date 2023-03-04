// navigation between sections
function sectionOpener(event, sectionId) {
    if (sectionId === activeSection) {
        return;
    }

    const toggleTo = document.getElementById(sectionId);
    const toggleFrom = document.getElementById(activeSection); // Ref: Assignder/declarations

    loadingComponent(true);
    makeSettimeout(1000, loadingComponent, false);

    setTimeout(() => {
        if (activeSection !== undefined) {
            toggleFrom.classList.add("hidden");
            toggleFrom.classList.remove("grid");
        }

        if (navigationTarget !== undefined) {
            navigationTarget.setAttribute("active", "false"); // Ref: Assignder/declarations
        }

        if (toggleTo.id === "S4P1" || toggleTo.id === "S4P4") {
            document.querySelector("div[role='top-panel'] div.buttons-holder.flexing").setAttribute("data-paging", "#" + toggleTo.id);
            document.querySelectorAll("div[role='top-panel'] div.buttons-holder.flexing button")[0].disabled = false;
            document.querySelectorAll("div[role='top-panel'] div.buttons-holder.flexing button")[1].disabled = false;
        } else {
            document.querySelector("div[role='top-panel'] div.buttons-holder.flexing").removeAttribute("data-paging");
            document.querySelectorAll("div[role='top-panel'] div.buttons-holder.flexing button")[0].disabled = true;
            document.querySelectorAll("div[role='top-panel'] div.buttons-holder.flexing button")[1].disabled = true;
        }

        toggleTo.classList.add("grid");
        toggleTo.classList.remove("hidden");
        event.target.closest("li").setAttribute("active", "true");

        activeSection = toggleTo.id; // Ref: Assignder/declarations
        navigationTarget = event.target.closest("li"); // Ref: Assignder/declarations

    }, 500);
}

// open Home section
window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#\\34  > nav > ul > li:nth-child(3)").click();
});

// loading component opener
function loadingComponent(open) {
    const component = document.getElementById("1");

    if (open) {
        component.classList.remove("hidden");
        component.classList.add("flex");
    } else {
        component.classList.remove("flex");
        component.classList.add("hidden");
    }
}

// switch between themes
function switchAppTheme() {
    let pushTheme = document.getElementsByTagName("html")[0];
    popupTextChanger("ok", "In order to apply the changes to the entire program, please restart the application. Some changes made will not take effect until the application has been restarted.");

    if (appTheme == "light") {
        pushTheme.classList.remove("light");
        pushTheme.classList.add("dark");
        appTheme = "dark";
    } else {
        pushTheme.classList.remove("dark");
        pushTheme.classList.add("light");
        appTheme = "light";
    }
}

// set time out
function makeSettimeout(timeout, redirect, ...params) {
    setTimeout(() => { redirect(...params) }, timeout);
}

// paging in same section
const shiftPageTo = (element, foreward, spec) => {
    page = spec !== undefined ? spec : Number.parseInt(document.querySelector(`${element}`).getAttribute("page"));
    var childElement = document.querySelector(`${element} div:first-child`);

    if (foreward) {
        page ++;

        const maxColumns = Math.floor((document.querySelector(`${element}`).scrollWidth / childElement.getBoundingClientRect().width));
        const openColumns = Math.floor(document.querySelector(`${element}`).clientWidth / childElement.clientWidth);

        if (page > maxColumns - openColumns) {
            page = maxColumns - openColumns;
        }

    } else {
        page --;

        if (page < 0) {
            page = 0;
        }
    }

    document.querySelector(`${element}`).scroll({
        left: page * (childElement === null ? 0 : childElement.getBoundingClientRect().width) + page * 12,
        behavior: "smooth"
    });
    document.querySelector(`${element}`).setAttribute("page", page);

};

window.addEventListener("DOMContentLoaded", () => {
    shiftPageTo("#S4P1", false);
});

window.addEventListener("resize", () => {
    shiftPageTo("#S4P1", false, 0);
    shiftPageTo("#S4P4", false, 0);
});


// universal unique ID generator
function generateUUID() {
    return uuid.v4().toUpperCase(); // Ref: Electron/preload
}

// popup text changes
function popupTextChanger(target, text) {
    const element = document.getElementById(target).getElementsByTagName("h3")[0];
    element.innerText = text;
}

// letter profile image generator
function generateImageFromName(name) {
    const words = name.split(" ");
    const firstLetters = words.map(word => word.charAt(0)).slice(0, 2);
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    const colorPicker = document.getElementById("modulecolor-picker");
    ctx.fillStyle = hexToRgba(colorPicker.value, 0.1);
    ctx.fillRect(0, 0, 300, 300);
    ctx.font = "bold 150px consolas";
    ctx.fillStyle = hexToRgba(colorPicker.value, 1);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(firstLetters.join("").toUpperCase(), canvas.width / 2, canvas.height / 2);
    const dataURL = canvas.toDataURL();

    return dataURL;
}

// Hex color to RGBA color
function hexToRgba(hexValue, alpha) {
    const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const result = hexRegex.exec(hexValue);
    const red = parseInt(result[1], 16);
    const green = parseInt(result[2], 16);
    const blue = parseInt(result[3], 16);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}


// Toggle buttons handler
function toggleButtonsHandler(event) {
    let target = event.target.closest("button");

    if (target.classList.contains("toggled")) {
        target.classList.remove("toggled");
    } else {
        target.classList.add("toggled");
    }
}