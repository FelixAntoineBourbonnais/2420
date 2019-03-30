
<<<<<<< HEAD
socket.onmessage = function (event) {
=======
var socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + "Simon");

//var socket = new WebSocket("ws://localhost:3000");

socket.onopen = function() {
  sendText(message);
}

function sendText(message) {
  console.log("readystate = " + socket.readyState);
  if(socket.readyState === 1) {
    socket.send(JSON.stringify(message));
  }
}

socket.onmessage = function(event) {
>>>>>>> 9b9e6ef2de85ca45352d3746e6ff46622f88156e
    let msg = JSON.parse(event.data);
    console.log(msg);
    switch (msg.eventType) {
        case "onMessage":
            console.log("onMessage");
            showMessage(msg);
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