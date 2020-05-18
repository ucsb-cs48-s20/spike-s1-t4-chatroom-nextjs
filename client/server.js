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
// const cors = require('cors');

const router = require('./router');

const { addUser, removeUser, getUser, getUsersInRoom, addMessage, deleteRoom, getHistory } = require('./database.js');

io.use((socket, next) => {
    let token = socket.handshake.query.name;
    console.log(socket.handshake.query);
    console.log("Query token: ", token);
    next();
});

io.on('connection', (socket) => {
    if (socket.handshake.query.name === "chatty") {
        socket.on('join', (obj, callback) => {
            const { error, user } = addUser({ id: socket.id, name: obj.name, room: obj.room });
            console.log(`Adding ${obj.name} to room ${obj.room}`);
            
            if (error) {
                return (callback(error));
            }
    
            // emits chat history for the user who just joined
            const history = getHistory(user.room);
            
            // emtis chat history
            for (var i = 0; i < history.length; i++) {
                socket.emit('message', { user: history[i].name, text: history[i].text});
            }
    
            socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}!`});
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the room.`}); // saved in history
            addMessage({ room: user.room, name: 'admin', text: `${user.name} has joined the room.`});
            socket.join(user.room); // user.room is the parsed room name from user
    
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
            callback();
        });
    
        socket.on('sendMessage', (message, callback) => {
            const user = getUser(socket.id);
    
            io.to(user.room).emit('message', { user: user.name, text: message });
            addMessage({ room: user.room, name: user.name, text: message });
            callback();
        });
        
        socket.on('disconnect', () => {
            console.log('User has left!');
            const user = removeUser(socket.id);
    
            if (user) {
                io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`}); // saved in history
                addMessage({ room: user.room, name: 'admin', text: `${user.name} has left.`});
                io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
                deleteRoom(user.room);
            }
    
            socket.disconnect();
        });
    }
});

// this make the server port address also see code on the frontend
nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res);
    });
    
    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`Server has started on port ${PORT}.`);
    });
});