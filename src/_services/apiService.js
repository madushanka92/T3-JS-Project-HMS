import axios from 'axios';

const API_URL = "http://localhost:3030/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// User API
const userService = {
    getAllUsers: () => api.get("/users"),
    getUserById: (id) => api.get(`/users/${id}`),
    createUser: (userData) => api.post("/users", userData),
    updateUser: (id, userData) => api.put(`/users/${id}`, userData),
    deleteUser: (id) => api.delete(`/users/${id}`),
};

// Role API
const roleService = {
    getAllRoles: () => api.get("/roles"),
    getRoleById: (id) => api.get(`/roles/${id}`),
    createRole: (roleData) => api.post("/roles", roleData),
    updateRole: (id, roleData) => api.put(`/roles/${id}`, roleData),
    deleteRole: (id) => api.delete(`/roles/${id}`),
};

// Department API
const departmentService = {
    getAllDepartments: () => api.get("/departments"),
    getDepartmentById: (id) => api.get(`/departments/${id}`),
    createDepartment: (departmentData) => api.post("/departments", departmentData),
    updateDepartment: (id, departmentData) => api.put(`/departments/${id}`, departmentData),
    deleteDepartment: (id) => api.delete(`/departments/${id}`),
};

export { userService, roleService, departmentService };
