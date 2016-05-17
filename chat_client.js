const net = require('net');
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

const client = net.connect(3000, ()=>{
  client.on('data', (data)=> {
    res = data.toString()
       process.stdout.write(res);
       //rl.prompt("You >")
  })
  //client.write('dsfsd')
  //console.log("dfsdf")
  //process.stdin.on('data')
})

rl.on('line', function(line){

    client.write(line);
    if (loggedin == true) {
      //process.stdout.write("You >")
      rl.prompt("You >")
      charm.up(1)
      charm.erase(line)
      //rl.write(null, {ctrl: true, name: 'u'});

    }


})
