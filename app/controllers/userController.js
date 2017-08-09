const { ObjectID } = require('mongodb');
const User = require('./../models/User');
const authenticate = require('./../middleware/authenticate');

const userController = app => {

    // sign in
    app.post('/api/users', async (req, res) => {
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
            res.status(200).send()
        } catch(error) {
            res.status(400).send(error)
        }
    });

    // get user
    app.get('/api/users/me', authenticate, (req, res) => {
        res.send(req.user);
    });

    // find user
    app.get('/api/users/find/:name', async (req, res) => {
        try {
            const name = req.params.name;
            const user = await User.findByCredentials(name);
            if (!user) res.status(404).send();
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send(error)
        }
    });

}

module.exports = userController;