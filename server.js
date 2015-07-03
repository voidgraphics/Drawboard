//  On require les modules dont on a besoin
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
//  On initialise le serveur node.js
server.listen(3000);

//  Routes
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//  Dossiers
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));

io.sockets.on( 'connection', function( socket ){

	console.log( "Someone connected to the application." )

	socket.on('showCmds', function(){
		var list = {};
		for(cmd in cmdList){
			if(cmdList[cmd].auth <= user._authority){
				list[cmd] = cmdList[cmd].desc;
			}
		}
		socket.emit( 'showCmds', list );
	});

	socket.on( "draw", function( data ){
		console.log( data );
		socket.broadcast.emit( "userDrew", data );
	} );

	socket.on( 'disconnect', function(){
		console.log( "Someone disconnected." );
	} );

} );