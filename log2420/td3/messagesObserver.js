/**
 * Shows the new message to the screen
 * @param  {Data} message - Data from the event received from server
 * @param  {Date} date
 */
function showMessage(message, date) {
    chatArea = document.getElementById("chat-area");
    if (message.sender === user) {
        newSentMessage = "";
        newSentMessage += "<div class='sent-message'>";
        newSentMessage += "<div id='sent-inner-text'>" + message.data+ "</div>";
        newSentMessage += "<div id='sent-date'>" + date + "</div></div>";
        chatArea.innerHTML += newSentMessage;
    } else {
        messageData = getMessageId(message);
        newReceivedMessage = "";
        newReceivedMessage += "<div class='received-message'>";
        newReceivedMessage += "<div id='received-name'>" + message.sender + "</div>";
        newReceivedMessage += messageData
        newReceivedMessage += "<div id='received-date'>" + date + "</div></div>";
        chatArea.innerHTML += newReceivedMessage;
    }
    chatArea.scrollTop = chatArea.scrollHeight;
}

/**
 * Sends an onMessage type of Message to the server
 */
function sendMessage() {
    $("#send-button").click(function () {
        inputMessage = $("#text-input").val();
        if (inputMessage.length !== 0) {
            let date = new Date();
            let message = new Message("onMessage", currentChannelId, inputMessage, user, date);
            sendText(message);

            $("#text-input").val("");
        }
    });

    $("#text-input").keypress(function (e) {
        if (e.which == 13) {
            $('#send-button').click();
        }
    });
}

/**
 * Sends a given Message to the server
 * @param  {Message} message - Message from joinChannel or leaveChannel
 */
function sendText(message) {
    if (socket.readyState === 1) {
        console.log(message);
        socket.send(JSON.stringify(message));
    }
}

/**
 * Retreives the correct div type to show on screen, depending on the message type
 * @param  {Message} message
 * @return {string} The div to show on screen.
 */
function getMessageId(message) {
    if (message.sender === "Admin") {
        if (message.data.includes("a rejoint le groupe")) {
            return "<div id='received-inner-text-join'>" + message.data + "</div>";
        } else if (message.data.includes("a quit")) {
            return "<div id='received-inner-text-leave'>" + message.data + "</div>";
        } else if (message.data.includes("a quit")) {
            return "<div id='received-inner-text-leave'>" + message.data + "</div>";
        }
    } else if (message.sender == null){
        message.sender = "Admin";
        return "<div id='received-inner-text-error'>" + message.data + "</div>";
    } else {
        return "<div id='received-inner-text'>" + message.data + "</div>";;
    }
}

/**
 * Adds a Message to a channel in a local Array
 * @param  {Message} msg
 * @param  {Date} date
 */
function addMessageToChannel(msg, date) {
    // channel = findChannel(msg.channelId);
    // if (channel.messages === null)
    //     channel.messages = Array();
    // msg.timestamp = date;
    // channel.messages.push(msg);

    if (msg.channelId === currentChannelId) {
        showMessage(msg, date);
    }
}

/**
 * Loads all the messages of a channel on screen
 * @param  {string} channelId
 */
function loadMessages(msg) {
    document.getElementById('chat-area').innerText = "";
    currentChannelId = msg.id;
    if (msg.data.messages !== null) {
        for (i = 0; i < msg.data.messages.length; ++i) {
            showMessage(msg.data.messages[i], msg.data.messages[i].timestamp);
        }
    }
    setDarkness();
    setPlusMinusIcon();
    document.getElementsByName(msg.data.name)[0].style.backgroundColor =  "rgb(150, 199, 188)";
    document.getElementById('current-channel').innerText = getChannelNameFromId(msg.id);

}

// /**
//  * Retreives a channel from a local channel list
//  * @param  {string} channelId
//  * @return {Channel} The channel.
//  */
// function findChannel(channelId) {
//     for (i = 0; i < channelsList.length; ++i) {
//         if (channelsList[i].id === channelId)
//             return channelsList[i];
//     }
// }

function getChannel(channelId) {
    let date = new Date();
    let message = new Message("onGetChannel", channelId, channelId, user, date);
    if (socket.readyState === 1) {
        socket.send(JSON.stringify(message));
    }
}