import axios from "axios";

const API_URL = "http://localhost:8822/api/applications";

export const getAllApplications = () => {
    return axios.get(`${API_URL}/getall`);
};

export const getApplicationById = (id) => {
    return axios.get(`${API_URL}/getbyid/${id}`);
};

export const addApplication = (application) => {
    return axios.post(`${API_URL}/add`, application);
};

export const updateApplication = (id, application) => {
    return axios.put(`${API_URL}/update/${id}`, application);
};

export const deleteApplication = (id) => {
    return axios.delete(`${API_URL}/delete/${id}`);
};

export const getApplicationsByStatus = (status) => {
    return axios.get(`${API_URL}/status/${status}`);
};

export const getApplicationsByCompany = (name) => {
    return axios.get(`${API_URL}/company`, {
        params: {
            name: name
        }
    });
};

export const getApplicationsByJobRole = (role) => {
    return axios.get(`${API_URL}/jobrole`, {
        params: {
            role: role
        }
    });
};

export const getApplicationsByDateRange = (startDate, endDate) => {
    return axios.get(`${API_URL}/date-range`, {
        params: {
            startDate: startDate,
            endDate: endDate
        }
    });
};