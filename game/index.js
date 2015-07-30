var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var num_connections = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('move', function(msg){
    io.emit('move', msg);
  });
  
  num_connections++;
  console.log('num users: ' + num_connections);

  socket.on('disconnect', function(){
  	num_connections--;
    console.log('num users: ' + num_connections);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});




/*
if num_connections = 0
  you are player x
  waiting for opponent...
else if num_connections = 1
  you are player o
  game start! (if num_connections < 2, "whoops, somebody quit the game". then end game)
  blah blah...
  game end!
else
  lobby is full, bitch. check back another time.
*/