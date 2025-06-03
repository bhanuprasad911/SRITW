import axiosInstance from "./axios";

export const login = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response;
};
export const signup = async (data) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response;
};
export const getAllStudents = async () =>{
    const response = await axiosInstance.get("/student/");
    return response;
}