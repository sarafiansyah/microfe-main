import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({
    children,
    disableLayout = false,
    title = "Admin Web",
}) => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    if (disableLayout) {
        return <>{children}</>;
    }

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
                        textAlign: "center",
                        fontSize: 20,
                    }}
                >
                    {title} {/* Menggunakan prop title untuk mengubah judul */}
                </Header>
                <Content style={{ padding: "24px" }}>{children}</Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
