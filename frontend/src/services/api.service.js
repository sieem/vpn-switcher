const baseUrl = "http://localhost:3000";
export class ApiService {

    async getServerlist() {
        const response = await fetch(`${baseUrl}/api/servers`);
        return await response.json();
    }

    async startServer(data) {
        const response = await fetch(`${baseUrl}/api/server`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async deleteServer(data) {
        const response = await fetch(`${baseUrl}/api/server`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async getServerLocations() {
        const response = await fetch(`${baseUrl}/api/locations`);
        return await response.json();
    }
} 