var socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + "Simon");

function sendText(message) {
    if(socket.readyState === 1) {
        console.log(message);
        socket.send(JSON.stringify(message));
    }
}

socket.onMessage = function(event) {
    var msg = JSON.parse(event.data);
    console.log(msg);
}

socket.onerror = function(event) {
    var msg = JSON.parse(event.data);
    console.log(msg);
}