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

    describe('GET /api/share/:id', () => {
        it('should be able to access shared note', async () => {
            const response = await chai.request(app)
                .get(`/api/share/${notes[1]._id}`);
            expect(response).to.have.status(200);

            const note = response.body.note;
            expect(note.content).to.equal(notes[1].content);
            expect(note.share.isShared).to.be.true;
        });

        it('shouldn\'t be able to access not shared note', async () => {
           try {
                const response = await chai.request(app)
                    .get(`/api/share/${notes[0]._id}`);
           } catch ({ response }) {
                expect(response).to.have.status(401);
           }
        });
    });
});