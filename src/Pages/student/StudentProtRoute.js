import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentStudent } from "../../apicalls/students";
import { setStudent } from "../../redux/studentSlice";

function StudentProtRoute({ children }) {
  const { student } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getValidStudent = async () => {
    try {
      const response = await getCurrentStudent();
      // console.log(response.data);
      if (response.success) {
        dispatch(setStudent(response.data));
      } else {
        dispatch(setStudent(null));
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setStudent(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("student")) {
      getValidStudent();
    } else {
      navigate("/studentLogin");
    }
  }, []);

  return (
    student && (
      <>
        <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
          {children}
        </div>
      </>
    )
  );
}

export default StudentProtRoute;
