import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Layout, Menu, message } from "antd";
import Sider from "antd/es/layout/Sider";
import { LoginOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import DashBoard from "./DashBoard";
import TeacherDash from "../teacher/TeacherDash";
import StudentDash from "../student/StudentDash";
import NoticeDash from "../notice/NoticeDash";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAdmin } from "../../apicalls/admins";
import { setAdmin } from "../../redux/adminSlice";

function Admin() {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  const { admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const list = [
    {
      key: "dashboard",
      label: "Admin Home",
    },
    {
      key: "teacher",
      label: "Teacher",
    },
    {
      key: "student",
      label: "Student",
    },
    {
      key: "notice",
      label: "Notice",
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

  return (
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
            <Menu
              theme="dark"
              mode="vertical"
              items={list}
              onClick={(e) => setSelectedComponent(e.key)}
            ></Menu>
          </Sider>
          <Content
            style={{
              textAlign: "center",
              backgroundColor: "#0958d9",
            }}
          >
            {selectedComponent === "dashboard" && <DashBoard />}
            {selectedComponent === "teacher" && <TeacherDash />}
            {selectedComponent === "student" && <StudentDash />}
            {selectedComponent === "notice" && <NoticeDash />}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Admin;
