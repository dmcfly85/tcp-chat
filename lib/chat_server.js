module.exports.chat_server = function () {
  var net = require('net');
  var sockets = [];
  var socketIDcounter = 1;
  net.createServer(function (socket) {
    sockets.push(socket);
    socket.id = socketIDcounter;
    socketIDcounter = socketIDcounter + 1;

    socket.write('\n----------------------------\n');
    socket.write('   Welcome to TCP chat\n');
    socket.write('----------------------------\n\n');

    console.log('New chat user has logged in. There are ' + sockets.length + ' users in the chat room');

    socket.on('data', function (chunk) {
      sockets.forEach(function (s) {
        if (socket.id != s.id)
          s.write(chunk.toString());
        return chunk.toString();
      });
    });

    socket.on('close', function (data) {
      console.log('A user has left the chat');
    });

  }).listen(3000, function () {
    console.log('Chat server started on port 3000');
  });

  removeNewLines = function (string) {
    return string.replace(/(\r\n|\n|\r)/gm, '');
  };

};
