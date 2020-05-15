const users = []; // empty array of users

const messageLog = {}; // server

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => {
        // for each user in the array, check to see if
        // name and room is similar to the new user
        return user.room === room && user.name === name;
    });

    const roomExists = users.find((user) => {
        // for each user, check if a user's room exists
        return user.room === room;
    });
    
    if (existingUser) {
        return { error: 'Username is taken.' };
    }

    // new storage from room contents
    if (!roomExists) {
        messageLog[room] = [];
    }

    const newUser = { id, name, room };
    users.push(newUser);

    return { user: newUser }; // returns the user object within an object
}

// adds new message to specific room
const addMessage = ( {room, name, text} ) => {
    const roomArray = messageLog[room];
    const message = {
        name: name,
        text: text
    };

    roomArray.push(message);
}

// deletes room if no users are inside
const deleteRoom = (name) => {
    const roomExists = users.find((user) => {
        // for each user, check if a user's room exists
        return user.room === name;
    });

    if (!roomExists) {
        delete messageLog[name];
    }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    // find the user with id = id passed to function

    // return the new user array
    if (index !== -1) {
        return users.splice(index, 1)[0];
        // remove one element from index, returns the spliced user
    }
}

// return the user object with given id
const getUser = (id) => users.find((user) => user.id === id);

// return array of users in the current room
const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
}

const getHistory = (room) => {
    return messageLog[room];
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom, addMessage, deleteRoom, getHistory };