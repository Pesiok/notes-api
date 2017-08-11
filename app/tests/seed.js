const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const Note = require('./../models/Note');

const usersID = [
    new ObjectID(),
    new ObjectID()
];
const users = [
    {
        _id: usersID[0],
        name: 'kekOne',
        password: 'kekOne123',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: usersID[0], access: 'auth'}, process.env.JWT_SECRET).toString()
        }]
    },
    {
        _id: usersID[1],
        name: 'kekTwo',
        password: 'kekTwo123',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: usersID[1], access: 'auth'}, process.env.JWT_SECRET).toString()
        }]
    }
];

const notes = [
    {
        _id: new ObjectID(),
        _author: usersID[0],
        title: 'Title 1',
        content: 'lorem ipsum', 
        meta: {
            created: Date.now(),
            tags: ['xyz', 'random']
        },
        share: {
            isShared: false
        }
    },
    {
        _id: new ObjectID(),
        _author: usersID[0],
        title: 'Title 2',
        content: 'lorem ipsum two', 
        meta: {
            created: Date.now(),
            tags: ['xyz']
        },
        share: {
            isShared: true
        }
    },
    {
        _id: new ObjectID(),
        _author: usersID[1],
        title: 'Title 3',
        content: 'ipsum lorem', 
        meta: {
            created: Date.now(),
            tags: ['xyz', 'random']
        },
        share: {
            isShared: true
        }
    }
];

const populateUsers = async () => {
    await User.remove({});
    await Promise.all([
        new User(users[0]).save(),
        new User(users[1]).save() 
    ]);
    
}

const populateNotes = async () => {
    await Note.remove({});
    await Note.insertMany(notes);
    
}

module.exports = {
    users,
    populateUsers,
    notes,
    populateNotes
}