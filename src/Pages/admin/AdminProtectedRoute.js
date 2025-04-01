import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentAdmin } from "../../apicalls/admins";
import { setAdmin } from "../../redux/adminSlice";

function AdminProtectedRoute({ children }) {
  const { admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getValidAdmin = async () => {
    try {
      const response = await getCurrentAdmin();

      if (response.success) {
        dispatch(setAdmin(response.data));
      } else {
        dispatch(setAdmin(null));
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setAdmin(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidAdmin();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    admin && (
      <>
        <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
          {children}
        </div>
      </>
    )
  );
}

export default AdminProtectedRoute;
