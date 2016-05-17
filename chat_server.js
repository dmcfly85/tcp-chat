const net = require('net');

const sockets = [];
var socketIDcounter = 1;

net.createServer((socket) => {

  socket.write('\n----------------------------\n')
  socket.write('   Welcome to TCP chat\n')
  socket.write('----------------------------\n\n')

  socket.write('Please log in:');

  sockets.push(socket);
  socket.id = socketIDcounter
  socketIDcounter = socketIDcounter + 1
  socket.user_name = ''
  socket.user_loggedin = false
  console.log(socket);

  console.log(socket.user_name);
  console.log('New chat user has logged in. There are ' + sockets.length + ' users in the chat room');
  socket.on('data', (chunk) => {

    if (socket.user_name != '') {
      console.log(socket.id);
      sockets.forEach((s) => {
      if (socket.user_loggedin === true) {
       s.write(socket.user_name + ': ' + chunk.toString())
        }
      });

    } else {
      console.log("user:", socket.user_loggedin);
      socket.user_name = removeNewLines(chunk.toString())
      console.log(socket.user_name + ' has joined the chat');
      socket.resume()
      socket.write('You are logged in, welcome ' + socket.user_name + '\n');
      socket.write('You >')
      socket.user_loggedin = true
    }
  });

  socket.on('close', (data) => {
    console.log(socket.user_name + ' has left the chat');

  })

}).listen(3000, () => {
  console.log('Chat server started on port 3000');
})

removeNewLines = function (string) {
  return string.replace(/(\r\n|\n|\r)/gm, "")
}

//socket.write('o')
// socket.write(' \_/\o')
// socket.write('( Oo)                    \|/')
// socket.write('(_=-)  .===O-  ~~Z~A~P~~ -O-')
// //socket.write('/   \_/U                 /|\')
// socket.write('||  |_/')
// socket.write('\\  |')
// socket.write('{K ||')
// socket.write(' | PP')
// socket.write('| ||')
// socket.write(' (__\\')
