import auth from './auth.service';

const baseUrl = "http://localhost:3000";
const authHeaders = auth.loggedIn() ? { Authorization: 'bearer ' + auth.getToken() } : {}
export default {

    async login(data) {
        const response = await fetch(`${baseUrl}/api/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw await response.json()
        }
        return await response.json();
    },

    async getServerlist() {
        const response = await fetch(`${baseUrl}/api/servers`, {headers: authHeaders});
        return await response.json();
    },

    async startServer(data) {
        const response = await fetch(`${baseUrl}/api/server`, {
            method: 'post',
            headers: {...authHeaders, 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        return await response.json();
    },

    async deleteServer(data) {
        const response = await fetch(`${baseUrl}/api/server`, {
            method: 'delete',
            headers: { ...authHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    },

    async getServerLocations() {
        const response = await fetch(`${baseUrl}/api/locations`);
        return await response.json();
    },

    async getConnectionFile(data) {
        const response = await fetch(`${baseUrl}/api/server/connection-file/${data.SUBID}`, {headers: authHeaders});
        if (response.status === 404) {
            throw await 'File not found'
        }
        return await response.blob();
    }
}