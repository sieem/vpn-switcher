import { getToken, loggedIn } from './auth.service';

const baseUrl = globalThis.isProduction ? '' : 'http://localhost:3000/';

let authHeaders = {};

loggedIn.subscribe(_loggedIn => {
    authHeaders = _loggedIn ? { Authorization: 'bearer ' + getToken() } : {}
});

export default {

    async login(data) {
        const response = await fetch(`${baseUrl}api/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw await response.json()
        }
        return await response.json();
    },

    async getServerList() {
        const response = await fetch(`${baseUrl}api/servers`, {headers: authHeaders});
        return await response.json();
    },

    async startServer(data) {
        const response = await fetch(`${baseUrl}api/server`, {
            method: 'post',
            headers: {...authHeaders, 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        return await response.json();
    },

    async deleteServer(data) {
        const response = await fetch(`${baseUrl}api/server`, {
            method: 'delete',
            headers: { ...authHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    },

    async getServerLocations() {
        const response = await fetch(`${baseUrl}api/locations`);
        return await response.json();
    },

    async getConnectionFile(data) {
        const response = await fetch(`${baseUrl}api/server/connection-file/${data.SUBID}`, {headers: authHeaders});
        if (response.status !== 200) {
            throw 'OpenVPN file not found yet, server is still building'
        }
        return await response.blob();
    }
}