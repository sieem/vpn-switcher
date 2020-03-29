const axios = require('axios')
const headers = { 'API-Key': process.env.VULTR_API_KEY }

exports.getSshkeyList = async () => {
    try {
        const { data } = await axios.get('https://api.vultr.com/v1/sshkey/list', {headers})
        return Object.values(data)[0];
    } catch (error) {
        throw error
    }
}