const serverService = require('../services/serverService')

exports.startServer = (req, res) => {
    console.log(req.body)
    res.status(200).json("")
}

exports.shutdownServer = (req, res) => {
    console.log(req.body)
    res.status(200).json("")
}

exports.getServerlist = (req, res) => {
    res.status(200).json([
        {
            id:1
        },
        {
            id:2
        }
    ])
}