import {
    Table,
    Button,
    Select,
    Typography,
    Switch,
    Space,
    Modal,
    DatePicker,
    Form,
    Input,
    message,
    notification,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const TablePage = () => {
    const [useDashboardLayout, setUseDashboardLayout] = useState(false);
    const DashboardLayout = useDashboardLayout
        ? dynamic(() => import("adminWeb/DashboardLayout"), { ssr: false })
        : ({ children }) => <>{children}</>;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [form] = Form.useForm();
    const [searchQuery, setSearchQuery] = useState("");
    const [rawData, setRawData] = useState([]); // Data asli dari API
    const [filteredData, setFilteredData] = useState([]); // Data setelah difilter

    const fetchData = async (currentPage = 1, pageSize = 10) => {
        setLoading(true);
        try {
            const response = await axios.get("/api/conversions", {
                params: { current_page: currentPage, page_size: pageSize },
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });

            const apiData = response.data;
            console.log("API Response:", apiData); // Debugging

            setRawData(apiData.data || []); // Simpan data asli
            setFilteredData(apiData.data || []); // Tampilkan awalnya semua data

            setPagination({
                current: apiData.pagination.current_page,
                pageSize: apiData.pagination.page_size,
                total: apiData.pagination.total_records,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            message.error("Failed to fetch data.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = rawData.filter((item) =>
                item.conversion_code
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(rawData);
        }
    }, [searchQuery, rawData]);

    const handleTableChange = (newPagination) => {
        console.log("Table Pagination Change:", newPagination);
        setPagination((prevData) => ({
            ...prevData,
            current: newPagination.current, // Update current
            pageSize: newPagination.pageSize, // Update pageSize
        }));
        fetchData(newPagination.current, newPagination.pageSize);
    };

    // Show Add Modal
    const showAddModal = () => {
        setIsEditMode(false);
        setSelectedRecord(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    // Show Edit Modal
    const showEditModal = (record) => {
        setIsEditMode(true);
        setSelectedRecord(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    // Function untuk handle refresh
    const handleRefresh = () => {
        fetchData(); // Panggil ulang API
    };

    // Function untuk handle pencarian
    const handleSearch = (value) => {
        console.log("Search Query:", value); // Debugging
        console.log("Raw Data Before Filter:", rawData); // Debugging

        if (value.trim() !== "") {
            const filtered = rawData.filter((item) =>
                item.conversion_code
                    ?.toLowerCase()
                    .includes(value.toLowerCase())
            );
            console.log("Filtered Data:", filtered); // Debugging
            setFilteredData(filtered);
        } else {
            setFilteredData(rawData);
        }
    };

    const handleSubmit = async () => {
        setIsProcessing(true);
        try {
            const values = await form.validateFields();

            const requestData = {
                conversion_datetime: dayjs().format("YYYY-MM-DD HH:mm:ss"), // Default timestamp
                plant_id: values.plant_id || 10,
                storage_location_id: values.storage_location_id || 31,
                conversion_skus: [
                    {
                        origin_sku_id: 1151,
                        origin_sku_uom_id: 26,
                        origin_sku_qty: "1",
                        destination_sku_id: 1150,
                        destination_sku_uom_id: 23,
                        destination_sku_qty: "36",
                    },
                ],
                responsible_user_id: 1,
            };

            if (isEditMode && selectedRecord?.conversion_id) {
                requestData.conversion_id = selectedRecord.conversion_id;
                console.log("Updating conversion:", requestData); // Debug log

                await axios.patch("/api/conversions", requestData);
                notification.success({
                    message: "Success",
                    description: "Conversion updated successfully.",
                });
            } else {
                console.log("Creating new conversion:", requestData); // Debug log

                await axios.post("/api/conversions", requestData);
                notification.success({
                    message: "Success",
                    description: "Conversion added successfully.",
                });
            }

            fetchData(pagination.current, pagination.pageSize);
            setIsModalVisible(false);
        } catch (error) {
            console.error(
                "Error submitting data:",
                error.response?.data || error.message
            );
            message.error(
                `Failed to submit data: ${
                    error.response?.data?.error || "Unknown error"
                }`
            );
        }
        setIsProcessing(false);
    };

    const handleDelete = async (conversionId) => {
        Modal.confirm({
            title: "Are you sure?",
            content:
                "Do you really want to delete this conversion? This action cannot be undone.",
            okText: "Yes, Delete",
            cancelText: "Cancel",
            okType: "danger",
            onOk: async () => {
                setIsProcessing(true);
                try {
                    await axios.delete("/api/conversions", {
                        data: {
                            conversion_id: conversionId,
                            responsible_user_id: 1,
                        },
                    });
                    notification.success({
                        message: "Success",
                        description: "Conversion deleted successfully.",
                    });
                    fetchData(1, pagination.pageSize);
                } catch (error) {
                    console.error("Error deleting data:", error);
                    message.error("Failed to delete data.");
                }
                setIsProcessing(false);
            },
        });
    };

    return (
        <DashboardLayout
            disableLayout={!useDashboardLayout}
            title="Material App"
        >
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
                <Space style={{ marginBottom: 10, gap: 8 }}>
                    {/* Search Input */}
                    <Search
                        placeholder="Search by Conversion Code"
                        allowClear
                        onSearch={handleSearch}
                        style={{ width: 300 }}
                    />

                    {/* Tombol Refresh */}
                    <Button
                        type="primary"
                        icon={<ReloadOutlined />}
                        style={{
                            backgroundColor: "#0d6efd",
                            borderColor: "#0d6efd",
                        }}
                        onClick={handleRefresh}
                    >
                        Refresh
                    </Button>

                    {/* Tombol Add Data */}
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showAddModal}
                        style={{
                            backgroundColor: "#008000",
                            borderColor: "#008000",
                        }}
                        disabled={isProcessing}
                    >
                        Add Data
                    </Button>
                </Space>

                <Table
                    columns={[
                        {
                            title: "No",
                            dataIndex: "conversion_id",
                            key: "conversion_id",
                            render: (_text, _record, index) => index + 1, // Display row number instead of conversion_id
                        },
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
                                        type="primary"
                                        disabled={[
                                            "Released",
                                            "Submitted",
                                        ].includes(record.status_name)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() =>
                                            handleDelete(record.conversion_id)
                                        }
                                        disabled={isProcessing}
                                    >
                                        Delete
                                    </Button>
                                </Space>
                            ),
                        },
                    ]}
                    key={pagination.current}
                    dataSource={filteredData}
                    loading={loading}
                    rowKey="conversion_id"
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        showSizeChanger: true,
                    }}
                    onChange={handleTableChange}
                />
            </div>

            {/* Add & Edit Modal */}
            <Modal
                title={isEditMode ? "Edit Conversion" : "Add Conversion"}
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={() => setIsModalVisible(false)}
                confirmLoading={isProcessing}
            >
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={{
                        responsible_user_id: "42",
                    }}
                >
                    {/* <Form.Item
                        name="conversion_datetime"
                        label="Conversion Datetime"
                        hidden={isEditMode}
                        rules={[
                            {
                                required: true,
                                message: "Please select a datetime!",
                            },
                        ]}
                    >
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{
                                width: "100%",
                                display: isEditMode ? "none" : "block", // ✅ Conditionally hide DatePicker
                            }}
                            hidden={isEditMode} // ✅ Correct way to hide the component
                        />
                    </Form.Item> */}

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
