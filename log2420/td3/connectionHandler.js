socket.onmessage = function(event) {
    var msg = JSON.parse(event.data);
    console.log(msg);
}

socket.onerror = function(event) {
    var msg = JSON.parse(event.data);
    console.log(msg);
}