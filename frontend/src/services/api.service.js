const baseUrl = "http://localhost:3000";
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
        const response = await fetch(`${baseUrl}/api/servers`);
        return await response.json();
    },

    async startServer(data) {
        const response = await fetch(`${baseUrl}/api/server`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        return await response.json();
    },

    async deleteServer(data) {
        const response = await fetch(`${baseUrl}/api/server`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    },

    async getServerLocations() {
        const response = await fetch(`${baseUrl}/api/locations`);
        return await response.json();
    },

    async getConnectionFile(data) {
        const response = await fetch(`${baseUrl}/api/server/connection-file/${data.SUBID}`);
        if (response.status === 404) {
            throw await 'File not found'
        }
        return await response.blob();
    }
}