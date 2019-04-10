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
            console.log(msg);
            break;
        case "onCreateChannel":
            console.log("onCreateChannel");
            break;
        case "updateChannelsList":
            updateChannelsList(msg);
            console.log("updateChannelsList");
            break;
        case "onError":
            showMessage(msg, date);
            break;
    }
}