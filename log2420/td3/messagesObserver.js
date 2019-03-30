
function sendText(message) {
    if (socket.readyState === 1) {
        socket.send((message));
    }
}