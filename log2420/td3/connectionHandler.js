
socket.onmessage = function (event) {
    let msg = JSON.parse(event.data);
    console.log(msg);
    switch (msg.eventType) {
        case "onMessage":
            console.log("onMessage");
            let date = new Date();
            showMessage(msg, date);
            break;
        case "onCreateChannel":
            console.log("onCreateChannel");
            break;
        case "onJoinChannel":
            console.log("onJoinChannel");
            break;
        case "onLeaveChannel":
            console.log("onLeaveChannel");
            break;
        case "updateChannelsList":
            console.log("updateChannelsList");
            break;
        case "onError":
            console.log("onError");
            handleError(msg);
            break;
    }
}