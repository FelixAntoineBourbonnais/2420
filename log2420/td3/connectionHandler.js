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
            console.log("onCreateChannel");
            addNewChannel(msg);
            break;
        case "updateChannelsList":
            console.log("updateChannelsList");
            initialization(msg);
            break;
        case "onError":
            console.log("onError: " + msg);
            console.log("onError");
            showMessage(msg, date, true);
            break;
    }
}