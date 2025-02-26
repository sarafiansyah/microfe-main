import {
    Table,
    Button,
    Select,
    Typography,
    Space,
    Modal,
    Form,
    Input,
    message,
    notification,
    Switch,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

const { Title, Text } = Typography;
const { Option } = Select;
const API_URL = "/api/conversion/conversions"; // Calls Next.js API Proxy

const TablePage = () => {
    const [useDashboardLayout, setUseDashboardLayout] = useState(true); // ✅ Toggle state
    const DashboardLayout = useDashboardLayout
        ? dynamic(() => import("adminWeb/DashboardLayout"), { ssr: false })
        : ({ children }) => <>{children}</>; // ✅ Use Fragment if disabled

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async (currentPage = 1, pageSize = 10) => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL, {
                params: { current_page: currentPage, page_size: pageSize },
            });
            setData(response.data.data || []);
            setPagination({
                current: response.data.pagination.current_page,
                pageSize: response.data.pagination.page_size,
                total: response.data.pagination.total_records,
            });
        } catch (error) {
            message.error("Failed to fetch data.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DashboardLayout disableLayout={!useDashboardLayout}>
            <div style={{ padding: 20 }}>
                <Space
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 16,
                    }}
                >
                    <Title level={2}>Conversion List</Title>
                    <Switch
                        checked={useDashboardLayout}
                        onChange={setUseDashboardLayout}
                        checkedChildren="Using Admin Web Header"
                        unCheckedChildren="Not Using Admin Web Header"
                    />
                </Space>
                <Text
                    type="secondary"
                    style={{ fontSize: 16, marginBottom: 16, display: "block" }}
                >
                    Material Remote App
                </Text>
                <Button
                    type="primary"
                    onClick={() => setIsModalVisible(true)}
                    style={{ marginBottom: 16 }}
                    disabled={isProcessing}
                >
                    Add Data
                </Button>
                <Table
                    columns={[
                        {
                            title: "ID",
                            dataIndex: "conversion_id",
                            key: "conversion_id",
                        },
                        {
                            title: "Code",
                            dataIndex: "conversion_code",
                            key: "conversion_code",
                        },
                        {
                            title: "Datetime",
                            dataIndex: "conversion_datetime",
                            key: "conversion_datetime",
                        },
                        {
                            title: "Total Items",
                            dataIndex: "conversion_total_item",
                            key: "conversion_total_item",
                        },
                        {
                            title: "Plant",
                            dataIndex: "plant_name",
                            key: "plant_name",
                        },
                        {
                            title: "Storage Location",
                            dataIndex: "storage_location_name",
                            key: "storage_location_name",
                        },
                        {
                            title: "Status",
                            dataIndex: "status_name",
                            key: "status_name",
                        },
                        {
                            title: "Actions",
                            key: "actions",
                            render: (_, record) => (
                                <Space>
                                    <Button
                                        type="link"
                                        onClick={() => setIsModalVisible(true)}
                                        disabled={isProcessing}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        type="link"
                                        danger
                                        disabled={isProcessing}
                                    >
                                        Delete
                                    </Button>
                                </Space>
                            ),
                        },
                    ]}
                    dataSource={data}
                    loading={loading}
                    rowKey="conversion_id"
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        showSizeChanger: true,
                    }}
                />
            </div>
            <Modal
                title="Conversion"
                visible={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item name="plant_id" label="Warehouse Name">
                        <Select placeholder="Select Plant">
                            <Option value="10">Warehouse Cipondoh</Option>
                            <Option value="11">Warehouse Karawaci</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="storage_location_id"
                        label="Storage Location"
                    >
                        <Select placeholder="Select Storage Location">
                            <Option value="30">Quarantine</Option>
                            <Option value="31">Frozen</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="responsible_user_id"
                        label="Responsible User ID"
                    >
                        <Input disabled />
                    </Form.Item>
                </Form>
            </Modal>
        </DashboardLayout>
    );
};

export default TablePage;
