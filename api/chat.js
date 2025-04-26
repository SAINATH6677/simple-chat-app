const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

// Middleware to allow frontend files to be served
app.use(express.static('public'));

const server = http.createServer(app);
const io = new Server(server);

// Socket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

module.exports = (req, res) => {
    if (req.method === 'GET') {
        res.status(200).send("Server is running");
    }
}
