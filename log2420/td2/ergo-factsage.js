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
    
    document.getElementById("newValues").style.display = "";

    var massToAdd = document.getElementById("massElement").innerHTML + "<br>";
    var speciesToAdd = document.getElementById("speciesElement").innerHTML + "<br>";

    
    document.getElementById("addedMass").innerHTML += massToAdd;
    document.getElementById("addedSpecies").innerHTML += speciesToAdd;
}

function calculate() {
    var i,
        formule = '',
        inputData = document.getElementsByClassName("clearable");

    // Displays the spinner
    preLoader();

    // Formulates the proper formula
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
    var x = 0, y = 0;

    xhttp.onreadystatechange = function () {

        // When readyState = 4, the post request is "Completed"
        if (xhttp.readyState == 4 && this.status == 200) {
            postLoader();
            
            var myObj = JSON.parse(this.responseText);

            // Table 1: Conditions
            var conditions = "<table><tbody>";
            for (x in myObj.Conditions) {
                conditions += "<tr>";
                conditions += "<td>" + myObj.Conditions[x][0] + "</td>";
                conditions += "<td>" + "=" + "</td>";
                conditions += "<td>" + myObj.Conditions[x][1] + " " + myObj.Conditions[x][2] + "</td>";
                conditions += "</tr>";
            }
            conditions += "</tbody><table>";

            // Table 2: Stream Constituents
            var streamConsitutents = "<table><tbody>";
            streamConsitutents += "<tr>";
            streamConsitutents += "<th>" + "STREAM CONSTITUENTS" + "</th>";
            streamConsitutents += "<th>" + "AMOUNT/mol" + "</th>";
            streamConsitutents += "</tr>";
            x = 0;
            for (x in myObj["STREAM CONSTITUENTS"]) {
                streamConsitutents += "<tr>";
                streamConsitutents += "<td>" + myObj["STREAM CONSTITUENTS"][x][0] + "</td>";
                streamConsitutents += "<td>" + myObj["STREAM CONSTITUENTS"][x][1] + "</td>";
                streamConsitutents += "</tr>";
            }
            streamConsitutents += "</tbody><table>";

            // Table 3: Phase
            var phase = "<table><tbody>";
            phase += "<tr>";
            phase += "<th> </th>";
            phase += "<th>" + "EQUIL AMOUNT" + "</th>";
            phase += "<th>" + "MOLE FRACTION" + "</th>";
            phase += "<th>" + "FUGACITY" + "</th>";
            phase += "</tr>";

            phase += "<tr>";
            phase += "<th>" + "PHASE: gas_ideal" + "</th>";
            phase += "<th>" + "mol" + "</th>";
            phase += "<th> </th>";
            phase += "<th>" + "atm" + "</th>";
            phase += "</tr>";
            x = 0;
            for (x in myObj["PHASE"]) {
                phase += "<tr>";
                phase += "<td>" + myObj["PHASE"][x][0] + "</td>";
                phase += "<td>" + myObj["PHASE"][x][1] + "</td>";
                phase += "<td>" + myObj["PHASE"][x][2] + "</td>";
                phase += "<td>" + myObj["PHASE"][x][3] + "</td>";
                phase += "</tr>";
            }
            phase += "</tbody><table>";

            // Table 4: CpHSGV
            x = 0;
            var cphsgv = "<table><tbody>";
            cphsgv += "<tr>";
            for (x in myObj["CpHSGV"]) {
                cphsgv += "<th>" + myObj["CpHSGV"][x][0] + "</th>";
            }
            cphsgv += "</tr>";

            x = 0;
            cphsgv += "<tr>";
            for (x in myObj["CpHSGV"]) {
                cphsgv += "<th>" + myObj["CpHSGV"][x][2] + "</th>";
            }
            cphsgv += "</tr>";

            x = 0;
            cphsgv += "<tr>";
            for (x in myObj["CpHSGV"]) {
                cphsgv += "<td>" + myObj["CpHSGV"][x][1] + "</td>";
            }
            cphsgv += "</tr>";
            cphsgv += "</tbody><table>";

            // Display tables
            document.getElementById("conditions").innerHTML = conditions;
            document.getElementById("streamConstituents").innerHTML = streamConsitutents;
            document.getElementById("phase").innerHTML = phase;
            document.getElementById("cphsgv").innerHTML = cphsgv;

        }
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