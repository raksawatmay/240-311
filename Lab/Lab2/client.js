var net = require('net');
var HOST = 'coin.werapun.com';
var PORT = 6969;
var answer=0;
var i = 10;

var client = new net.Socket ();
client.connect(PORT, HOST, function(){
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write("5935512052");
});
    client.on('data', function(data){
    console.log('Server: ' + data)
    i++;
    if (data == 'OK.'){
        answer=Math.floor(Math.random()*21);
        answer=parseInt(answer);  
        client.write(i.toString());
        i++;
    }
    else if (data == 'WRONG') {
        answer=Math.floor(Math.random()*21);
        answer=parseInt(answer); 
        console.log("Try again: ",i)
        client.write(i.toString());
        i++;
    }    
    else if (data.toString() == 'BINGO'){
        i/5;
        console.log("YES I WON")
        client.destroy();
    }
    else if (data=='End'){
        client.destroy();
    }
});
client.on('close',function(){
        console.log('Connection closed');
}); 

        