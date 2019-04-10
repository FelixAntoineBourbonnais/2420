usernameVerification = true;

while (usernameVerification) {
    answer = prompt("Veuillez entrer un nom d'utilisateur:", "Nom d'utilisateur");

    if (answer != null) {
        if (answer.length > 13 || answer.length < 3) {
            alert("Veuiller entrer un nom d'utilisateur entre 3 et 13 caractères!");
        } else if (answer == "Admin") { 
            alert("Le nom Admin est interdit!")
        } else {
            user = answer;
            usernameVerification = false;
        }
    }
}

let socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + user);

$(document).ready(function () {
    document.getElementById("username").innerText = user;
    currentChannelId = "dbf646dc-5006-4d9f-8815-fd37514818ee";
    sendMessage();
});

/**
 * Formats a given date
 * @param  {Date} date
 * @return {string} The formated date.
 */
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

/**
 * Sends an onJoinChannel Message to the server
 * @param  {string} newChannelId
 */
function joinChannel(newChannelId) {
    let date = new Date();
    let message = new Message("onJoinChannel", newChannelId, "changing channel", user, date);
    sendText(message);
    console.log("joinChannel");
}

/**
 * Sends an onLeaveChannel Message to the server
 * @param  {string} oldChannelId
 */
function leaveChannel(oldChannelId) {
    let date = new Date();
    let message = new Message("onLeaveChannel", oldChannelId, "changing channel", user, date);
    sendText(message);
    console.log("leaveChannel");
}

/**
 * Retreives channel name from local list
 * @param  {string} channelId
 * @return {string} The name of the channel.
 */
function getChannelNameFromId(channelId) {
    for (channel in channelsList) {
        if (channelsList[channel].id === channelId) {
            return channelsList[channel].name;
        }
    }
    return;
}
