const axios = require('axios')
const rp = require('request-promise');
const serverService = require('../services/serverService')
const headers = {'API-Key': process.env.VULTR_API_KEY};

exports.createServer = async (req, res) => {
    const { DCID, location } = req.body;
    const { SSHKEYID } = await serverService.getSshkeyList()

    const response = JSON.parse(await rp({
        method: 'POST',
        url: 'https://api.vultr.com/v1/server/create',
        headers,
        formData: {
            DCID,
            SSHKEYID,
            VPSPLANID: 201,
            OSID: 270,
            notify_activate: 'false',
            label: `VPS - ${location}`,
            SCRIPTID: '716260'
        }
    }));

    res.status(200).json(response)
}

exports.deleteServer = async (req, res) => {
    const { SUBID } = req.body;

    try {
        const response = await rp({
            method: 'POST',
            url: 'https://api.vultr.com/v1/server/destroy',
            headers,
            formData: { SUBID }
        });

        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getServerLocations = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.vultr.com/v1/regions/list')
        res.status(200).json(Object.values(data))
    } catch (error) {
        res.status(400).text(error)
    }
}

exports.getServerlist = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.vultr.com/v1/server/list', {headers})
        res.status(200).json(Object.values(data))
    } catch (error) {
        res.status(400).text(error)
    }
    
}