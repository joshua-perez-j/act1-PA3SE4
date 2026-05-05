const API_URL = "http://127.0.0.1:8000";

export const authService = {
    async login(nombre, contrasena) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, contrasena })
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || "FALLO DE AUTENTICACIÓN");
        }
        return response.json();
    },

    async register(nombre, contrasena) {
        const response = await fetch(`${API_URL}/createUser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, contrasena })
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || "ERROR EN REGISTRO");
        }
        return response.json();
    }
};