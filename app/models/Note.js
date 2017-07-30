import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    _author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    }, 
    meta: {
        created: {
            type: Date,
            default: Date.now,
            required: true
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
            default: false
        },
        expiration: {
            type: Date
        }
    }
});

const User = mongoose.model('Note', NoteSchema);

export default User;