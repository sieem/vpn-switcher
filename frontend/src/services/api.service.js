const baseUrl = "http://localhost:3000";
export class ApiService {

    async getServerlist() {
        const response = await fetch(`${baseUrl}/api/servers`);
        return await response.json();
    }

    async startServer() {
        const response = await fetch(`${baseUrl}/api/server`, {
            method: 'post'
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