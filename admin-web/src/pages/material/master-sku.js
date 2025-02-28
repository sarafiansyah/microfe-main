import { Table, Button, Typography, Space, Card } from "antd";
import { useState } from "react";
import DashboardLayout from "/src/layouts/DashboardLayout";
import dynamic from "next/dynamic";

const MaterialPage = dynamic(() => import("material/pageMaterial"), {
    ssr: false, // Disable SSR for federated modules
});

const { Title } = Typography;

const TablePage = () => {
    return (
        <DashboardLayout disableLayout={false} title="Admin Web">
            <MaterialPage />
        </DashboardLayout>
    );
};

export default TablePage;
