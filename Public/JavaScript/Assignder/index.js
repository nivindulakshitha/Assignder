const pageS4P1 = (page) => {
    page = Number.parseInt(page);
    var childElement = document.querySelector("#S4P1 div:first-child");
    document.querySelector("#S4P1").scroll({
        left: page * (childElement === null ? 0 : childElement.getBoundingClientRect().width) + page * 12,
    });
    document.querySelector("#S4P1").setAttribute("page", page);
};

window.addEventListener("DOMContentLoaded", () => {
    pageS4P1(0);
});

window.addEventListener("resize", () => {
    pageS4P1(0);
});
