const { ObjectID } = require('mongodb');
const User = require('./../models/User');
const authenticate = require('./../middleware/authenticate');

const userController = app => {

    // sign in
    app.post('/api/users/signin', async (req, res) => {
        try {
            const {name, password} = req.body;
            const user = new User({name, password});
            await user.save();
            const token = await user.generateAuthToken();
            res.header('x-auth', token).send(user);
        } catch(error) {
            res.status(400).send(error)
        }
    });

    // log in
    app.post('/api/users/login', async (req, res) => {
        try {
            const {name, password} = req.body;
            const user = await User.findByCredentials(name, password);
            const token = await user.generateAuthToken();
            res.header('x-auth', token).send(user)
        } catch(error) {
            res.status(400).send(error)
        }
    });

    // log out
    app.delete('/api/users/logout', authenticate, async (req, res) => {
        try {
            await req.user.removeToken(req.token);
            res.status(200).send();
        } catch(error) {
            res.status(400).send(error)
        }
    });

    // get user
    app.get('/api/users/me', authenticate, (req, res) => {
        res.send(req.user);
    });

    // find user by name
    app.get('/api/users/find/:name', async (req, res) => {
        try {
            const name = req.params.name;
            const user = await User.findOne({ name });
            if (!user) return res.status(404).send();
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send(error)
        }
    });

    // find user by id 
    app.get('/api/users/find/id/:id', async (req, res) => {
        const id = req.params.id;
        if (!ObjectID.isValid(id)) return res.status(404).send();

        try {
            const user = await User.findOne({ _id: id });
            if (!user) return res.status(404).send();
            
            res.send(user);
        } catch(error) {
            res.status(400).send(error);
        }
    })
}

module.exports = userController;