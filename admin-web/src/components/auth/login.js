import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import users from "../data/users.json"; // Import user data directly

const Login = () => {
    const [loading, setLoading] = useState(false);

    const handleLogin = (values) => {
        setLoading(true);

        // Check if user exists in users.json
        const user = users.find(
            (u) =>
                u.username === values.username && u.password === values.password
        );

        if (user) {
            message.success("Login successful!");
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect after login
            setTimeout(() => {
                window.location.href = "/dashboard/home"; // Redirect to dashboard
            }, 1000);
        } else {
            message.error("Invalid username or password!");
        }

        setLoading(false);
    };

    return (
        <Card title="Login" style={{ width: 350, textAlign: "center" }}>
            <Form layout="vertical" onFinish={handleLogin}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your username",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your password",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                >
                    Login
                </Button>
            </Form>
        </Card>
    );
};

export default Login;
