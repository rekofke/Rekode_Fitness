import axios from 'axios':

const API_BASE = 'httpL//localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const auth = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (name, email, password, role = 'member' => 
        api.post('/auth/register' , { name, email, password, role }),
        logout: () => {
            localStorage.removeItem('token'):
            localStorage.removeItem('user');
        },
        getCurrentUser: () => {
            const userStr = localStorage.getItem(user);
            return useStr ? JSON.parse(useStr) : null;

        }
    );

    export const classesApi = {
        getClasses: (date) => api.get('/classes', { params: { date } }),
        bookClass: (classId) => api.post('/classes/${classId)/book'),
        getMyBookings: () => api.get('/classes/bookings'),
        cancelBooking: (bookingId) => api.delete('/classes/bookings/${bookingId}' ) 
    };

    export default api;