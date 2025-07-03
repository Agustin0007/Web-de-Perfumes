const API_URL = import.meta.env.VITE_API_URL || '/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
            errorData?.message || 
            `Error ${response.status}: ${response.statusText}`
        );
    }
    return response.json();
};

export const getAllPerfumes = async () => {
    try {
        const response = await fetch(`${API_URL}/perfumes`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error al obtener los perfumes:', error);
        throw new Error('No se pudieron cargar los perfumes. Por favor, intenta de nuevo más tarde.');
    }
};

export const getPerfumeById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/perfumes/${id}`);
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error al obtener el perfume con ID ${id}:`, error);
        throw new Error('No se pudo cargar el perfume solicitado. Por favor, intenta de nuevo más tarde.');
    }
};

export const createPerfume = async (perfumeData) => {
    try {
        const response = await fetch(`${API_URL}/perfumes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(perfumeData),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error al crear el perfume:', error);
        throw new Error('No se pudo crear el perfume. Por favor, verifica los datos e intenta de nuevo.');
    }
};

export const updatePerfume = async (id, perfumeData) => {
    try {
        const response = await fetch(`${API_URL}/perfumes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(perfumeData),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error al actualizar el perfume con ID ${id}:`, error);
        throw new Error('No se pudo actualizar el perfume. Por favor, verifica los datos e intenta de nuevo.');
    }
};

export const deletePerfume = async (id) => {
    try {
        const response = await fetch(`${API_URL}/perfumes/${id}`, {
            method: 'DELETE',
            headers: {
                ...getAuthHeaders()
            }
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error al eliminar el perfume con ID ${id}:`, error);
        throw new Error('No se pudo eliminar el perfume. Por favor, intenta de nuevo más tarde.');
    }
};

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return handleResponse(response);
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return handleResponse(response);
};

export const getMe = async (token) => {
    const response = await fetch(`${API_URL}/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return handleResponse(response);
};

export const deleteUser = async (token) => {
    const response = await fetch(`${API_URL}/users/me`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return handleResponse(response);
}; 