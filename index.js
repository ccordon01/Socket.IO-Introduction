const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    // console.log(`${socket.id} user connected`);
    socket.broadcast.emit('user status', `${socket.id} connected`);
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('new chat message', msg);
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('user status', `${socket.id} disconnected`);
    });
    socket.on('type event', () => {
        socket.broadcast.emit('type event', `${socket.id} is typing...`);
    });
    socket.on('stop type event', () => {
        socket.broadcast.emit('stop type event', `${socket.id} disconnected`);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});