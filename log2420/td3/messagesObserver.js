function showMessage(message, date) {
    chatArea = document.getElementById("chat-area");
    if (message.sender === user) {
        newSentMessage = "";
        newSentMessage += "<div class='sent-message'>";
        newSentMessage += "<div id='sent-inner-text'>" + message.data+ "</div>";
        newSentMessage += "<div id='sent-date'>" + formatDate(date) + "</div></div>";
        chatArea.innerHTML += newSentMessage;
    } else {
        newReceivedMessage = "";
        newReceivedMessage += "<div class='received-message'>";
        newReceivedMessage += "<div id='received-name>" + message.sender + "</div>";
        newReceivedMessage += "<div id='received-inner-text'>" + message.data + "</div>";
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