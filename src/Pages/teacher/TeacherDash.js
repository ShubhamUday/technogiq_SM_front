import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import TeacherFormModal from "./TeacherFormModal";
import { getAllTeachers } from "../../apicalls/teachers";
import DeleteTeacherModal from "./DeleteTeacherModal";

function TeacherDash() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [teachersCount, setTeachersCount] = useState();

  console.log(teachersCount);

  const getData = async () => {
    try {
      const response = await getAllTeachers();
      if (response.success) {
        const allTeachers = response.data;

        setTeachers(
          allTeachers.map(function (item) {
            return { ...item, key: `teacher${item._id}` };
          })
        );
        setTeachersCount(allTeachers.length);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "key",
    },
    {
      title: "Work",
      dataIndex: "workExperience",
      key: "workExperience",
    },
    {
      title: "Phone Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
          <div className="d-flex align-items-center gap-10">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedTeacher(data);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedTeacher(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Teacher
        </Button>
      </div>

      <Table dataSource={teachers} columns={columns} />

      {isModalOpen && (
        <TeacherFormModal
          isModalOpen={isModalOpen}
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          getData={getData}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteTeacherModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedTeacher={selectedTeacher}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedTeacher={setSelectedTeacher}
          getData={getData}
        />
      )}
    </>
  );
}

export const { teachersCount } = TeacherDash;
export default TeacherDash;
