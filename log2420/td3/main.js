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
        } else {
            user = answer;
            usernameVerification = false;
        }
    }
}

let socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + user);

$(document).ready(function () {
    $("#username").text(user);
    togglePlusMinus();
    newGroup();
    sendMessage();
});

function togglePlusMinus() {
        $().toggleClass("color-plus color-minus");
        $().toggleClass("fa-plus fa-minus");
}

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
        /* let tempNode = document.querySelector("div[data-type='template']").cloneNode(true);
         console.log(tempNode);
         
         $("#group-list").append(tempNode);*/
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

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return day + " " + dateMonth + ", " + hours + ":" + minutes;
}

function showError(msg, date) {
    receivedNumber = $(".received-message").length;
    formatedDate = formatDate(date);

    id = "received" + receivedNumber;

    jQuery("<div></div>", {
        id: id,
        class: "received-message",
    }).appendTo("#chat-area");

    jQuery("<div></div>", {
        id: "received-name",
        text: "Admin",
    }).appendTo("#" + id);

    jQuery("<div></div>", {
        id: "received-inner-text-error",
        text: msg.data + "!",
    }).appendTo("#" + id);

    jQuery("<div></div>", {
        id: "received-date",
        text: formatedDate,
    }).appendTo("#" + id);
}

function joinChannel(newChannelId) {
    let date = new Date();
    let message = new Message("onJoinChannel", newChannelId, "changing channel", user, date);
    sendText(message);
    console.log("joinChannel");
    setPlusMinusIcon();
}

function leaveChannel(oldChannelId) {
    let date = new Date();
    let message = new Message("onLeaveChannel", oldChannelId, "changing channel", user, date);
    sendText(message);
    console.log("leaveChannel");
}