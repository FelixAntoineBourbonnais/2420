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

    if (answer.length > 13 || answer.length < 3) {
        alert("Veuiller entrer un nom d'utilisateur entre 3 et 13 caractères!");
    } else {
        user = answer;
        usernameVerification = false;
    }
}

let socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + user);

socket.onopen = function () {}

let callbacks = jQuery.Callbacks()
Topic = {
    publish: callbacks.fire,
    subscribe: callbacks.add,
    unsubscribe: callbacks.remove
}

$(document).ready(function () {
    $("#username").text(user);
    Topic.subscribe(sendText);
    togglePlusMinus();
    newGroup();
    sendMessage();
});


function togglePlusMinus() {
    $(".group").on("click", ".channel-icon", function () {
        $(".channel-icon").toggleClass("color-plus color-minus");
        $(".channel-icon").toggleClass("fa-plus fa-minus");
    });
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

function sendMessage() {
    $("#send-button").click(function () {
        inputMessage = $("#text-input").val();
        if (inputMessage.length !== 0) {
            let date = new Date();
            let message = new Message("onMessage", "dbf646dc-5006-4d9f-8815-fd37514818ee", inputMessage, user, date);
            Topic.publish(message);

            $("#text-input").val("");
        }
    });

    $("#text-input").keypress(function (e) {
        if (e.which == 13) {
            $('#send-button').click();
        }
    });
}

function showMessage(msg, date) {
    sentNumber = $(".sent-message").length;
    receivedNumber = $(".received-message").length;
    formatedDate = formatDate(date);

    if (msg.sender === user) {

        id = "sent" + sentNumber;

        jQuery("<div></div>", {
            id: id,
            class: "sent-message",
        }).appendTo("#chat-area");

        jQuery("<div></div>").appendTo("#" + id);

        jQuery("<div></div>", {
            id: "sent-inner-text",
            text: msg.data,
        }).appendTo("#" + id);

        jQuery("<div></div>", {
            id: "sent-date",
            text: formatedDate,
        }).appendTo("#" + id);

    } else {

        id = "received" + sentNumber;
        
        jQuery("<div></div>", {
            id: id,
            class: "received-message",
        }).appendTo("#chat-area");

        jQuery("<div></div>", {
            id: "received-name",
            text: msg.sender,
        }).appendTo("#" + id);

        jQuery("<div></div>", {
            id: "received-inner-text",
            text: msg.data,
        }).appendTo("#" + id);

        jQuery("<div></div>", {
            id: "received-date",
            text: formatedDate,
        }).appendTo("#" + id);

    }
    $("#chat-area").scrollTop( $("#chat-area").prop('scrollHeight') );
}

function formatDate(date) {
    switch(date.getDay()) {
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
    // dayWeek = date.substr(10, 1);
    /*switch(date.substr(10, 1)) {
        case "M":
            dayWeek = "DIM";
            break;
        case "T":
            dayWeek = "LUN";
            break;
        case 2:
            dayWeek = "MAR";
            break;
        case 3:
            dayWeek = "MER";
            break;   
        case 4:
            dayWeek = "JEU";
            break;
        case 5:
            dayWeek = "VEN";
            break;
        case 6:
            dayWeek = "SAM";
            break;  
    }

    dayMonth = date.substr(8, 2);
    console.log(dayMonth);

    hour = date.substr(11, 5);
    console.log(hour);*/
}

function handleError(msg) {
    alert(msg.data);
}