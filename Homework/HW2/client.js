var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
var answer=0,i=0;
var client = new net.Socket();

client.connect(PORT, HOST, function() {
   console.log('CONNECTED TO: ' + HOST + ':' + PORT);
   client.write('5935512019');
});

client.on('data', function(data) {
   console.log('Server: ' + data);
   i++;
   
   if(data=='OK'){  
        answer=Math.floor(Math.random() * 21);
        answer=parseInt(answer);
        client.write(answer.toString());
   }
   else if(data=='WRONG'){
        answer=Math.floor(Math.random() * 21);
        answer= parseInt(answer);
        client.write(answer.toString());
   }
   else if(data=='BINGO'){
        i/5;
        console.log('You submit '+i)
     //    client.destroy();
   }
   else if(data=='END'){
     //    client.destroy();
     //    client.connect(PORT, HOST, function() {
     //        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
     //        client.write('5935512019');
     //    });
    }
});

client.on('close', function() {
   console.log('Connection closed');
});