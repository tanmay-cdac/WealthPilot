import axios from "axios";

const API_URL = "http://localhost:8081/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const getAllUsers = () => api.get("/auth/users");

export const createSector = (data) => api.post("/sectors", data);
export const getAllSectors = () => api.get("/sectors");
export const getSectorById = (id) => api.get(`/sectors/${id}`);
export const updateSector = (id, data) => api.put(`/sectors/${id}`, data);
export const deleteSector = (id) => api.delete(`/sectors/${id}`);

export const getAllCompanies = () => api.get("/companies");
export const getCOmpanyById = (id) => api.get(`/companies/${id}`);
export const createCompany = (data) => api.post("/companies", data);
export const updateCompany = (id, data) => api.put(`/companies/${id}`, data);
export const deleteCompany = (id) => api.delete(`/companies/${id}`);

export const createAdvisoryRequest = (data) => api.post("/advisory-requests", data);
export const getMyRequests = () => api.get("/advisory-requests/my");
export const getAssignedRequests = () => api.get("/advisory-requests/assigned");
export const getPendingRequests = () => api.get("/advisory-requests/assigned");
export const getAllRequests = () => api.get("/advisory-requests");
export const assignAdvisor = (requestId, advisorId) => api.post(`/advisory-requests/${requestId}/assign/${advisorId}`);
export const approveRequest = (requestId) => api.post(`/advisory-requests/${requestId}/approve`);
export const declineRequest = (requestId) => api.post(`/advisory-requests/${requestId}/decline`);

export const createRecommendation = (data) => api.post("/recommendations", data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getRecommendationsByRequest = (requestId) => api.get(`/recommendations/request/${requestId}`);

export const createMeeting = (requestId, data) => api.post(`/meetings/request/${requestId}`, data);
export const getMeetingsByAdvisor = (advisorId) => api.get(`/meetings/advisor/${advisorId}`);
export const getMeetingsByInvestor = (investorId) => api.get(`/meetings/investor/${investorId}`);
export const updateMeetingStatus = (meetingId, status) => api.put(`/meetings/${meetingId}/status?status=${status}`);
export const updateInvestmentDecision = (meetingId, decision) => api.put(`/meetings/${meetingId}/decision?decision=${decision}`);

export default api;
