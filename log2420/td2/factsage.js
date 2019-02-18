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
