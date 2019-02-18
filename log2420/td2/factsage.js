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

function calculate() {
    var i,
        formule = '',
        inputData = document.getElementsByClassName("clearable");

    for (i = 0; i < inputData.length; i++) {
        if (inputData[i].value.length !== 0) {
            if (isNumeric(inputData[i].value) || (i + 1) === inputData.length) {
                formule = formule + inputData[i].value + ' ';
            } else {
                formule = formule + inputData[i].value + ' + ';
            }
        }
    }
    formule = formule + '= ?';
    console.log(formule);
    postFormula(formule);

}

function postFormula(formule) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("table").innerHTML = this.responseText;
        }
        else {
            alert('Error: ' + xhttp.status);
        }
    };
    xhttp.open("POST", "http://localhost:8080/", true);
    xhttp.withCredentials = true;
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send({ 'request': "authentication token" });
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}