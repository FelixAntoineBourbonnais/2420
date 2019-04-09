/*
TODO: 
-Quand on click sur un channel, le nom du groupe actif change
-Quand on click sur un channel, on voit bien qu'il est sélectionné
-Channel par défaut est général, et on voit qu'il est sélectionné
-Le reste c'est des requetes au serveur

DEBUG:
-Quand on create un groupe dynamiquement, le bouton peut pas executer sa fonction
*/

usernameVerification = true;

while (usernameVerification) {
    answer = prompt("Veuillez entrer un nom d'utilisateur:", "Nom d'utilisateur");

    if (answer != null) {
        if (answer.length > 13 || answer.length < 3) {
            alert("Veuiller entrer un nom d'utilisateur entre 3 et 13 caractères!");
        } else if (answer == "Admin") { 
            alert("Le nom Admin est prohibe")
        } else {
            user = answer;
            usernameVerification = false;
        }
    }
}

let socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + user);

$(document).ready(function () {
    $("#received-date").text(formatDate(new Date()));
    $("#username").text(user);
    newGroup();
    sendMessage();
});

function newGroup() {
    $("#new-group").click(function () {
        let groupName = prompt("Veuillez entrer un nom de groupe:", "Nom de groupe");

        groupNumber = $(".group").length;
        backgroundColor = "group light";

        if (groupNumber % 2)
            backgroundColor = "group dark";

        jQuery("<div></div>", {
            id: groupNumber,
            class: backgroundColor,
        }).appendTo("#group-list");

        jQuery("<i></i>", {
            class: "fas fa-plus color-plus channel-icon",
        }).appendTo("#" + groupNumber);

        jQuery("<div></div>", {
            id: "group-name",
            text: groupName,
        }).appendTo("#" + groupNumber);

        jQuery("<div></div>").appendTo("#" + groupNumber);
    });
}

function formatDate(date) {
    switch (date.getDay()) {
        case 0:
            day = "DIM";
            break;
        case 1:
            day = "LUN";
            break;
        case 2:
            day = "MAR";
            break;
        case 3:
            day = "MER";
            break;
        case 4:
            day = "JEU";
            break;
        case 5:
            day = "VEN";
            break;
        case 6:
            day = "SAM";
            break;
    }
    dateMonth = date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }
    
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return day + " " + dateMonth + ", " + hours + ":" + minutes;
}

function joinChannel(newChannelId) {
    let date = new Date();
    let message = new Message("onJoinChannel", newChannelId, "changing channel", user, date);
    sendText(message);
    console.log("joinChannel");
    setPlusMinusIcon();
}

