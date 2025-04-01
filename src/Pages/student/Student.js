import React, { useEffect, useState } from "react";
import { Button, Layout, message, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import NoticeDash from "../notice/NoticeDash";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setStudent } from "../../redux/studentSlice";
import { getCurrentStudent } from "../../apicalls/students";

function Student() {
  const { student } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currStd, setCurrStd] = useState(null);

  console.log(student);
  console.log("currstd", currStd);

  const columns = [
    {
      title: "Your Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "key",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "key",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
  ];

  const getValidStudent = async () => {
    try {
      const response = await getCurrentStudent();
      console.log(response.data);
      if (response.success) {
        dispatch(setStudent(response.data));
        setCurrStd(student);
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
  }, [student]);

  return (
    student && (
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
            <Link
              to="/studentLogin"
              onClick={() => localStorage.removeItem("student")}
            >
              Logout
            </Link>
            <Table columns={columns} />
            <Content
              style={{
                textAlign: "center",
                backgroundColor: "#0958d9",
              }}
            >
              <NoticeDash />
            </Content>
          </Layout>
        </Layout>
      </>
    )
  );
}

export default Student;
