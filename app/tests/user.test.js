const User = require('./../models/User');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('./../app');
const { users, populateUsers, notes, populateNotes } = require('./seed');
const { ObjectID } = require('mongodb');
const expect = chai.expect;

describe('User: ', () => {
    beforeEach(populateUsers);
    beforeEach(populateNotes);

    describe('GET /api/users/me', () => {
        it('should return authenticated user with only id and name', async () => {
            const response = await chai.request(app)
                .get('/api/users/me')
                .set('x-auth', users[0].tokens[0].token);
            expect(response).to.have.status(200);

            const user = response.body;
            expect(user._id).to.equal(users[0]._id.toHexString());
            expect(user.name).to.equal(users[0].name);
            expect(user.tokens).to.be.undefined;
            expect(user.password).to.be.undefined;
        });

        it('should return 401 if request is not authenticated', async () => {
            try {
                const response = await chai.request(app)
                    .get('/api/users/me')
                    .set('x-auth', users[0].tokens[0].token);
            } catch ({ response }) {
                expect(response).to.have.status(401);
            }
        });
    });

    describe('GET /api/users/find/:name', () => {
        it('should return a user if found', async () => {
            const response = await chai.request(app)
                .get(`/api/users/find/${users[0].name}`);
            expect(response).to.have.status(200);

            const user = response.body;
            expect(user._id).to.equal(users[0]._id.toHexString());
            expect(user.name).to.equal(users[0].name);
        });

        it('shouldn\'t return a user if not found', async () => {
            try {
                const response = await chai.request(app)
                    .get('/api/users/find/randomlogin123');
            } catch({ response }) {
                expect(response).to.have.status(404);
            }
        });
    });

    describe('POST /api/users', () => {
        it('should create a new user and put it to the DB', async () => {
            const name = 'superNewUser';
            const password = 'typicalpassword123';

            const response = await chai.request(app)
                .post('/api/users/signin')
                .send({ name, password });
            expect(response).to.have.status(200);
            expect(response.headers).to.have.property('x-auth');

            const user = response.body;
            expect(user).to.have.property('_id');
            expect(user.name).to.equal(name);

            const dbUser = await User.findOne({ name });
            expect(dbUser).to.be.a('object');
            expect(dbUser.password).to.not.equal(password);
        });

        it('should return validation error if request is invalid', async () => {
            const name = 'superNewUserTwo';
            try {
                const response = chai.request(app)
                    .post('/api/users/signin')
                    .send({ name });
            } catch({ response }) {
                expect(response).to.have.status(400);
            }
        });

        it('should not create a new user when username is already used', async () => {
            const name = users[0].name;
            const password = 'kekeekek';
            try {
                const response = chai.request(app)
                    .post('/api/users/signin')
                    .send({ name, password });
            } catch({ response }) {
                expect(response).to.have.status(400);
            }
        });
    });

    describe('POST /api/users/login', () => {
        it('should login user and return token', async () => {
            const response = await chai.request(app)
                .post('/api/users/login')
                .send({
                    name: users[0].name,
                    password: users[0].password
                });
            expect(response).to.have.status(200);
            expect(response.headers).to.have.property('x-auth');

            const dbUser = await User.findById(users[0]._id);
            expect(dbUser.tokens[1]).to.include({
                access: 'auth',
                token: response.headers['x-auth']
            });
        });

        it('should reject invalid name', async () => {
            try {
                const response = await chai.request(app)
                    .post('/api/users/login')
                    .send({
                        name: 'random',
                        password: users[0].password
                    });
            } catch ({ response }) {
                expect(response).to.have.status(400);

                const dbUser = await User.findById(users[0]._id);
                expect(dbUser.tokens.length).to.equal(1);
            }
        });

        it('should reject invalid password', async () => {
            try {
                const response = await chai.request(app)
                    .post('/api/users/login')
                    .send({
                        name: users[1].name,
                        password: users[1].password + 'kek'
                    });
            } catch ({ response }) {
                expect(response).to.have.status(400);

                const dbUser = await User.findById(users[1]._id);
                expect(dbUser.tokens.length).to.equal(1);
            }
        });
    });

    describe('DELETE /api/users/logout', () => {
        it('should remove a token on logout', async () => {
            const response = await chai.request(app)
                .delete('/api/users/logout')
                .set('x-auth', users[0].tokens[0].token);
            expect(response).to.have.status(200);

            const dbUser = await User.findById(users[0]._id);
            expect(dbUser.tokens.length).to.equal(0);
        });

        it('shouldn\'t remove a token of another user', async () => {
            const response = await chai.request(app)
                .delete('/api/users/logout')
                .set('x-auth', users[0].tokens[0].token);
            expect(response).to.have.status(200);

            const dbUser = await User.findById(users[1]._id);
            expect(dbUser.tokens.length).to.equal(1);
        });
    });
});