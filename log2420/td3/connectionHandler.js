socket.onopen = function () {
    initialization();
}

socket.onmessage = function (event) {
    let msg = JSON.parse(event.data);
    console.log(msg);
    let date = new Date();
    switch (msg.eventType) {
        case "onMessage":
            addMessageToChannel(msg, date);
            showMessage(msg, date);
            console.log(msg);
            break;
        case "onCreateChannel":
            console.log("onCreateChannel");
            addNewChannel(msg);
            break;
        case "updateChannelsList":
            console.log("updateChannelsList");
            updateChannelsList(msg);
            break;
        case "onError":
            showMessage(msg, date);
            break;
    }
}