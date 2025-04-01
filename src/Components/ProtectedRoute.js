import React, { useEffect } from "react";
import { Layout, Menu, message } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentAdmin } from "../apicalls/admins";
import { setAdmin } from "../redux/adminSlice";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  HomeOutlined,
  LoginOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Admin from "../Pages/admin/Admin";

function ProtectedRoute() {
  const { admin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log( 'admin pro', admin)

  const list = [
    {
      label: <Link to='/admin'>Admin Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/teacher"> Teacher </Link>,
    },
    {
      label: <Link to="/student"> Student </Link>,
    },
    {
      label: <Link to="/notice"> Notice </Link>,
    },
    {
      label: (
        <Link to="/login" onClick={() => localStorage.removeItem("token")}>
          Logout
        </Link>
      ),
      icon: <LoginOutlined />,
    },
  ];

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
        <Layout
          style={{
            borderRadius: 8,
            overflow: "hidden",
            width: "calc(100% - 8px)",
            maxWidth: "calc(100% - 8px)",
          }}
        >
          <Layout>
            <Sider
              width="25%"
              style={{
                textAlign: "center",
                lineHeight: "120px",
                color: "#fff",
                backgroundColor: "#1677ff",
              }}
            >
              <Menu theme="dark" mode="vertical" items={list}></Menu>
            </Sider>
          </Layout>
          <div
            style={{ padding: 24, minHeight: 380, background: "#fff" }}
          >
            
          </div>
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;
