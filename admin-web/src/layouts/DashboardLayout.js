import { Layout, Menu, Avatar, Dropdown } from "antd";
import { useRouter } from "next/router";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({
    children,
    disableLayout = false,
    title = "Dashboard",
}) => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState({ username: "", role: "" });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/");
    };

    if (disableLayout) {
        return <>{children}</>;
    }

    const menu = (
        <Menu>
            <Menu.Item key="1">Profile</Menu.Item>
            <Menu.Item key="2">Settings</Menu.Item>
            <Menu.Item
                key="3"
                onClick={handleLogout}
                style={{ color: "#FF4D4F" }}
            >
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                trigger={null}
                style={{ background: "#001529" }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px",
                        color: "#FFFFFF",
                        fontSize: "18px",
                        fontWeight: "bold",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    {!collapsed && <span>Microfrontend</span>}
                    {collapsed ? (
                        <MenuUnfoldOutlined
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "18px",
                                cursor: "pointer",
                                color: "#FFFFFF",
                            }}
                        />
                    ) : (
                        <MenuFoldOutlined
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "18px",
                                cursor: "pointer",
                                color: "#FFFFFF",
                            }}
                        />
                    )}
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    onClick={({ key }) => {
                        if (key === "logout") {
                            handleLogout();
                        } else {
                            router.push(key);
                        }
                    }}
                    style={{ borderRight: "none" }}
                >
                    <Menu.Item key="/dashboard/home">Dashboard</Menu.Item>
                    <Menu.Item key="/material/master-sku">Material</Menu.Item>
                    <Menu.Item key="/security/users">Security</Menu.Item>
                    <Menu.Item key="logout" style={{ color: "#FF4D4F" }}>
                        Logout
                    </Menu.Item>
                </Menu>

                <div
                    style={{
                        position: "absolute",
                        bottom: "16px",
                        width: "100%",
                        textAlign: "center",
                        fontSize: "12px",
                        color: "#BBBBBB",
                    }}
                >
                    V.1
                </div>
            </Sider>

            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 20px",
                    }}
                >
                    <span style={{ fontSize: 20 }}>{title}</span>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                gap: "8px", // Adjust spacing between avatar and text
                            }}
                        >
                            <Avatar icon={<UserOutlined />} />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    lineHeight: "1.2",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {user.username
                                        ? user.username
                                              .charAt(0)
                                              .toUpperCase() +
                                          user.username.slice(1).toLowerCase()
                                        : "User"}
                                </div>
                                <div
                                    style={{ fontSize: "12px", color: "gray" }}
                                >
                                    {user.role || "Role"}
                                </div>
                            </div>
                        </div>
                    </Dropdown>
                </Header>
                <Content style={{ padding: "24px" }}>{children}</Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
