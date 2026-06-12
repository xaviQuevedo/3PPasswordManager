import { useEffect, useState } from "react";
import { Table, Typography, Alert, Spin, Button, Space, Card, Tag, Row } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getCredentialPassword, getCredentials } from "../api/credentialApi";
import type { Credential } from "../types/credential";
import { PlusOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import CredentialFormModal from "../components/CredentialFormModal";
import PasswordModal from "../components/PasswordModal";
import logo from "../assets/logoportal.png";

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

    const handleViewPassword = async (id: string) => {
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
            render: (value: string) => <Tag>{value}</Tag>,
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "URL",
            dataIndex: "url",
            key: "url",
            render: (url: string) =>
                url ? (
                    <a href={url} target="_blank" rel="noreferrer">
                        {url}
                    </a>
                ) : (
                    "-"
                ),
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
        <div style={{ padding: 32, background: "#f5f5f5", minHeight: "100vh" }}>
            <Card>
                <Row
                    justify="space-between"
                    align="middle"
                    style={{ marginBottom: 24 }}
                >
                    <Space size="large">
                        <img
                            src={logo}
                            alt="3P Password"
                            style={{
                                width: 120,
                                height: "auto",
                            }}
                        />

                        <div>
                            <Title level={2} style={{ margin: 0 }}>
                                3P Password Manager
                            </Title>

                            <p style={{ margin: 0, color: "#666" }}>
                                Gestión segura de credenciales corporativas
                            </p>
                        </div>
                    </Space>

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setCredentialToEdit(null);
                            setModalMode("create");
                            setModalOpen(true);
                        }}
                    >
                        Nueva contraseña
                    </Button>
                </Row>
                {/* <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                    <Col>
                        <Title level={2} style={{ margin: 0 }}>
                            Password Manager
                        </Title>
                        <p style={{ margin: 0, color: "#666" }}>
                            Gestión segura de credenciales corporativas
                        </p>
                    </Col>

                    <Col>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setCredentialToEdit(null);
                                setModalMode("create");
                                setModalOpen(true);
                            }}>
                            Nueva contraseña
                        </Button>
                    </Col>
                </Row> */}

                {error && (
                    <Alert
                        type="error"
                        title={error}
                        showIcon
                        style={{ marginBottom: 16 }}
                    />
                )}
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={credentials}
                    pagination={{ pageSize: 8 }}
                />
            </Card>

            <CredentialFormModal
                open={modalOpen}
                mode={modalMode}
                credentialToEdit={credentialToEdit}
                onClose={() => setModalOpen(false)}
                onSaved={loadCredentials}
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