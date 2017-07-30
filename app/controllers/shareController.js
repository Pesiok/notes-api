// TODO
import { ObjectID } from 'mongodb';
import Note from './models/Note';

const checkAvailability = note => {
    if (!note.share.isShared) return false;
    if (note.share.expiration < Date.now()) return false;
    return true;
}

const shareController = app => {
    // get shared note
    app.get('/share/notes/:id', async (req, res) => {
        try {
            const id = req.params.id;
            if (!ObjectID.isValid(id)) return res.status(404).send();
            const note = await Note.findOne({ _id: id, _author: req.user._id});
            if (!note) return res.status(404).send();
            
            if (checkAvailability(note)) res.send({ note });
            res.status(401).send();
            
        } catch(error) {
            res.status(400).send(error);
        }
    });
}

export default shareController;