const User = require('./../models/User');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('x-auth');
        const user = await User.findByToken(token);
        if (user) {
            req.user = user;
            req.token = token;
            next();
        } else {
            // no user
            res.status(404).send();
        }
    } catch (error) {
        // no athorization
        res.status(401).send();
    }
};

module.exports = authenticate;