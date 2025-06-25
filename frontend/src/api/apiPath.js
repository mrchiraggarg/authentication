export const CORE_URL = 'http://localhost:5000';

export const API_PATHS = {
    USER: {
        CREATE: `${CORE_URL}/api/user/CreateUser`,
        LOGIN: `${CORE_URL}/api/user/LoginUser`,
        GETALLUSERS: `${CORE_URL}/api/user/GetAllUsers`,
        DELETEUSER: `${CORE_URL}/api/user/DeleteUser`,
        GETUSERBYID: `${CORE_URL}/api/user/GetUserById`,
    }
};