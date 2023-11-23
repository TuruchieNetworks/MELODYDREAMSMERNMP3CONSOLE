const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


// notice that we're using the SECRET_KEY from our .env filemodule.exports.SECRET_KEY = SECRET_KEY;

// AUTHENTICATE
module.exports.authenticate = (req, res, next) => {
    const token = req.cookies.usertoken;

    if (!token) {
        return res.status(401).json({ verified: false, message: 'No token found' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ verified: false, message: 'Invalid token' });
        } else {
            // If the token is valid, you can access the user ID using payload.id
            req.user._id = payload.id;
            next();
        }
    });
};



