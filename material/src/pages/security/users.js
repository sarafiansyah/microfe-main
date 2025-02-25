import { Table, Button, Typography, Space } from "antd";
import { useState } from "react";

const { Title } = Typography;

const TablePage = () => {
    const [data, setData] = useState([
        { key: "1", name: "John Doe", age: 28, address: "New York" },
        { key: "2", name: "Jane Smith", age: 32, address: "London" },
        { key: "3", name: "Michael Brown", age: 40, address: "Sydney" },
    ]);

    const handleAdd = () => {
        const newData = {
            key: `${data.length + 1}`,
            name: `New User ${data.length + 1}`,
            age: Math.floor(Math.random() * 50) + 20,
            address: "Unknown",
        };
        setData([...data, newData]);
    };

    const handleEdit = (key) => {
        const newData = data.map((item) =>
            item.key === key ? { ...item, name: item.name + " (Edited)" } : item
        );
        setData(newData);
    };

    const handleDelete = (key) => {
        setData(data.filter((item) => item.key !== key));
    };

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Age", dataIndex: "age", key: "age" },
        { title: "Address", dataIndex: "address", key: "address" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        onClick={() => handleEdit(record.key)}
                        type="primary"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleDelete(record.key)}
                        type="danger"
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <Title level={2}>Security</Title>
            <Button
                type="primary"
                onClick={handleAdd}
                style={{ marginBottom: 16 }}
            >
                Add User
            </Button>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default TablePage;
