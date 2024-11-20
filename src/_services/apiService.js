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

// Patient API
const patientService = {
    getAllPatients: (pageNumber, pageSize, search) => api.get(`/patients?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`),
    getPatientById: (id) => api.get(`/patients/${id}`),
    createPatient: (patientData) => api.post('/patients', patientData),
    updatePatient: (id, patientData) => api.put(`/patients/${id}`, patientData),
    deletePatient: (id) => api.delete(`/patients/${id}`),
};

const roomService = {
    getAllRooms: () => api.get('/rooms'),
    getRoomById: (id) => api.get(`/rooms/${id}`),
    createRoom: (roomData) => api.post('/rooms', roomData),
    updateRoom: (id, roomData) => api.put(`/rooms/${id}`, roomData),
    deleteRoom: (id) => api.delete(`/rooms/${id}`),
};

// Feature API
const featureService = {
    getAllFeatures: () => api.get("/features"),
    getFeatureById: (id) => api.get(`/features/${id}`),
    createFeature: (featureData) => api.post("/features", featureData),
    updateFeature: (id, featureData) => api.put(`/features/${id}`, featureData),
    deleteFeature: (id) => api.delete(`/features/${id}`),
};

// FeatureMapping API
const featureMappingService = {
    getAllMappings: () => api.get("/featureMappings"),
    getMappingById: (id) => api.get(`/featureMappings/${id}`),
    createMapping: (mappingData) => api.post("/featureMappings", mappingData),
    updateMapping: (id, mappingData) => api.put(`/featureMappings/${id}`, mappingData),
    deleteMapping: (id) => api.delete(`/featureMappings/${id}`),
};

export {
    userService, roleService, departmentService, patientService, roomService,
    featureService,
    featureMappingService,
};
