import { axiosInstance } from "./index";

// Get all the notices added so far
export const getAllNotices = async () => {
  try {
    const response = await axiosInstance.get("/api/notices/get-all-notices");
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Add a single notice
export const addNotice = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/notices/add-notice",
      payload
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Get a single notice by its id
export const getNoticeById = async (id) => {
  try {
    const response = await axiosInstance.post(`/api/notices/notice/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

// Update notice
export const updateNotice = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/notices/update-notice",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// Delete a notice
export const deleteNotice = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/notices/delete-notice",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};
