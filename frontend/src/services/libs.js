import axiosInstance from "./axios";

export const login = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response;
};
export const signup = async (data) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response;
};
export const getAllStudents = async () => {
  const response = await axiosInstance.get("/student");
  return response;
};
export const getAuthUser = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response;
};
export const logout = async () => {
  const response = await axiosInstance.get("/auth/logout");
  return response;
};
export const addMarks = async (data) => {
  const response = await axiosInstance.post("/marks/add", data);
  return response;
};
export const getStudentMarks = async (id) => {
  const response = await axiosInstance.get(`/marks/${id}`);
  return response;
};
export const getStudentDetails = async (id) => {
  const response = await axiosInstance.get(`/student/${id}`);
  return response;
};
