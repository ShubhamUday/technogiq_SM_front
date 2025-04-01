import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import StudentFormModal from "./StudentFormModal";
import DeleteStudentModal from "./DeleteStudentModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getAllStudents, getStudentById } from "../../apicalls/students";

function StudentDash() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState(null);
  const [studentsCount, setStudentsCount] = useState();

  const [class1, setClass1] = useState();
  const [class2, setClass2] = useState();
  const [class3, setClass3] = useState();
  const [class4, setClass4] = useState();
  const [class5, setClass5] = useState();

  // console.log(studentsCount);

  const getData = async () => {
    try {
      const response = await getAllStudents();
      if (response.success) {
        const allStudents = response.data;
        setStudents(
          allStudents.map(function (item) {
            return { ...item, key: `student${item._id}` };
          })
        );
        setStudentsCount(allStudents.length);
        // Filter students by class
        setClass1(allStudents.filter((student) => student.class === "1st"));
        setClass2(allStudents.filter((student) => student.class === "2nd"));
        setClass3(allStudents.filter((student) => student.class === "3rd"));
        setClass4(allStudents.filter((student) => student.class === "4th"));
        setClass5(allStudents.filter((student) => student.class === "5th"));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
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
          <div className="d-flex align-items-center gap-10">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedStudent(data);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedStudent(data);
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
          Add Student
        </Button>
      </div>

      {/* <Table dataSource={students} columns={columns} /> */}

      <div>
        <h2>Class 1 Students</h2>
        <Table dataSource={class1} columns={columns} />
      </div>
      <div>
        <h2>Class 2 Students</h2>
        <Table dataSource={class2} columns={columns} />
      </div>
      <div>
        <h2>Class 3 Students</h2>
        <Table dataSource={class3} columns={columns} />
      </div>
      <div>
        <h2>Class 4 Students</h2>
        <Table dataSource={class4} columns={columns} />
      </div>
      <div>
        <h2>Class 5 Students</h2>
        <Table dataSource={class5} columns={columns} />
      </div>

      {isModalOpen && (
        <StudentFormModal
          isModalOpen={isModalOpen}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          getData={getData}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteStudentModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedStudent={selectedStudent}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedStudent={setSelectedStudent}
          getData={getData}
        />
      )}
    </>
  );
}

export default StudentDash;
