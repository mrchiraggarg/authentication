export const BASE_URL = process.env.BASE_URL || 'http://localhost:' + (process.env.PORT || 5000);

export const API_PATHS = {
    USER: {
        CREATE: `${BASE_URL}/api/user/CreateUser`,
    }
};