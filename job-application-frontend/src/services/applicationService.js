
import axios from "axios";

const API_URL = "https://job-application-tracker-pk9h.onrender.com/api/applications";

// GET all applications
export const getAllApplications = () => {
    return axios.get(`${API_URL}/getall`);
};

// GET application by ID
export const getApplicationById = (id) => {
    return axios.get(`${API_URL}/getbyid/${id}`);
};

// ADD application
export const addApplication = (application) => {
    return axios.post(`${API_URL}/add`, application);
};

// UPDATE application
export const updateApplication = (id, application) => {
    return axios.put(`${API_URL}/update/${id}`, application);
};

// DELETE application
export const deleteApplication = (id) => {
    return axios.delete(`${API_URL}/delete/${id}`);
};

// GET by status
export const getApplicationsByStatus = (status) => {
    return axios.get(`${API_URL}/status/${status}`);
};

// SEARCH by company
export const getApplicationsByCompany = (name) => {
    return axios.get(`${API_URL}/company`, {
        params: { name }
    });
};

// SEARCH by job role
export const getApplicationsByJobRole = (role) => {
    return axios.get(`${API_URL}/jobrole`, {
        params: { role }
    });
};

// GET by date range
export const getApplicationsByDateRange = (startDate, endDate) => {
    return axios.get(`${API_URL}/date-range`, {
        params: { startDate, endDate }
    });
};
