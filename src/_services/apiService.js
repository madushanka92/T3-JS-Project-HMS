import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// User API
const userService = {
    getAllUsers: (roleName) => {
        const url = roleName ? `/users?role=${roleName}` : '/users';
        return api.get(url);
    },
    getUserById: (id) => api.get(`/users/${id}`),
    createUser: (userData) => api.post("/users", userData),
    updateUser: (id, userData) => api.put(`/users/${id}`, userData),
    deleteUser: (id) => api.delete(`/users/${id}`),

    loginUser: (userData) => api.post("/users/login", userData),
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

// Room API
const roomService = {
    getAllRooms: () => api.get('/rooms'),
    getRoomById: (id) => api.get(`/rooms/${id}`),
    createRoom: (roomData) => api.post('/rooms', roomData),
    updateRoom: (id, roomData) => api.put(`/rooms/${id}`, roomData),
    deleteRoom: (id) => api.delete(`/rooms/${id}`),
};

// Admission API
const admissionService = {
    getAllAdmissions: () => api.get("/admissions"),
    getAdmissionById: (id) => api.get(`/admissions/${id}`),
    createAdmission: (admissionData) => api.post("/admissions", admissionData),
    updateAdmission: (id, admissionData) => api.put(`/admissions/${id}`, admissionData),
    deleteAdmission: (id) => api.delete(`/admissions/${id}`),
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
    getByRoleName: (roleName) => api.get(`/feature-mappings/role/` + roleName),
};

const statisticsService = {
    getTotalCounts: () => api.get("/statistics/counts")
}

const doctorAssignmentService = {
    createAssignment: (assignmentData) => api.post("/doctorPatient/assignments", assignmentData),
    getAllAssignments: () => api.get("/doctorPatient/assignments"),
    deleteAssignment: (id) => api.delete(`/doctorPatient/assignments/${id}`),
}

const nurseAssignmentService = {
    createAssignment: (assignmentData) => api.post("/nurseDoctor/assignments", assignmentData),
    getAllAssignments: () => api.get("/nurseDoctor/assignments"),
    deleteAssignment: (id) => api.delete(`/nurseDoctor/assignments/${id}`),
}

const techDepartmentAssignmentService = {
    createAssignment: (assignmentData) => api.post("/technicianDepartment/assignments", assignmentData),
    getAllAssignments: () => api.get("/technicianDepartment/assignments"),
    deleteAssignment: (id) => api.delete(`/technicianDepartment/assignments/${id}`),
}

const techPatientAssignmentService = {
    createAssignment: (assignmentData) => api.post("/technicianPatient/assignments", assignmentData),
    getAllAssignments: () => api.get("/technicianPatient/assignments"),
    deleteAssignment: (id) => api.delete(`/technicianPatient/assignments/${id}`),
}

const appointmentService = {
    createAppointment: (appointment) => api.post("/appointments", appointment),
    getAllAppointments: () => api.get('/appointments'),
    getAppointmentById: (id) => api.get(`/appointments/${id}`),
    updateAppointment: (id, appointment) => api.put(`/appointments/${id}`, appointment),
    deleteAppointment: (id) => api.delete(`/appointments/${id}`),
    updateAppointmentStatus: (id, appointment) => api.put(`/appointments/${id}/status`, appointment),
    getAppointmentsByPatientId: (patiendId) => api.get(`/appointments/patient/${patiendId}`),
    getScheduledAppointmentsByPatient: (patiendId) => api.get(`/appointments/scheduled/${patiendId}`),
}

// Billing Services
const billingService = {
    createBilling: (billData) => api.post("/billings", billData),
    getAllBillings: () => api.get('/billings'),
    getBillingById: (id) => api.get(`/billings/${id}`),
    updateBilling: (id, billData) => api.put(`/billings/${id}`, billData),
    deleteBilling: (id) => api.delete(`/billings/${id}`),
}


// Payments
const paymentService = {
    createPayment: (payment) => api.post("/payments", payment),
    getAllPayments: () => api.get('/payments'),
    getPaymentById: (id) => api.get(`/payments/${id}`),
    getPaymentsByBillId: (billId) => api.get(`/payments/bill/${billId}`),
    getPaymentsByPatientId: (patientId) => api.get(`/payments/patient/${patientId}`),
    updatePaymentStatus: (id, payment) => api.put(`/payments/${id}/status`, payment),
    deletePayment: (id) => api.delete(`/payments/${id}`),
    getPaymentsByStatus: (status) => api.get(`/payments/status/${status}`),
}


export {
    userService,
    roleService,
    departmentService,
    patientService,
    roomService,
    admissionService,
    featureService,
    featureMappingService,
    statisticsService, billingService, appointmentService,
    doctorAssignmentService, nurseAssignmentService, techDepartmentAssignmentService, techPatientAssignmentService, paymentService
};
