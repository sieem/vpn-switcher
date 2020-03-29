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

    async shutdownServer() {
        const response = await fetch(`${baseUrl}/api/server`, {
            method: 'delete'
        });
        return await response.json();
    }
} 