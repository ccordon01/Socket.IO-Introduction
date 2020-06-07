const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    // console.log(`${socket.id} user connected`);
    io.emit('user status', `${socket.id} connected`);
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        io.emit('user status', `${socket.id} disconnected`);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});