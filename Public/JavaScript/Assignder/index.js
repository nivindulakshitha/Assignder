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
        if (activePage != undefined) {
            toggleFrom.classList.add("hidden");
            toggleFrom.classList.remove("grid");
        }

        if (navigationTarget != undefined) {
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
                vueApp.appdata = appData;
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
                ipcRenderer.invoke('fs-write', appData.profiles[appData.app.login.profile].path, JSON.stringify(profileData));
                vueApp.profiledata = profileData;

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

    /* sectionOpener(4);
    document.querySelector("#\\34  > nav > ul > li:nth-child(10)").click(); // Open home section */

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
                        setUpLogic();
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
                appData.app.login.state = true;
                appData.app.login.account = object.username;
                setupUiChanges(appData.app.login.account);
                setUpLogic();
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
    document.querySelector("#S4P7 > fieldset:nth-child(1) > div.rounded-image.w-28.h-28.inline-block > img").src = accountData.image;
    document.querySelector("#S4P7 > fieldset:nth-child(1) > div:nth-child(3) > span").innerText = account;
    document.querySelector("#S4P7 > fieldset:nth-child(1) > div:nth-child(3) > p").innerText = appData.app.login.profile;
}

function profileEdit(uuid) {
    if (uuid) {
        document.querySelector("#profile-picture").setAttribute('src',  appData.profiles[uuid].image);
        document.querySelector("#profile-modal").setAttribute("target", uuid);
        document.querySelector("#profile-modal > div > div > div > div > div.grid.grid-cols-4.flexing > div.col-span-3.input-block.w-full > input").value = uuid;
        document.querySelector("#profile-modal > div > div > div > div > div.grid.grid-cols-4.flexing > div.col-span-3.input-block.w-full > input").disabled = true;
    } else {
        document.querySelector("#profile-picture").removeAttribute('src');
        document.querySelector("#profile-modal").removeAttribute("target");
        document.querySelector("#profile-modal > div > div > div > div > div.grid.grid-cols-4.flexing > div.col-span-3.input-block.w-full > input").value = "";
        document.querySelector("#profile-modal > div > div > div > div > div.grid.grid-cols-4.flexing > div.col-span-3.input-block.w-full > input").disabled = false;
    }
}

function profileSubmit() {
    const target = document.querySelector("#profile-modal").getAttribute("target");
    const imgPath  = document.querySelector("#profile-picture").getAttribute('src');
    var profileName = document.querySelector("#profile-modal > div > div > div > div > div.grid.grid-cols-4.flexing > div.col-span-3.input-block.w-full > input").value;
    profileName = profileName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    const abbrivation = profileName.split(" ").map((word) => word.charAt(0)).join("").toUpperCase();

    if (target) {
        appData.profiles[target].image = imgPath;
        ipcRenderer.invoke('fs-write', "./Public/JavaScript/Json/appdata.json", JSON.stringify(appData));
    } else {
        const profileDataTemplate = {
            "self": {
                "refacc": "",
                "name": "",
                "abbr":  "",
                "image": "",
                "alertify": {
                    "hereon": true,
                    "logs": true,
                    "privacy": false
                }
            },
            "modules": {},
            "assignments": {}
        }
        if (!Object.keys(appData.profiles).includes(profileName)) {
                ipcRenderer.invoke("make-dir", 'documents', 'Assignder').then(result => {
                if (result != undefined) {
                    appData.profiles[profileName] = {
                        refacc: appData.app.login.account,
                        image: imgPath,
                        abbrivation: abbrivation,
                        path: result + `/${abbrivation}.json`
                    };
                    ipcRenderer.invoke('fs-write', "./Public/JavaScript/Json/appdata.json", JSON.stringify(appData));
                    profileDataTemplate.self.refacc = appData.app.login.account;
                    profileDataTemplate.self.name = profileName;
                    profileDataTemplate.self.abbr = abbrivation;
                    profileDataTemplate.self.image = imgPath;
                    ipcRenderer.invoke('fs-write', result + `/${abbrivation}.json`, JSON.stringify(profileDataTemplate));
                }
            });
        }
    }
}

function setUpLogic() {
    console.log('setup logic');
    if (appData.app.login.profile == "") {
        if (Object.keys(appData.profiles).length != 0) {
            for (i = 0; i < Object.keys(appData.profiles).length; i++) {
                ipcRenderer.invoke('fs-read', appData.profiles[Object.keys(appData.profiles)[i]].path).then(result => {
                    if (result) {
                        console.log('profile: 1');
                        i = Object.keys(appData.profiles).length;
                        profileData = JSON.parse(result);
                        vueApp.profiledata =  profileData;
                        document.querySelector("#profile > p").innerText = profileData.self.name;
                        document.querySelector("#profile > div > img").setAttribute('src', profileData.self.image);
                        document.querySelector("#S4P7 > fieldset:nth-child(2) > table > tbody > tr:nth-child(8) > td > span") = appData.profiles[profileData.self.name].path;


                        appData.app.login.profile = profileData.self.name;
                        ipcRenderer.invoke('fs-write', "./Public/JavaScript/Json/appdata.json", JSON.stringify(appData));
                    }
                })
            }

            // If no profile valied
            if (profileData == {}) {
                console.log('No profile is valied');
                sectionOpener(4);
                document.querySelector("#\\34  > nav > ul > li:nth-child(10)").click();
            }
        } else {
            console.log('No profile is identified');
            sectionOpener(4);
            document.querySelector("#\\34  > nav > ul > li:nth-child(10)").click();
        }
    } else {
        const profileName = appData.app.login.profile;
        ipcRenderer.invoke('fs-read', appData.profiles[profileName].path).then(result => {
            console.log('profile: 2');
            if (result) {
                profileData = JSON.parse(result);
                vueApp.profiledata = profileData;
                document.querySelector("#profile > p").innerText = profileData.self.name;
                document.querySelector("#profile > div > img").setAttribute('src', profileData.self.image);
                document.querySelector("#S4P7 > fieldset:nth-child(2) > table > tbody > tr:nth-child(2) > td > span").innerText = profileData.self.abbr;
                document.querySelector("#S4P7 > fieldset:nth-child(2) > table > tbody > tr:nth-child(8) > td > span").innerText = appData.profiles[profileData.self.name].path;

                appData.app.login.profile = profileData.self.name;
                ipcRenderer.invoke('fs-write', "./Public/JavaScript/Json/appdata.json", JSON.stringify(appData));
            }
        })
        sectionOpener(4);
        document.querySelector("#\\34  > nav > ul > li:nth-child(2)").click();
    }
}

function changeProfile() {
    appData.app.login.profile = document.querySelector("#S4P7 > fieldset:nth-child(2) > table > tbody > tr:nth-child(1) > td > select").value;
    ipcRenderer.invoke('fs-write', "./Public/JavaScript/Json/appdata.json", JSON.stringify(appData));
}

function openUpdateModule(uuid) {
    if (uuid) {
        document.querySelector("#module-modal").setAttribute("target", uuid);
        document.querySelector("#module-modal > div > div > div > div > div:nth-child(1) > div.col-span-3.input-block.w-full > input").value = profileData.modules[uuid].name;
        document.querySelector("#module-modal > div > div > div > div > div:nth-child(1) > div.input-block.mb-3 > div").style.borderColor = profileData.modules[uuid].color;
        document.querySelector("#module-modal > div > div > div > div > div:nth-child(1) > div.input-block.mb-3 > div > img").src = profileData.modules[uuid].image;
        document.querySelector("#modulecolor-picker").value = profileData.modules[uuid].color;
        document.querySelector("#module-modal > div > div > div > div > div.grid.grid-cols-4.flexing.mb-3 > div:nth-child(2) > input").value = profileData.modules[uuid].identity;
        document.querySelector("#module-modal > div > div > div > div > div.grid.grid-cols-4.flexing.mb-3 > div:nth-child(3) > input").value = profileData.modules[uuid].code;
        document.querySelector("#module-modal > div > div > div > div > div.grid.grid-cols-4.flexing.mb-3 > div:nth-child(4) > input").value = profileData.modules[uuid].credit;
        if (profileData.modules[uuid].alertify) {
            document.querySelector("#module-modal > div > div > div > div > div.flex.flexing > div > button").classList.add("toggled");
        } else {
            document.querySelector("#module-modal > div > div > div > div > div.flex.flexing > div > button").classList.remove("toggled");
        }

    } else {
        document.querySelector("#module-modal").removeAttribute("target");
        document.querySelector("#module-modal").setAttribute("target", uuid);
        document.querySelector("#module-modal > div > div > div > div > div:nth-child(1) > div.col-span-3.input-block.w-full > input").value = "";
        document.querySelector("#module-modal > div > div > div > div > div:nth-child(1) > div.input-block.mb-3 > div").style.borderColor = "#000";
        document.querySelector("#module-modal > div > div > div > div > div:nth-child(1) > div.input-block.mb-3 > div > img").removeAttribute("src");
        document.querySelector("#modulecolor-picker").value = "#000";
        document.querySelector("#module-modal > div > div > div > div > div.grid.grid-cols-4.flexing.mb-3 > div:nth-child(2) > input").value = "";
        document.querySelector("#module-modal > div > div > div > div > div.grid.grid-cols-4.flexing.mb-3 > div:nth-child(3) > input").value = "";
        document.querySelector("#module-modal > div > div > div > div > div.grid.grid-cols-4.flexing.mb-3 > div:nth-child(4) > input").value = "";
        document.querySelector("#module-modal > div > div > div > div > div.flex.flexing > div > button").classList.add("toggled");
    }
}

function updateModule(moduledata) {
    const name = moduledata.typing;
    const image =  moduledata.tempImg;
    const color = moduledata.color;
    const identity = document.querySelector("#module-modal > div > div > div > div > div.grid.grid-cols-4.flexing.mb-3 > div:nth-child(2) > input").value;
    const code = document.querySelector("#module-modal > div > div > div > div > div.grid.grid-cols-4.flexing.mb-3 > div:nth-child(3) > input").value;
    const credits = document.querySelector("#module-modal > div > div > div > div > div.grid.grid-cols-4.flexing.mb-3 > div:nth-child(4) > input").value;
    const alertify = document.querySelector("#module-modal > div > div > div > div > div.flex.flexing > div > button");

    if (name.length > 0 && identity.length > 0 && code.toString().length > 0 && credits.toString().length > 0) {
        if (appData.app.login.profile != "") {
            profileData.modules[generateUUID()] = {
                name: capitalizeEachWord(name),
                color: color.toUpperCase(),
                identity: identity.toUpperCase(),
                code: code,
                credit: credits,
                image: image,
                alertify: alertify.classList.contains("toggled") ? true : false,
                notify: 0,
                wait: 0,
            }

            ipcRenderer.invoke('fs-write', appData.profiles[appData.app.login.profile].path, JSON.stringify(profileData));
            vueApp.profiledata = profileData;
        }
    } else {
        console.log(name.length, identity.length, code.toString().length, credits.toString().length)
    }
}


function capitalizeEachWord(str) {
    const words = str.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  }
  

function updateAssignmentTime(id, value) {
    document.querySelector(id).innerText = value;
}