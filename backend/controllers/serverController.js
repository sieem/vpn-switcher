const serverService = require('../services/serverService')
const axios = require('axios')
const headers = {
    'API-Key': process.env.VULTR_API_KEY,
};

exports.startServer = async (req, res) => {
    console.log(req.body)
    res.status(200).json("")
}

exports.shutdownServer = async (req, res) => {
    console.log(req.body)
    res.status(200).json("")
}

exports.getServerlist = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.vultr.com/v1/server/list', {headers})
        res.status(200).json(Object.values(data))
    } catch (error) {
        res.status(400).text(error)
    }
    
}