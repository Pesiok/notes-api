const { ObjectID } = require('mongodb');
const Note = require('./../models/Note');

const checkAvailability = note => {
    if (!note.share.isShared) return false;
    if (note.share.expiration && note.share.expiration < Date.now()) return false;

    return true;
}

const shareController = app => {

    // get shared note
    app.get('/api/share/:id', async (req, res) => {
        try {
            const id = req.params.id;
            if (!ObjectID.isValid(id)) return res.status(404).send();
            const note = await Note.findOne({ _id: id });
            if (!note) return res.status(404).send();
            if (checkAvailability(note)) res.send({ note });
            res.status(401).send();
        } catch(error) {
            res.status(400).send(error);
        }
    });
}

module.exports = shareController;