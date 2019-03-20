function sendText(message) {
    console.log(message); 
    socket.onopen = function(event) {
        console.log(message);
        socket.send(message);
    }
}