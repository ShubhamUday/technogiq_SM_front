import { HomeOutlined, LoginOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const navItems = [
    {
      label: <Link to="/">Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/admin"> Admin </Link>,
    },
    {
      label: <Link to="/teacher"> Teacher </Link>,
    },
    {
      label: <Link to="/student"> Student </Link>,
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
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <h3 className="demo-logo text-white m-0">School Management App</h3>
          </Link>

          <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
        </Header>
      </Layout>
    </>
  );
}

export default NavBar;
