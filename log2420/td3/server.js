const WebSocket = require('ws');
 
const server = new WebSocket.Server({ port: 3000 });
 
server.on('connection', socket => {

  console.log("Connected!!!");
  socket.send("Connected!");

  socket.on('onMessage', message => {
    console.log(`received from a client: ${message}`);
    socket.send(message);
  });

  socket.on('onCreateChannel', channel => {
    console.log(`received from a client: ${channel}`);
    socket.send(channel);
  });

  socket.on('onJoinChannel', channel => {
    console.log(`received from a client: ${channel}`);
    socket.send(message);
  });

  socket.on('onLeaveChannel', channel => {
    console.log(`received from a client: ${channel}`);
    socket.send(message);
  });

  socket.on('updateChannelsList', message => {
    console.log(`received from a client: ${message}`);
    socket.send(message);
  });

  socket.on('onError', errorMessage => {
    console.log(`received from a client: ${errorMessage}`);
    socket.send(errorMessage);
  });

  socket.send('Hello world!');
});