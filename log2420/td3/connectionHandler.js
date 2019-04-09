socket.onopen = function () {
    
}

socket.onmessage = function (event) {
    let msg = JSON.parse(event.data);
    console.log(msg);
    let date = new Date();
    switch (msg.eventType) {
        case "onMessage":
            console.log("onMessage");
            showMessage(msg, date);
            break;
        case "onCreateChannel":
            console.log("onCreateChannel");
            addNewChannel(msg);
            break;
        case "onJoinChannel":
            showJoinChannel(msg, date);
            break;
        case "onLeaveChannel":
            console.log("onLeaveChannel");
            showLeaveChannel(msg, date);
            break;
        case "updateChannelsList":
            console.log("updateChannelsList");
            initialization(msg);
            break;
        case "onError":
            console.log("onError: " + msg);
            console.log("onError");
            showError(msg, date);
            break;
    }
}