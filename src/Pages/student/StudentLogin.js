import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SigninStudent } from "../../apicalls/students";
import { Form, Button, Input, message } from "antd";


function StudentLogin() {
  const navigate = useNavigate();

  const submitForm = async (value) => {
    try {
      const response = await SigninStudent(value);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("student", response.token);
        window.location.href = "/student";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("student")) {
      navigate("/student");
    }
  }, []);

  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Sign in</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={submitForm}>
              <Form.Item
                label="Student Name"
                name="name"
                className="d-block"
                rules={[
                  { required: true, message: "Student name is required!" },
                ]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter student name"
                  autoComplete="student"
                ></Input>
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter the password"
                  autoComplete="current-password"
                ></Input>
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  SIGN IN
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>Don't have an account? Contact your teacher</p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default StudentLogin;
