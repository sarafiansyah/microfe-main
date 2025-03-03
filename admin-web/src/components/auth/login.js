import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { login } from "material/authSecurity"; // Import the remote login function
import Footer from "/src/layouts/Footer";

const LoginPage = () => {
    const [appTitle, setAppTitle] = useState("No Modules Federated");
    const [loading, setLoading] = useState(false);
    const year = new Date().getFullYear();

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const result = await login(values.username, values.password);
            message.success(result.message);
            window.location.href = "/dashboard/home"; // Redirect after login
        } catch (error) {
            message.error(error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetchRemoteInfo = async () => {
            try {
                const remoteApp = await import("material/AppInfo");

                console.log("Remote App Info:", remoteApp.default); // Debugging

                if (remoteApp && remoteApp.default) {
                    const { auth, authVersion } = remoteApp.default;
                    setAppTitle(`${auth} (v${authVersion ?? "unknown"})`); // Handle undefined version
                }
            } catch (error) {
                console.error("Failed to fetch remote app info:", error);
            }
        };

        fetchRemoteInfo();
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                gap: "20px",
            }}
        >
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

            {/* Footer with smaller font size */}
            <div
                style={{
                    fontSize: "12px",
                    textAlign: "center",
                    marginTop: "-20px",
                }}
            >
                <footer
                    style={{
                        textAlign: "center",
                        padding: "10px",
                        marginTop: "20px",
                    }}
                >
                    <p>
                        &copy; {year} Admin Web Host App . Secured By :{" "}
                        <b>{appTitle || "No Modules Federated"}</b>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default LoginPage;
