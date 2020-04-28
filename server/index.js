const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./database.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('join', (obj, callback) => {
        console.log(obj);
        const { error, user } = addUser({ id: socket.id, name: obj.name, room: obj.room });
        
        if (error) {
            return (callback(error));
        }

        socket.join(user.room); // user.room is the parsed room name from user
        console.log(getUsersInRoom(user.room));
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        callback();
    });

    socket.on('disconnect', () => {
        console.log('User has left!');
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }

        socket.disconnect();
    });
});

app.use(router);
//app.use(cors());

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}.`);
});