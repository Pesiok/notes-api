const Note = require('./../models/Note');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('./../app');
const { users, populateUsers, notes, populateNotes } = require('./seed');
const { ObjectID } = require('mongodb');
const expect = chai.expect;

describe('Share: ', () => {
    beforeEach(populateUsers);
    beforeEach(populateNotes);

    describe('GET /share/notes/:id', () => {
        it('should be abble to access shared note', async () => {
            const response = await chai.request(app)
                .get(`/share/notes/${notes[1]._id}`);
            expect(response).to.have.status(200);

            const note = response.body.note;
            expect(note.content).to.equal(notes[1].content);
            expect(note.share.isShared).to.be.true;
        });
    });
});