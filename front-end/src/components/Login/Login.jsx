import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Result } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onFinish = async (values, event) => {
    // event.preventDefault();
    // console.log(values, values.email, values.password1);

    await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        // console.log(data.user);
        if (data.user) {
          navigate("/dashboard");
        }
      });
  };

  return (
    <div className="form_div">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
