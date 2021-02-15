var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
var server = net.createServer();
var answer=(Math.random() * 21).toFixed(0); 
var i=0,count=0,ans=0;
server.listen(PORT, HOST);

server.on('connection', function(sock) {
 	console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
 	
 	sock.on('data', function(data) {
        console.log('HOST: ' + sock.remoteAddress);
        if(count==0){
            ((data.toString().length) == 10)? sock.write("OK") : sock.write("Worng Username")
        }
        ans=data.toString().trim()
        console.log("Sender:" + ans);
        
 		if(ans>= 0 && ans<22)
 		{
 			if(ans==answer)
 			{
                sock.write("BINGO");
                console.log('-----------------------------------------');
 				console.log('Server listening on ' + HOST +':'+ PORT);
 			}
 			else { 	
                if(i<=4){
 					sock.write("WRONG");
 				}
 				else{
 					sock.write("END");
                    i=0;
                    count=0;
 					sock.on('close', function(data) {
 		 				console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
 	 				 });
 				}
 			}
 			i++;
 		}
 		else{   
            console.log('-----------------------------------------');
 			console.log("Server Answer = "+answer);
 			sock.write("OK");
            i=1;
            count=1;
 		}  	
 	});
});
console.log('Server listening on ' + HOST +':'+ PORT);