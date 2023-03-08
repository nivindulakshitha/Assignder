// navigation between pages
function pageOpener(event, sectionId) {
    if (sectionId === activePage) {
        return;
    }

    const toggleTo = document.getElementById(sectionId);
    const toggleFrom = document.getElementById(activePage); // Ref: Assignder/declarations

    loadingComponent(true);
    makeSettimeout(1000, loadingComponent, false);

    setTimeout(() => {
        if (activePage !== undefined) {
            toggleFrom.classList.add("hidden");
            toggleFrom.classList.remove("grid");
        }

        if (navigationTarget !== undefined) {
            navigationTarget.setAttribute("active", "false"); // Ref: Assignder/declarations
        }

        if (toggleTo.id === "S4P1" || toggleTo.id === "S4P4") {
            document
                .querySelector(
                    "div[role='top-panel'] div.buttons-holder.flexing"
                )
                .setAttribute("data-paging", "#" + toggleTo.id);
            document.querySelectorAll(
                "div[role='top-panel'] div.buttons-holder.flexing button"
            )[0].disabled = false;
            document.querySelectorAll(
                "div[role='top-panel'] div.buttons-holder.flexing button"
            )[1].disabled = false;
        } else {
            document
                .querySelector(
                    "div[role='top-panel'] div.buttons-holder.flexing"
                )
                .removeAttribute("data-paging");
            document.querySelectorAll(
                "div[role='top-panel'] div.buttons-holder.flexing button"
            )[0].disabled = true;
            document.querySelectorAll(
                "div[role='top-panel'] div.buttons-holder.flexing button"
            )[1].disabled = true;
        }

        toggleTo.classList.add("grid");
        toggleTo.classList.remove("hidden");
        event.target.closest("li").setAttribute("active", "true");

        activePage = toggleTo.id; // Ref: Assignder/declarations
        navigationTarget = event.target.closest("li"); // Ref: Assignder/declarations
    }, 500);
}

// open Home section & read app configs
window.addEventListener("DOMContentLoaded", () => {
    ipcRenderer
        .invoke("fs-read", "./Public/JavaScript/Json/appdata.json")
        .then((reply) => {
            if (reply) {
                appData = JSON.parse(reply);
                switchAppTheme(appData.app.theme);
                getIntoAssignder();
            } else {
                appData = {};
                getIntoAssignder();
            }
        });
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
function switchAppTheme(target) {
    let pushTheme = document.getElementsByTagName("html")[0];
    if (target) {
        if (target == "light") {
            pushTheme.classList.remove("dark");
            pushTheme.classList.add("light");
            appTheme = "light";
            appData.app.theme = "light";
        } else {
            pushTheme.classList.remove("light");
            pushTheme.classList.add("dark");
            appTheme = "dark";
            appData.app.theme = "dark";
        }
    } else {
        popupTextChanger(
            "ok",
            "In order to apply the changes to the entire program, please restart the application. Some changes made will not take effect until the application has been restarted."
        );

        if (appTheme == "light") {
            pushTheme.classList.remove("light");
            pushTheme.classList.add("dark");
            appTheme = "dark";
            appData.app.theme = "dark";
        } else {
            pushTheme.classList.remove("dark");
            pushTheme.classList.add("light");
            appTheme = "light";
            appData.app.theme = "light";
        }
    }

    ipcRenderer.invoke('fs-write', "./Public/JavaScript/Json/appdata.json", JSON.stringify(appData));
}

// deleate an assignment
function deleteAssigmnetRequest(uuid) {
    popupTextChanger(
        "cancel-delete",
        "In order to apply the changes to the entire program, please restart the application. Some changes made will not take effect until the application has been restarted."
    )
}

// set time out
function makeSettimeout(timeout, redirect, ...params) {
    setTimeout(() => {
        redirect(...params);
    }, timeout);
}

// paging in same section
const shiftPageTo = (element, foreward, spec) => {
    page =
        spec !== undefined
            ? spec
            : Number.parseInt(
                document.querySelector(`${element}`).getAttribute("page")
            );
    var childElement = document.querySelector(`${element} div:first-child`);

    if (foreward) {
        page++;

        const maxColumns = Math.floor(
            document.querySelector(`${element}`).scrollWidth /
            childElement.getBoundingClientRect().width
        );
        const openColumns = Math.floor(
            document.querySelector(`${element}`).clientWidth /
            childElement.clientWidth
        );

        if (page > maxColumns - openColumns) {
            page = maxColumns - openColumns;
        }
    } else {
        page--;

        if (page < 0) {
            page = 0;
        }
    }

    document.querySelector(`${element}`).scroll({
        left:
            page *
            (childElement === null
                ? 0
                : childElement.getBoundingClientRect().width) +
            page * 12,
        behavior: "smooth",
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
    const element = document
        .getElementById(target)
        .getElementsByTagName("h3")[0];
    element.innerText = text;
}

// letter profile image generator
function generateImageFromName(name) {
    const words = name.split(" ");
    const firstLetters = words.map((word) => word.charAt(0)).slice(0, 2);
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
    ctx.fillText(
        firstLetters.join("").toUpperCase(),
        canvas.width / 2,
        canvas.height / 2
    );
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

// New assignment create
function createNewAssignment(uuid) {
    const titleElement = document.querySelector(
        "#assignment-modal > div > div > div > div > div:nth-child(1) > div.col-span-3.input-block > input"
    );
    const deadlineDate = document.querySelector(
        "#assignment-modal > div > div > div > div > div:nth-child(2) > div:nth-child(1) > div > input"
    );
    const deadlineTimeHour = document.querySelector(
        "#assignment-modal > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > select:nth-child(1)"
    );
    const deadlineTimeMinutes = document.querySelector(
        "#assignment-modal > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > select:nth-child(3)"
    );
    const moduleElement = document.querySelector(
        "#assignment-modal > div > div > div > div > select"
    );
    const summaryElement = document.querySelector(
        "#assignment-modal > div > div > div > div > textarea"
    );
    const alertifyElement = document.querySelector(
        "#assignment-modal > div > div > div > div > div.flex.flexing > div > button"
    );

    if (uuid) {
        document.querySelector("#assignment-modal").setAttribute("uuid", uuid);
        titleElement.value = profileData.assignments[uuid].title;
        deadlineDate.value = profileData.assignments[uuid].dueDate;
        deadlineTimeHour.value = new Date(
            profileData.assignments[uuid].due
        ).getHours();
        deadlineTimeMinutes.value = new Date(
            profileData.assignments[uuid].due
        ).getMinutes();
        moduleElement.value = profileData.assignments.refmod;
        summaryElement.value = profileData.assignments.summary;

        if (profileData.assignments.alertify) {
            alertifyElement.classList.add("toggled");
        } else {
            alertifyElement.classList.remove("toggled");
        }
    } else {
        document
            .querySelector("#assignment-modal")
            .setAttribute("uuid", generateUUID());
        titleElement.value = "";
        deadlineDate.value = "";
        deadlineTimeHour.value = "00";
        deadlineTimeMinutes.value = "00";
        moduleElement.value = "0";
        summaryElement.value = "";
    }
}

// Submit the create assignment or update assignment
function submitAssignment() {
    const uuid = document
        .querySelector("#assignment-modal")
        .getAttribute("uuid");
    const titleElement = document.querySelector(
        "#assignment-modal > div > div > div > div > div:nth-child(1) > div.col-span-3.input-block > input"
    );
    const deadlineDate = document.querySelector(
        "#assignment-modal > div > div > div > div > div:nth-child(2) > div:nth-child(1) > div > input"
    );
    const deadlineTimeHour = document.querySelector(
        "#assignment-modal > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > select:nth-child(1)"
    );
    const deadlineTimeMinutes = document.querySelector(
        "#assignment-modal > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > select:nth-child(3)"
    );
    const moduleElement = document.querySelector(
        "#assignment-modal > div > div > div > div > select"
    );
    const summaryElement = document.querySelector(
        "#assignment-modal > div > div > div > div > textarea"
    );
    const alertifyElement = document.querySelector(
        "#assignment-modal > div > div > div > div > div.flex.flexing > div > button"
    );

    if (titleElement.value.length > 0) {
        if (new Date(deadlineDate.value) != "Invalid Date") {
            if (moduleElement.value != 0) {
                profileData.assignments[uuid] = {
                    refpro: profileData.self.uuid,
                    refmod: moduleElement.value,
                    title: titleElement.value,
                    due: new Date(
                        deadlineDate.value +
                        " " +
                        deadlineTimeHour.value +
                        ":" +
                        deadlineTimeMinutes.value
                    ).getTime(),
                    summary: summaryElement.value,
                    alertify: alertifyElement.classList.contains("toggled")
                        ? true
                        : false,
                    done: 0,
                };
            }
        }
    }
}

// Sign up or Sign in to the Assignder
function getIntoAssignder() {
    if (Object.keys(appData.accounts).length == 0) {
        sectionOpener(3);
    } else {
        sectionOpener(2);
    }
}

// Section operner
function sectionOpener(target) {
    loadingComponent(true);

    setTimeout(() => {
        loadingComponent(false);
        if (activeSection) {
            document.getElementById(activeSection).classList.add("hidden");
            document.getElementById(activeSection).classList.remove("grid");
        }
        document.getElementById(target).classList.remove("hidden");
        document.getElementById(target).classList.add("grid");
        activeSection = target;
    }, 1000);
}

// IPC command to open a image file
function askImagePath(key) {
    return ipcRenderer.invoke("select-image").then((reply) => {
        return reply;
    });
}

// Sign up form step command
function signupStepOn(direction, object) {
    const formElement = document.querySelector(
        "#\\33  > div > div:nth-child(3)"
    );
    if (direction == 1) {
        if (
            object.username.length >= 5 &&
            !Object.keys(appData.accounts).includes(object.username.toLowerCase())
        ) {
            if (
                object.password.length >= 5 &&
                object.password == object.repassword
            ) {
                appData.accounts[object.username.toLowerCase()] = {
                    password: object.password,
                    image: object.image,
                };

                ipcRenderer.invoke('fs-write', "./Public/JavaScript/Json/appdata.json", JSON.stringify(appData)).then(reply => {
                    if (reply) {
                        sectionOpener(4);
                        document.querySelector("#\\34  > nav > ul > li:nth-child(2)").click(); // Open home section
                    }
                });
            }
        }

        if (Number.parseInt(formElement.getAttribute("target")) != 3) {
            formElement.setAttribute(
                "target",
                Number.parseInt(formElement.getAttribute("target")) + 1
            );
        }
    } else {
        if (Number.parseInt(formElement.getAttribute("target")) != 1) {
            formElement.setAttribute(
                "target",
                Number.parseInt(formElement.getAttribute("target")) - 1
            );
        }
    }
}

// Sign in form step command
function signinStepOn(direction, object) {
    const formElement = document.querySelector("#\\32  > div > div:nth-child(3)");
    if (direction == 1) {
        if ( object.username.length >= 5 && Object.keys(appData.accounts).includes(object.username.toLowerCase()) ) {
            if (object.password.length >= 5 && appData.accounts[object.username].password == object.password) {
                sectionOpener(4);
                document.querySelector("#\\34  > nav > ul > li:nth-child(2)").click(); // Open home section
                appData.app.login.state = true;
                appData.app.login.account = object.username;
                setupUiChanges(appData.app.login.account);
            }
        }

        if (Number.parseInt(formElement.getAttribute("target")) != 2) {
            formElement.setAttribute(
                "target",
                Number.parseInt(formElement.getAttribute("target")) + 1
            );
        }
    } else {
        if (Number.parseInt(formElement.getAttribute("target")) != 1) {
            formElement.setAttribute(
                "target",
                Number.parseInt(formElement.getAttribute("target")) - 1
            );
        }
    }
}

// Setup UI changes when login
function setupUiChanges(account) {
    const accountData = appData.accounts[account];

    document.querySelector("#\\34  > nav > ul > li.flexing.relative.esc-region > div.rounded-image.w-9.h-9 > img").src = accountData.image;
}