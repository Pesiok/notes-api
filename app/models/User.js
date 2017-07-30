import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const UserChema = new mongoose.Schema({
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
        name: userObject.email
    };
};

// generate tokens
// multiple tokens allows to be logged in from multiple devices at once

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens.push({access, token});

    await user.save();
    return token;
};

UserSchema.methods.removeToken = function(token) {
    const user = this;

    return user.update({
        $pull: { tokens: {token} }
    });
};

////////////* static methods */////////////

UserSchema.statics.findByToken = function(token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SALT)
    } catch (error) {
        return Promise.reject(error);
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = async function (email, password) {
    const User = this;
    try {
        const user = await User.findOne({ email });
        await bcrypt.compare(password, user.password, (error, response) => {
            if (response) {
                return user;
            } else {
                throw new Error(error);
            }
        });
    } catch (error) {
        return Promise.reject(error);
    }   
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

export default User;