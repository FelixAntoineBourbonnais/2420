function resetAll() {
    document.getElementById('myForm').reset();
}

function clearAll() {
    var i,
        inputData = document.getElementsByClassName("changeable");

    for (i = 0; i < inputData.length; i++) {
        inputData[i].value = '';
    }
}
