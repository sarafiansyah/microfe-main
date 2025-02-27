import { Table, Button, Typography, Space, Card } from "antd";
import { useState } from "react";
import DashboardLayout from "/src/layouts/DashboardLayout";
import dynamic from "next/dynamic";

const SecurityPage = dynamic(() => import("material/pageSecurity"), {
    ssr: false, // Disable SSR for federated modules
});

const { Title } = Typography;

const TablePage = () => {
    return (
        <DashboardLayout disableLayout={true}>
            <SecurityPage />
        </DashboardLayout>
    );
};

export default TablePage;
