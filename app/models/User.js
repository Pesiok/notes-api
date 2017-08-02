const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

////////////* methods */////////////

// overriding native .toJSON method
// it is called when we respond in express 'res.send()' method
// allows to show only public info
UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    return {
        _id: userObject._id,
        name: userObject.name
    };
};

// generate tokens
// multiple tokens allows to be logged in from multiple devices at once
UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const access = 'auth';
    const token = jwt.sign(
        {_id: user._id.toHexString(), access}, 
        process.env.JWT_SECRET
    ).toString();
    user.tokens.push({access, token});
    await user.save();
    return token;
};

UserSchema.methods.removeToken = async function(token) {
    const user = this;

    return await user.update({
        $pull: { tokens: {token} }
    });
};

////////////* static methods */////////////

UserSchema.statics.findByToken = async function(token) {
    const User = this;
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        throw new Error(error);
    }
    return await User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = async function (name, password) {
    const User = this;
    const user = await User.findOne({ name });

    try {
        bcrypt.compare(password, user.password);
    } catch (error) {
        throw error;
    }
    return user;
};

////////////* middleware */////////////

// hashes password before saving to the DB
UserSchema.pre('save', function(next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;