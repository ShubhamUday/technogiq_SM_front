import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

function TeacherProtectedRoute({ children }) {
  const navItems = [
    {
      label: <Link to="/">Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/admin">Admin</Link>,
    },
    {
      label: <Link to="/teacher">Teacher</Link>,
    },
    {
      label: <Link to="/student">Student</Link>,
    },
  ];
  return (
    <>
      <Layout>
        <Header
          className="d-flex justify-content-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
            School Management App
          </h3>
          <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
        </Header>
        <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
          {children}
        </div>
      </Layout>
    </>
  );
}

export default TeacherProtectedRoute;
