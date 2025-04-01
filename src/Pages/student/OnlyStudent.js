import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllNotices } from "../../apicalls/notices";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function OnlyStudent() {
  const { student } = useSelector((state) => state.student);

  const [notices, setNotices] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await getAllNotices();
      if (response.success) {
        const allNotices = response.data;
        setNotices(
          allNotices.map(function (item) {
            return { ...item, key: `notice${item._id}` };
          })
        );
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

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
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <Button
            onClick={() => {
              localStorage.removeItem("student");
              navigate("/studentLogin");
            }}
          >
            Log out
            <LoginOutlined />
          </Button>
        );
      },
    },
  ];

  const noticeColumns = [
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
     
      <h1 className="only-student-headings">Student name "{student.name}" </h1>

      <Table dataSource={[student]} columns={columns} />

      <h2 className="only-student-headings">Notice Board</h2>

      <Table dataSource={notices} columns={noticeColumns} />
    </>
  );
}

export default OnlyStudent;
