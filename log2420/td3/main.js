/*
TODO: 
-enter fait envoyer le texte
-bouton envoyer envoie le texte
-afficher le texte envoyé dans le chat (avec bonne date)
-Quand on click sur un channel, le nom du groupe actif change
-Quand on click sur un channel, on voit bien qu'il est sélectionné
-Channel par défaut est général, et on voit qu'il est sélectionné
-on peut hover un channel et le curseur change
-Quand on veux créer un groupe, un popup apparait et on peut donner un nom au groupe
-Le reste c'est des requetes au serveur

DEBUG:
-Quand on create un groupe dynamiquement, le bouton peut pas executer sa fonction
*/

$(document).ready(function () {
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
        groupNumer = $(".group").length;
        backgroundColor = "group light";

        if (groupNumer % 2)
            backgroundColor = "group dark";

        jQuery("<div></div>", {
            id: groupNumer,
            class: backgroundColor,
        }).appendTo("#group-list");

        jQuery("<i></i>", {
            id: "channel-icon",
            class: "fas fa-plus color-plus",
        }).appendTo("#" + groupNumer);

        jQuery("<div></div>", {
            id: "group-name",
            text: "Groupe",
        }).appendTo("#" + groupNumer);

        jQuery("<div></div>").appendTo("#" + groupNumer);
    });
}

function sendMessage() {
    $("#send-button").click(function () {
        var textInput = ("#text-input").attr("value")
        sentNumber = $(".sent-message").length;
        console.log(sentNumber);

        jQuery("<div></div>", {
            id: sentNumber,
            class: "sent-message",
        }).appendTo("#chat-area");

        jQuery("<div></div>", {
            id: "sent-inner-text",
            text: textInput,
        }).appendTo("#" + sentNumber);

        jQuery("<div></div>", {
            id: "sent-date",
            text: "Date",
        }).appendTo("#" + sentNumber);
    });

    $("#text-input").keypress(function (e) {
        if(e.which == 13){
            $('#send-button').click();
        }
    });

    $(window).on("scroll", function() {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
        }
    });
}

function joinChannel() {

}