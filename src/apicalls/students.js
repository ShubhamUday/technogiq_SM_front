import { axiosInstance } from "./index";

// Get all the students added so far
export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get("/api/students/get-all-students");
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Add a single student
export const addStudent = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/students/add-student",
      payload
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

// Get a single student by its id
export const getStudentById = async (id) => {
  try {
    const response = await axiosInstance.post(`/api/students/student/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

// Update student
export const updateStudent = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/students/update-student",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// Delete a student
export const deleteStudent = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/students/delete-student",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getAllStudentsByClass = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/students/get-all-students-by-class",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const SigninStudent = async (payload) => {
  try {
    const response = await axiosInstance.post("api/students/signin", payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const getCurrentStudent = async () => {
  try {

    const response = await axiosInstance.get("api/students/get-current-student", {
      headers:{ Authorization:`Bearer ${localStorage.getItem('student')}`}
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
