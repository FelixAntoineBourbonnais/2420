
// var socket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + "Simon");

var socket = new WebSocket("ws://localhost:3000");

socket.onopen = function() {
  var date = new Date();
  var message = new Message("onMessage", "Général", "TEST", "Simon", date);
  sendText(message);

}

function sendText(message) {
  console.log("readystate = " + socket.readyState);
  console.log("readystate = " + socket.readyState);
  if(socket.readyState === 1) {
    console.log("SEND TEXT");
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