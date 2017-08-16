const { ObjectID } = require('mongodb');
const Note = require('./../models/Note');
const authenticate = require('./../middleware/authenticate');

const notesController = app => {

    // create one note
    app.post('/api/notes', authenticate, async (req, res) => {
        try {
            const body = req.body;
            const newNote = new Note({ 
                _author: req.user._id,
                title: body.title, 
                content: body.content, 
                meta: {
                    created: Date.now(),
                    tags: body.meta.tags
                },
                share: {
                    isShared: body.share.isShared,
                    expiration: body.share.expiration
                }
            });
            const note = await newNote.save();
            res.send({ note });
        } catch(error) {
            res.status(400).send(error)
        }
    });

    // get all notes
    app.get('/api/notes', authenticate, async (req, res) => {
        try {
            const notes = await Note.find({ _author: req.user._id});
            if (notes.length === 0) return res.status(404).send();
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
            res.send({ note })
        } catch(error) {
            res.status(400).send(error);
        } 
    });

    // update one note
    app.patch('/api/notes/:id', authenticate, async (req, res) => {
        try {
            const id = req.params.id;
            if (!ObjectID.isValid(id)) return res.status(404).send();
            console.log(req.body);
            const { content, title, share, meta } = req.body;
            console.log(share);
            const body = {};

            // update only params in the request
            if (title) body['title'] = title;
            if (content) body['content'] = content;
            if (share) {
                console.log('called from share');
                body['share.expiration'] = share.expiration;
                body['share.isShared'] = share.isShared;
            }
            if (meta) {
                body['meta.tags'] = meta.tags;
            }
            body['meta.edited'] = Date.now();
            console.log(body);

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

module.exports = notesController;