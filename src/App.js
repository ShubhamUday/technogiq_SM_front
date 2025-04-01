import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import Student from "./Pages/student/Student";
import Teacher from "./Pages/teacher/Teacher";
import Shifter from "./Pages/Shifter";
import Admin from "./Pages/admin/Admin";
import NavBar from "./Pages/NavBar";
import AdminProtectedRoute from "./Pages/admin/AdminProtectedRoute";
import TeacherProtectedRoute from "./Pages/teacher/TeacherProtectedRoute";
import StudentLogin from "./Pages/student/StudentLogin";
import StudentProtRoute from "./Pages/student/StudentProtRoute";
import OnlyStudent from "./Pages/student/OnlyStudent";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminProtectedRoute><Admin /></AdminProtectedRoute>} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/shifter" element={<Shifter />} />

        <Route path="/teacher" element={<Teacher />} />

        {/* <Route path="/student" element={<Student />} /> */}

        <Route path="/studentLogin" element={<StudentLogin />} />

      
      <Route path="/student" element={<StudentProtRoute><OnlyStudent/></StudentProtRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
