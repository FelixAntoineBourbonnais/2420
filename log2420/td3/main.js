/*
TODO: 
-Quand on click sur un channel, le nom du groupe actif change
-Quand on click sur un channel, on voit bien qu'il est sélectionné
-Channel par défaut est général, et on voit qu'il est sélectionné
-Le reste c'est des requetes au serveur

DEBUG:
-Quand on create un groupe dynamiquement, le bouton peut pas executer sa fonction
*/
var socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=Simon");

var callbacks = jQuery.Callbacks()
Topic = {
    publish: callbacks.fire,
    subscribe: callbacks.add,
    unsubscribe: callbacks.remove
}

$(document).ready(function () {
    Topic.subscribe(sendText);
    togglePlusMinus();
    newGroup();
    sendMessage();
});


function togglePlusMinus() {
    $(".group").on("click", "#channel-icon", function () {
        $("#channel-icon").toggleClass("color-plus color-minus");
        $("#channel-icon").toggleClass("fa-plus fa-minus");
    });
}

function newGroup() {

    $("#new-group").click(function () {
        var groupName = prompt("Veuillez entrer un nom de groupe:", "Nom de groupe");

        groupNumber = $(".group").length;
        backgroundColor = "group light";

        if (groupNumber % 2)
            backgroundColor = "group dark";

        jQuery("<div></div>", {
            id: groupNumber,
            class: backgroundColor,
        }).appendTo("#group-list");

        jQuery("<i></i>", {
            id: "channel-icon",
            class: "fas fa-plus color-plus",
        }).appendTo("#" + groupNumber);

        jQuery("<div></div>", {
            id: "group-name",
            text: groupName,
        }).appendTo("#" + groupNumber);

        jQuery("<div></div>").appendTo("#" + groupNumber);
    });
}

function sendMessage() {
    $("#send-button").click(function () {
        inputMessage = $("#text-input").val();
        sentNumber = $(".sent-message").length;
        var date = new Date();
        var message = new Message("onMessage", "Général", "TEST", "Simon", date);
        sendText(message);
        console.log(message);
        Topic.publish(message);

        jQuery("<div></div>", {
            id: sentNumber,
            class: "sent-message",
        }).appendTo("#chat-area");

        jQuery("<div></div>").appendTo("#" + sentNumber);

        jQuery("<div></div>", {
            id: "sent-inner-text",
            text: inputMessage,
        }).appendTo("#" + sentNumber);

        jQuery("<div></div>", {
            id: "sent-date",
            text: date,
        }).appendTo("#" + sentNumber);

        $("#text-input").val("");
    });

    $("#text-input").keypress(function (e) {
        if (e.which == 13) {
            $('#send-button').click();
        }
    });

    //scrollTop = $("#chat-area").get(0).scrollHeight;
        }

function joinChannel() {

}