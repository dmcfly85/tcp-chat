var chai = require('chai');
var net = require('net');
var expect = chai.expect;
//var client_1 = require('../chat_client.js');
//var client_2 = require('../chat_client.js');
var server = require('../lib/chat_server.js');

describe('Testing chat server', function () {

  before(function () {

  });

  it('it should greet us properly', function (done) {
    server.chat_server();
    var client = net.connect(3000, function () {
      client.on('data', function (data) {
        res = data.toString();
        expect(res).to.eql('\n----------------------------\n   Welcome to TCP chat\n----------------------------\n\n');
        done();
      });
    });

  });

  it('it should send a message from one client to another', function (done) {
    server.chat_server();

    var client_1 = function () {
      net.connect(3000, function () {
        client.on('data', function (data) {
          client_2();
        });
      });
    };

    var client_2 = function () {
      net.connect(3000, function () {
        client.on('data', function () {
          var d = d + 1;
          client_1();
          res = data.toString();
          if (d == 2) {
            expect(res).to.eql('this is a test of the emergancy broadcast system');
            done();
          }
        });
      });
    };

    client_1w = function () {
      client_1.write('this is a test of the emergancy broadcast system');
    };

  });
});
