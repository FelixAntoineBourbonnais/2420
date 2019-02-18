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
            if (isNumeric(inputData[i].value) || (i+1) === inputData.length) {
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

}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}