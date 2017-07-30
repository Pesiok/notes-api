import { ObjectID } from 'mongodb';
import Note from './models/Note';
import authenticate from './../middleware/authenticate';

const notesController = app => {

    // create one note
    app.post('/api/notes', authenticate, async (req, res) => {
        try {
            const body = req.body;
            const note = new Note({ 
                _author: req.user._id, 
                content: body.content, 
                meta: {
                    created: body.meta.created,
                    tags: body.meta.tags
                },
                share: {
                    isShared: body.meta.isShared,
                    expiration: body.meta.expiration
                }
            });
            const doc = await note.save();
            res.send(doc);
        } catch(error) {
            res.status(400).send(error)
        }
    });

    // get all notes
    app.get('/api/notes', authenticate, async (req, res) => {
        try {
            const notes = await Note.find({ _author: req.user._id});
            res.send({ notes });
        } catch(error) {
            res.status(400).send(error);
        }
    });

    // get one note
    app.get('/api/notes/:id', authenticate, async (req, res) => {
        try {
            const id = req.params.id;
            if (!ObjectID.isValid(id)) return res.status(404).send();
            const note = await Note.findOne({ _id: id, _author: req.user._id});
            if (!note) return res.status(404).send();
            res.send({ note });
        } catch(error) {
            res.status(400).send(error);
        }
    });

    // delete one note
    app.delete('/api/notes/:id', authenticate, async (req, res) => {
        try {
            const id = req.params.id;
            if (!ObjectID.isValid(id)) return res.status(404).send();  
            const note = await Note.findOneAndRemove({_id: id, _author: req.user._id});
            if (!note) return res.status(404).send();
            res.send({note})
        } catch(error) {
            res.status(400).send(error);
        } 
    });

    // update one note
    app.patch('/api/notes/:id', authenticate, async (req, res) => {
        try {
            const id = req.params.id;
            if (!ObjectID.isValid(id)) return res.status(404).send();
            const {content, meta, share} = req.body;
            const body = {content, meta, share};
            const note = await Note.findOneAndUpdate(
                { _id: id, _author: req.user._id },
                { $set: body },
                { new: true }
            )
            if (!note) return res.status(404).send();
            res.send({ note });
        } catch (error) {
            res.status(400).send(error);
        }
    });
}

export default notesController;