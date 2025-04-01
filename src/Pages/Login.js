import React, { useEffect } from "react";

import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentAdmin, SigninAdmin } from "../apicalls/admins";

function Login() {
  const navigate = useNavigate();

  const submitForm = async (value) => {
    try {
      const response = await SigninAdmin(value);
      if (response.success) {
        message.success(response.message);
        // console.log("token jwt login", response.token);
        localStorage.setItem("token", response.token);
        window.location.href = "/admin";
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
            <h1>Sign in</h1>
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
                  autoComplete="userName"
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
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default Login;
