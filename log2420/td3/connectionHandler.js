socket.onopen = function () {
    
}

socket.onmessage = function (event) {
    let msg = JSON.parse(event.data);
    console.log(msg);
    let date = new Date();
    switch (msg.eventType) {
        case "onMessage":
            AddMessageToChannel(msg, date);
            showMessage(msg, date, false);
            // loadMessages(msg.channelId);
            break;
        case "onCreateChannel":
            break;
        case "updateChannelsList":
            updateChannelsList(msg);
            break;
        case "onError":
            showMessage(msg, date, true);
            break;
    }
}