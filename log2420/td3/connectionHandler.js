/**
 * Opens web socket
 */
socket.onopen = function () {}

/**
 * Redirects the event received, depending on its type
 * @param  {Event} event - An event from the server
 */
socket.onmessage = function (event) {
    let msg = JSON.parse(event.data);
    console.log(msg);
    let date = new Date();
    switch (msg.eventType) {
        case "onMessage":
            addMessageToChannel(msg, date);
            if (msg.channelId === currentChannelId) {
                showMessage(msg, date);
            }
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