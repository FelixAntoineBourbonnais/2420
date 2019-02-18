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
    var massToAdd = document.getElementById("massElement").innerHTML + "<br>";
    var speciesToAdd = document.getElementById("speciesElement").innerHTML + "<br>";
    
    document.getElementById("addedMass").style.display = "inline";
    document.getElementById("addedSpecies").style.display = "inline";
    
    document.getElementById("addedMass").innerHTML += massToAdd;
    document.getElementById("addedSpecies").innerHTML += speciesToAdd;
}

function calculate() {
    var i,
        formule = '',
        inputData = document.getElementsByClassName("clearable");
    
    document.getElementById("spinner").style.display = "inline";

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
    postFormula(formule);
    console.log(formule);
}

function postFormula(formule) {
    
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:8080/";

    xhttp.onreadystatechange = function () {
        document.getElementById("table").innerHTML = this.responseText;
    };
    xhttp.open("POST", url, true);

    //xhttp.withCredentials = true;
    xhttp.setRequestHeader("Content-Type", "application/json");
    //xhttp.send({ 'request': "authentication token" });
    xhttp.send(formule);

    document.getElementById("spinner").style.display = "none";
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
