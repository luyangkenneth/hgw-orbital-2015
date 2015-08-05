var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var num_connections = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  num_connections++;
  console.log('num users: ' + num_connections);
  io.emit('num_connections', num_connections);

  socket.on('disconnect', function(){
  	num_connections--;
    console.log('num users: ' + num_connections);
    io.emit('num_connections', num_connections);
  });

  socket.on('move', function(box){
    io.emit('move', box);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});