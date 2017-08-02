const Note = require('./../models/Note');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('./../app');
const { users, populateUsers, notes, populateNotes } = require('./seed');
const { ObjectID } = require('mongodb');
const expect = chai.expect;

chai.use(chaiHTTP);

const noteEquals = (oldNote, newNote) => {
    expect(newNote).to.be.a('object');
    expect(newNote.meta).to.have.property('created');
    expect(newNote.content).to.equal(oldNote.content);
    expect(newNote.meta.tags[0]).to.equal(oldNote.meta.tags[0]);
    expect(newNote.share.isShared).to.equal(oldNote.share.isShared);
}

describe('Notes: ', () => {
    beforeEach(populateUsers);
    beforeEach(populateNotes);

    describe('POST /api/notes', () => {
        it('should create a new note and put it to the DB', async () => {
            const note = {
                content: 'a new note', 
                meta: {
                    // created: Date.now(),
                    // edited: Date.now(),
                    tags: ['kek']
                },
                share: {
                    isShared: false,
                    // expiration: some date
                }
            };

            const response = await chai.request(app)
                .post('/api/notes')
                .set('x-auth', users[0].tokens[0].token)
                .send(note);
            expect(response).to.have.status(200);

            const resNote = response.body.note;
            noteEquals(note, resNote);
            
            const dbNotes = await Note.find({content: note.content});
            expect(dbNotes.length).to.equal(1);
            noteEquals(note, dbNotes[0])

        });

        it('shouldn\'t create a note with lack of data', async () => {
            try {
                const response = await chai.request(app)
                    .post('/api/notes')
                    .set('x-auth', users[0].tokens[0].token)
                    .send({});
            } catch({ response }) {
                 expect(response).to.have.status(400);
            }
            const dbNotes = await Note.find({});
            expect(dbNotes.length).to.equal(3);
        });

        it('shouldn\'t create a note with invalid data', async () => {
            const note = {
                content: 'a new note', 
                meta: {
                    tags: ['kek']
                }
            };
            try {
                const response = await chai.request(app)
                    .post('/api/notes')
                    .set('x-auth', users[0].tokens[0].token)
                    .send(note);
            } catch ({ response }) {
                expect(response).to.have.status(400);
            }
            const dbNotes = await Note.find({});
            expect(dbNotes.length).to.equal(3);
        });
    });

    describe('GET /api/notes', () => {
        it('should get all notes', async () => {
            const response = await chai.request(app)
                .get('/api/notes')
                .set('x-auth', users[0].tokens[0].token);
            expect(response.body.notes.length).to.equal(2);
        });
    });

    describe('GET /api/notes/:id', () => {
       it('should return a specific note', async () => {
            const response = await chai.request(app)
                .get(`/api/notes/${notes[0]._id.toHexString()}`)
                .set('x-auth', users[0].tokens[0].token);
            expect(response).to.have.status(200);

            noteEquals(notes[0], response.body.note);
       });

       it('should not return a note created by someone else', async () => {
            try {
                const response = await chai.request(app)
                    .get(`/api/notes/${notes[0]._id.toHexString()}`)
                    .set('x-auth', users[1].tokens[0].token);
            } catch ({ response }) {
                expect(response).to.have.status(404);
            }
       });

       it('should return 404 when a note is not found', async () => {
            try {
                const response = await chai.request(app)
                    .get(`/api/notes/${new ObjectID().toHexString()}`)
                    .set('x-auth', users[0].tokens[0].token);
            } catch ({ response }) {
                expect(response).to.have.status(404);
            }
       });

       it('should return 404 for non ObjectID ids', async () => {
            try {
                const response = await chai.request(app)
                    .get(`/api/notes/34v34qvtv33`)
                    .set('x-auth', users[0].tokens[0].token);
            } catch ({ response }) {
                expect(response).to.have.status(404);
            }
       });
    });

    describe('DELETE /api/notes/:id', () => {
        it('should remove a note', async () => {
            const id = notes[0]._id.toHexString();
            const response = await chai.request(app)
                .delete(`/api/notes/${id}`)
                .set('x-auth', users[0].tokens[0].token);
            
            expect(response).to.have.status(200);

            const note = await Note.findById(id);
            expect(note).to.be.null;
        });

        it('shouldn\'t remove a note created by someone else', async () => {
            const id = notes[0]._id.toHexString();
            try {
                const response = await chai.request(app)
                    .delete(`/api/notes/${id}`)
                    .set('x-auth', users[1].tokens[0].token);
            } catch({ response }) {
                expect(response).to.have.status(404);
            }
            const note = await Note.findById(id);
            expect(note).to.exist;
        });

        it('should return 404 when a note is note found', async () => {
            const id = new ObjectID().toHexString();
            try {
                const response = await chai.request(app)
                    .delete(`/api/notes/${id}`)
                    .set('x-auth', users[1].tokens[0].token);
            } catch({ response }) {
                expect(response).to.have.status(404);
            }
        });

        it('should return 404 for non ObjectID ids', async () => {
            try {
                const response = await chai.request(app)
                    .delete(`/api/notes/eqweqweqwe333332`)
                    .set('x-auth', users[1].tokens[0].token);
            } catch({ response }) {
                expect(response).to.have.status(404);
            }
        });

    });

    describe('PATCH ./api/notes/:id', () => {
        const updatedNote = { 
            content: 'new content', 
            share: { 
                isShared: true 
            } 
        }

        it('should update the note', async () => {
            const id = notes[0]._id.toHexString();
            const response = await chai.request(app)
                .patch(`/api/notes/${id}`)
                .set('x-auth', users[0].tokens[0].token)
                .send(updatedNote);
            expect(response).to.have.status(200);

            const note = response.body.note;
            expect(note.meta).to.have.property('edited');
            expect(note.share.isShared).to.be.true;
            expect(note.content).to.equal(updatedNote.content);
        });

        it('should not update note created by someone else', async () => {
            const id = notes[0]._id.toHexString();
            try {
                const response = await chai.request(app)
                    .patch(`/api/notes/${id}`)
                    .set('x-auth', users[1].tokens[0].token)
                    .send(updatedNote)
            } catch({ response }) {
                expect(response).to.have.status(404);
            }
        });

    });

});