function resetAll() {
    document.getElementById('myForm').reset();
}

function clearAll() {
    var i,
        inputData = document.getElementsByClassName("clearable");

    for (i = 0; i < inputData.length; i++) {
        inputData[i].value = '';
    }
}

function addElement() {
    var fieldToAdd = document.getElementById("normalValues").innerHTML;
    document.getElementById("newValues").innerHTML += fieldToAdd;
    document.getElementById("newValues").style.display = "inline";
}

function calculate() {
    var i,
        formule = '',
        inputData = document.getElementsByClassName("clearable");

    preLoader();

    for (i = 0; i < inputData.length; i++) {
        if (inputData[i].value.length !== 0) {
            if (isNumeric(inputData[i].value) || (i + 1) === inputData.length) {
                formule = formule + inputData[i].value;
            } else {
                formule = formule + inputData[i].value + ' + ';
            }
        }
    }
    postFormula(formule);
}

function postFormula(formule) {

    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:8080/";

    xhttp.onreadystatechange = function () {
        document.getElementById("table").innerHTML = this.responseText;

        // When readyState = 4, the post request is "Completed"
        if (xhttp.readyState == 4)
            postLoader();
    };

    xhttp.open("POST", url, true);
    xhttp.send(formule);
}

function preLoader() {
    document.getElementById("loader").style.display = "inline";
}

function postLoader() {
    document.getElementById("loader").style.display = "none";
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}