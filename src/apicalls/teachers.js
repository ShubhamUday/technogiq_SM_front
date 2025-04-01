import { axiosInstance } from "./index";

// Get all the teachers added so far
export const getAllTeachers = async () => {
  try {
    const response = await axiosInstance.get("/api/teachers/get-all-teachers");
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Add a single teacher
export const addTeacher = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/teachers/add-teacher", payload);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Get a single teacher by its id
export const getTeacherById = async (id) => {
  try {
    const response = await axiosInstance.post(`/api/teachers/teacher/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

// Update Teacher
export const updateTeacher = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/teachers/update-teacher",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// Delete a teacher
export const deleteTeacher = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/teachers/delete-teacher",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};
