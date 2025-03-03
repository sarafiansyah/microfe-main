import { Table, Button, Typography, Space, Card } from "antd";
import { useState, useEffect } from "react";
import DashboardLayout from "/src/layouts/DashboardLayout";
import Footer from "/src/layouts/Footer";
import dynamic from "next/dynamic";

const MaterialPage = dynamic(() => import("material/pageMaterial"), {
    ssr: false, // Disable SSR for federated modules
});

const { Title } = Typography;

const TablePage = () => {
    const [appTitle, setAppTitle] = useState("No Modules Federated");

    useEffect(() => {
        const fetchRemoteInfo = async () => {
            try {
                const remoteApp = await import("material/AppInfo");

                console.log("Remote App Info:", remoteApp.default); // Debugging

                if (remoteApp && remoteApp.default) {
                    const { name, version } = remoteApp.default;
                    setAppTitle(`${name} (v${version ?? "unknown"})`); // Handle undefined version
                }
                console.log("Remote App Info:", remoteApp.default);
            } catch (error) {
                console.error("Failed to fetch remote app info:", error);
            }
        };

        fetchRemoteInfo();
    }, []);

    return (
        <DashboardLayout disableLayout={false} title="Admin Web">
            <MaterialPage />
            <Footer title={appTitle} />
        </DashboardLayout>
    );
};

export default TablePage;
