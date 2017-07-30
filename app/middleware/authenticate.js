import User from './../models/User';

const authenticate = async (req, res, next) => {
    const token = req.header('x-auth');
    try {
        const user = await User.findByToken(token);
        if (user) {
            req.user = user;
            req.token = token;
            next();
        } else {
            // no user
            return Promise.reject();
        }
    } catch (error) {
        // no athorization
        res.status(401).send();
    }
};

export default authenticate;