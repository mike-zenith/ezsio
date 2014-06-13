var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {
    console.log('hello ->', socket.id);
    socket.emit('hello', { hello: socket.id });

    socket.on('echo', function (data) {
        console.log('-> echo', data);
        socket.emit('echo', data);
    });

    socket.on('call:handshake', function (data) {
        socket.broadcast.emit('call:handshake', data);
    });
});