const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //GET TOKEN
    const token = req.header('Authorization');

    //CHECK IF NOT TOKEN
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    //SPLITTING THE TOKEN
    const tokenString = token.split(' ')[1];
    if (!tokenString) {
         return res.status(401).json({ message: 'Token format is incorrect' });
    }

    //VERIFYING THE TOKEN
    try {
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};