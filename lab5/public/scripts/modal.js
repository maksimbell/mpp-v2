var regModal = document.getElementById("regModal");
var logModal = document.getElementById("logModal");

var regBtn = document.getElementById("regBtn");
var logBtn = document.getElementById("logBtn");

var span1 = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];

regBtn.onclick = function () {
    regModal.style.display = "block";
    return false
}

logBtn.onclick = function () {
    logModal.style.display = "block";
    return false
}

span1.onclick = function () {
    regModal.style.display = "none";
}

span2.onclick = function () {
    logModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == regModal) {
        regModal.style.display = "none";
    }
    if (event.target == logModal) {
        logModal.style.display = "none";
    }
}