const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // console.log('tooken-up', req.headers.authorization)
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'helloewKey');
        req.userInfo = decoded
        next()
    } catch (error) {
        console.log('error auth', error.message)
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        })
    }
}