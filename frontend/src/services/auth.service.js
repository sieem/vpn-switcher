export default {
    saveToken(token) {
        localStorage.setItem('token', token)
    },

    getToken() {
        return localStorage.getItem('token')
    },

    loggedIn() {
        return !!localStorage.getItem('token')
    }
} 