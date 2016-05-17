var net = require('net');
var readline = require('readline');
var loggedin = false;
var charm = require('charm')();
charm.pipe(process.stdout);
charm.reset();

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

var client = net.connect(3000, function () {
  client.on('data', function (data) {
    res = data.toString();
    process.stdout.write(res + '\n');
  });
});

rl.on('line', function (line) {
  client.write(line);
});
