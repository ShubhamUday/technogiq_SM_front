import { axiosInstance } from "./index";

export const RegisterAdmin = async (value) => {
  try {
    const response = await axiosInstance.post("api/admins/register", value);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const SigninAdmin = async (value) => {
  try {
    const response = await axiosInstance.post("api/admins/signin", value);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentAdmin = async () => {
  try {
    const response = await axiosInstance.get("api/admins/get-current-admin", {
      headers:{ Authorization:`Bearer ${localStorage.getItem('token')}`}
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdmin = async ()=>{
  try {
    const response = await axiosInstance.get('api/admins/get-all-admins')
    return response.data
  } catch (error) {
    console.log(error)
  }
}