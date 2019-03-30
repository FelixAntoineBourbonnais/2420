
var socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + "Simon");

//var socket = new WebSocket("ws://localhost:3000");

socket.onopen = function() {
    // let date = new Date();
    // let message = new Message("onMessage", 1, "CONTENT OF THE MESSAGE", "Noboru", date);
    // console.log("test");
    // sendText(message);
}

function sendText(message) {
    console.log("readystate = " + socket.readyState);
    if(socket.readyState === 1) {
        socket.send(JSON.stringify(message));
    }
}

socket.onmessage = function(event) {
    console.log(event);
    let msg = JSON.parse(event.data);
    console.log(msg);
    switch(msg.eventType) {
        case "onMessage":
            console.log("onMessage");
            //showMessage();
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
            break;
    }
}

socket.onerror = function(event) {
    let msg = JSON.parse(event.data);
    console.log(msg);
}
