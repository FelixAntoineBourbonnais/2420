function showMessage(message, date) {
    chatArea = document.getElementById("chat-area");
    if (message.sender === user) {
        newSentMessage = "";
        newSentMessage += "<div class='sent-message'>";
        newSentMessage += "<div id='sent-inner-text'>" + message.data+ "</div>";
        newSentMessage += "<div id='sent-date'>" + formatDate(date) + "</div></div>";
        chatArea.innerHTML += newSentMessage;
    } else {
        messageData = getMessageId(message);
        newReceivedMessage = "";
        newReceivedMessage += "<div class='received-message'>";
        newReceivedMessage += "<div id='received-name'>" + message.sender + "</div>";
        newReceivedMessage += messageData
        newReceivedMessage += "<div id='received-date'>" + formatDate(date) + "</div></div>";
        chatArea.innerHTML += newReceivedMessage;
    }
    chatArea.scrollTop = chatArea.scrollHeight;
}

function sendMessage() {
    $("#send-button").click(function () {
        inputMessage = $("#text-input").val();
        if (inputMessage.length !== 0) {
            let date = new Date();
            let message = new Message("onMessage", currentChannelId, inputMessage, user, date);
            socket.send(JSON.stringify(message));

            $("#text-input").val("");
        }
    });

    $("#text-input").keypress(function (e) {
        if (e.which == 13) {
            $('#send-button').click();
        }
    });
}

function sendText(message) {
    if (socket.readyState === 1) {
        socket.send(JSON.stringify(message));
    }
}

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

function AddMessageToChannel(msg, date) {
    channel = findChannel(msg.channelId);
    console.log(channel);
    if (channel.messages === null)
        channel.messages = Array();
    msg.timestamp = date;
    channel.messages.push(msg);
}

function loadMessages(channelId) {
    channel = findChannel(channelId);
    document.getElementById('chat-area').innerText = "";
    currentChannelId = channelId;
    console.log(channel.messages)
    if (channel.messages !== null) {
        for (i = 0; i < channel.messages.length; ++i) {
            showMessage(channel.messages[i], channel.messages[i].timestamp);
        }
    }
}

function findChannel(channelId) {
    for (i = 0; i < channelsList.length; ++i) {
        if (channelsList[i].id === channelId)
            return channelsList[i];
    }
}