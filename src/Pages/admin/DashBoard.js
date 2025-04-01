import React, { useEffect, useState } from "react";
import { getAllAdmin } from "../../apicalls/admins";
import { useSelector } from "react-redux";
import { getAllTeachers } from "../../apicalls/teachers";
import { getAllStudents } from "../../apicalls/students";

function DashBoard() {
  const { admin } = useSelector((state) => state.admin);
  const [admins, setAdmins] = useState([]);
  const [studentsCount, setStudentsCount] = useState();
  const [teachersCount, setTeachersCount] = useState();

  const getData = async () => {
    const response = await getAllAdmin();
    const teachersCount = await getAllTeachers();
    const studentsCount = await getAllStudents();

    setAdmins(response.data);
    setTeachersCount(teachersCount.data.length);
    setStudentsCount(studentsCount.data.length);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
     
      <div class="dashboard-card">
        <div class="card">
          {" "}
          <p>Total Student</p> <h2>{studentsCount}</h2>
        </div>
        <div class="card">
          {" "}
          <p>Total Classes</p> <h2>5</h2>
        </div>
        <div class="card">
          {" "}
          <p>Total Teachers</p> <h2>{teachersCount}</h2>
        </div>
      </div>
      <h2>Welcome To The Dashboard Mr. "{admin.userName}"</h2>
      <h2>Admin List</h2>
      <ol>
        {admins.map((adn) => {
          return <li>{adn.userName}</li>;
        })}
      </ol>
    </>
  );
}

export default DashBoard;
