const axios = require('axios')
const rp = require('request-promise');
const fs = require("fs-extra")
const serverService = require('../services/serverService')

const headers = {'API-Key': process.env.VULTR_API_KEY};
const node_ssh = require('node-ssh');
const vpnFilename = 'VPNswitcher.ovpn';

exports.getServerlist = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.vultr.com/v1/server/list', { headers })
        res.status(200).json(Object.values(data))
    } catch (error) {
        res.status(400).text(error)
    }
}

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

exports.getConnectionFile = async (req, res) => {
    console.log(req.params, req.body)
    const { SUBID } = req.params;
    try {
        const { data } = await axios.get(`https://api.vultr.com/v1/server/list?SUBID=${SUBID}`, { headers })
        const { main_ip, default_password } = data;

        const ssh = new node_ssh();

        await ssh.connect({
            host: main_ip,
            username: 'root',
            password: default_password
        })

        const localPath = `${process.cwd()}/${vpnFilename}`;
        await ssh.getFile(localPath, `${vpnFilename}`);

        // const vpnFile = fs.readFileSync(localPath, 'utf8');
        // fs.removeSync(localPath);
        return res.status(200).download(localPath)
    } catch (error) {
        console.log(error)
        if (error.code == 2) {
            return res.status(404).send("No such file")
        }
        return res.status(400).send(error)
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
