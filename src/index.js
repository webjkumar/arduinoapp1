const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

let count = 0;

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('New Websocket connection');
    socket.emit('status', count);

    socket.on('switch_on', () => {
        count = 1;
        //socket.emit('status', count); //for specif connection
        io.emit('status', count);
    });
    socket.on('switch_off', () => {
        count = 0;
        //socket.emit('status', count);
        io.emit('status', count);
    });
});

app.get('/status', (req, res) => {
    res.end(JSON.stringify({"status":count}));
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

/*
const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});
*/