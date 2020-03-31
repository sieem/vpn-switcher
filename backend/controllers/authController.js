const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

exports.login = (req, res) => {
    bcrypt.compare(req.body.password, process.env.PASSWORD, (err, compareValid) => {
        if (err) {
            console.error(err)
            return res.status(400).json(err.message)
        }
        if (!compareValid) {
            return res.status(401).json({error: 'Invalid Password'})
        } else {
            const payload = 'dit is random payload'
            const token = jwt.sign(payload, secretKey)
            return res.status(200).json({ token })
        }
    });
}