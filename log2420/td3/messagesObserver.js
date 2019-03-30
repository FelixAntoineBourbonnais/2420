
function sendText(message) {
    if (socket.readyState === 1) {
        socket.send(JSON.stringify(message));
    }
}