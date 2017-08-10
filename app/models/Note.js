const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    _author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }, 
    meta: {
        created: {
            type: Date,
            default: Date.now
        },
        edited: {
            type: Date,
            default: null
        },
        tags: [String]
    },
    share: {
        isShared: {
            type: Boolean,
            default: false,
            required: true
        },
        expiration: {
            type: Date
        }
    }
});

// adds creation time if not provided
NoteSchema.pre('save', function(next) {
    const note = this;
    if (!note.meta.created) {
        note.meta.created = Date.now();
    } 
    next();
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;