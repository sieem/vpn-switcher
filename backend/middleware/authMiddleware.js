const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized request'})
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).json({ error: 'Unauthorized request'})
    }
    const payload = jwt.verify(token, secretKey)
    if (!payload) {
        return res.status(401).json({ error: 'Unauthorized request'})
    }
    next()
}