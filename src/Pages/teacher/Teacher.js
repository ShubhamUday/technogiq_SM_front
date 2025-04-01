import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import StudentDash from "../student/StudentDash";
import NoticeDash from "../notice/NoticeDash";

function Teacher() {
  const [selectedComponent, setSelectedComponent] = useState("student");

  const list = [
    {
      key: "student",
      label: "Student",
    },
    {
      key: "notice",
      label: "Notice",
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
            {selectedComponent === "student" && <StudentDash />}
            {selectedComponent === "notice" && <NoticeDash />}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Teacher;
