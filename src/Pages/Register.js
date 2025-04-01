import React, { useEffect } from "react";

import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterAdmin } from "../apicalls/admins";

function Register() {
  const navigate = useNavigate();

  const submitForm = async (value) => {
    
    const confirmPass = value.confirmPassword;
    const pass = value.password;
    if (confirmPass !== pass) {
      alert("Password & Confirm Password should be same");
      return;
    }

    try {
      const response = await RegisterAdmin(value);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, []);
  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Sign Up</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={submitForm}>
              <Form.Item
                label="Username"
                name="userName"
                className="d-block"
                rules={[{ required: true, message: "Username is required!" }]}
              >
                <Input
                  id="userName"
                  type="text"
                  placeholder="Enter your Username"
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
                ></Input>
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                className="d-block"
                rules={[{ required: true, message: "Email is required!" }]}
              >
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Enter your confirm password"
                ></Input>
              </Form.Item>

              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  SIGN UP
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                Already have an account?<Link to="/login"> Sign in</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default Register;
