import { useEffect, useState } from "react";
import { Table, Typography, Alert, Spin, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getCredentialPassword, getCredentials } from "../api/credentialApi";
import type { Credential } from "../types/credential";
import { PlusOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import CredentialFormModal from "../components/CredentialFormModal";
import PasswordModal from "../components/PasswordModal";

const { Title } = Typography;

export default function CredentialPage() {
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [selectedPassword, setSelectedPassword] = useState("");
    const [selectedSystem, setSelectedSystem] = useState("");
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [credentialToEdit, setCredentialToEdit] = useState<Credential | null>(null);

    const handleEdit = (credential: Credential) => {
        setCredentialToEdit(credential);
        setModalMode("edit");
        setModalOpen(true);
    }
    
    const handleViewPassword = async(id:string) => {
        const result = await getCredentialPassword(id);
        
        setSelectedPassword(result.password);
        setSelectedSystem(result.systemName);

        setPasswordModalOpen(true);
    };

    const loadCredentials = async () => {
        try {
            setLoading(true);
            const data = await getCredentials();
            setCredentials(data);
        }
        catch {
            setError("Error loading credentials.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCredentials();
    }, []);

    const columns: ColumnsType<Credential> = [
        {
            title: "System",
            dataIndex: "systemName",
            key: "systemName",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "URL",
            dataIndex: "url",
            key: "url"
        },
        {
            title: "Notes",
            dataIndex: "notes",
            key: "notes",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => handleViewPassword(record.id)}
                    >
                        View
                    </Button>

                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                </Space>
            ),
        }
    ];

    if (loading) {
        return <Spin />;
    }

    return (
        <div style={{ padding: 24 }}>
            <Title level={2}>Password Manager</Title>

            {error && (
                <Alert
                    type="error"
                    title={error}
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    setCredentialToEdit(null);
                    setModalMode("create")
                    setModalOpen(true)
                }}
                style={{ marginBottom: 16 }}
            >
                Nueva contraseña
            </Button>

            <CredentialFormModal
                open={modalOpen}
                mode={modalMode}
                credentialToEdit={credentialToEdit}
                onClose={() => setModalOpen(false)}
                onSaved={loadCredentials}
            />

            <Table
                rowKey="id"
                columns={columns}
                dataSource={credentials}
            />

            <PasswordModal
            open={passwordModalOpen}
            password={selectedPassword}
            systemName={selectedSystem}
            onClose={() => setPasswordModalOpen(false)}
            />

        </div>
    );
}