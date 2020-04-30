const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.Server(app);
const io = socketio(server);
const next = require('next');
const dev = process.env.NODE_ENV;
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./database.js');

io.on('connection', (socket) => {
    socket.on('join', (obj, callback) => {
        const { error, user } = addUser({ id: socket.id, name: obj.name, room: obj.room });
        console.log(`Adding ${obj.name} to room ${obj.room}`);

        if (error) {
            return (callback(error));
        }

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}!`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the room.`});
        socket.join(user.room); // user.room is the parsed room name from user

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });

    socket.on('disconnect', () => {
        console.log('User has left!');
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`});
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }

        socket.disconnect();
    });
});

nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`Server has started on port ${PORT}.`);
    });
});