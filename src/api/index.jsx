import axios from 'axios';

const API_URL = import.meta.env.VITE_BACK_URI;

// Configure axios to send cookies with every request
axios.defaults.withCredentials = true;

// --- Public API calls ---
export const getPublicBanner = async () => {
    try {
        const response = await axios.get(`${API_URL}/public/banner`);
        return response.data;
    } catch (error) {
        console.error('Error fetching public banner:', error);
        throw error;
    }
};

export const getPublicBlocks = async () => {
    try {
        const response = await axios.get(`${API_URL}/public/blocks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching public blocks:', error);
        throw error;
    }
};

export const getPublicAbout = async () => {
    try {
        const response = await axios.get(`${API_URL}/public/about`);
        return response.data;
    } catch (error) {
        console.error('Error fetching public about page:', error);
        throw error;
    }
};

export const getPublicBlockById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/public/blocks/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching block:', error);
        throw new Error('Failed to load article');
    }
};

// --- Admin Auth API calls ---
export const adminLogin = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/admin/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Error during admin login:', error);
        throw error;
    }
};

export const adminLogout = async () => {
    try {
        const response = await axios.post(`${API_URL}/admin/logout`);
        return response.data;
    } catch (error) {
        console.error('Error during admin logout:', error);
        throw error;
    }
};

export const checkAdminAuth = async () => {
    try {
        const res = await axios.get(`${API_URL}/admin/auth/check`);
        return res.data?.isAuthenticated === true;
    } catch (error) {
        console.error('Auth check failed:', error.response?.status, error.message);
        return false;
    }
};

// --- Banner Management ---
export const getAdminBanner = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/banner`);
        return response.data;
    } catch (error) {
        console.error('Error fetching admin banner:', error);
        throw error;
    }
};

export const addBannerImage = async (imageUrl) => {
    try {
        const response = await axios.post(`${API_URL}/admin/banner`, { imageUrl });
        return response.data;
    } catch (error) {
        console.error('Error adding banner image:', error);
        throw error;
    }
};

export const deleteBannerImage = async (imageId) => {
    try {
        const response = await axios.delete(`${API_URL}/admin/banner/${imageId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting banner image:', error);
        throw error;
    }
};

// --- Blocks Management ---
export const getAdminBlocks = async () => {
    try {
        // If you have a protected admin endpoint, use it:
        // const response = await axios.get(`${API_URL}/admin/blocks`);
        // If not, fallback to public:
        const response = await axios.get(`${API_URL}/public/blocks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching admin blocks list:', error);
        throw error;
    }
};

export const getAdminBlockById = async (blockId) => {
    try {
        const response = await axios.get(`${API_URL}/admin/blocks/${blockId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching admin block by ID:', error);
        throw error;
    }
};

export const addContentBlock = async (blockData) => {
    try {
        const response = await axios.post(`${API_URL}/admin/blocks`, blockData);
        return response.data;
    } catch (error) {
        console.error('Error adding content block:', error);
        throw error;
    }
};

export const updateContentBlock = async (blockId, blockData) => {
    try {
        const response = await axios.put(`${API_URL}/admin/blocks/${blockId}`, blockData);
        return response.data;
    } catch (error) {
        console.error('Error updating content block:', error);
        throw error;
    }
};

export const deleteContentBlock = async (blockId) => {
    try {
        const response = await axios.delete(`${API_URL}/admin/blocks/${blockId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting content block:', error);
        throw error;
    }
};

// --- About Page API calls ---
export const getAdminAbout = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/about`);
        return response.data;
    } catch (error) {
        console.error('Error fetching admin about page:', error);
        throw error;
    }
};

export const updateAdminAbout = async (aboutData) => {
    try {
        const response = await axios.put(`${API_URL}/admin/about`, aboutData);
        return response.data;
    } catch (error) {
        console.error('Error updating admin about page:', error);
        throw error;
    }
};