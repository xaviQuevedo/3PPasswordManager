import { useEffect, useState } from "react";
import { Table, Typography, Alert, Spin, Button } from "antd";
import type { ColumnsType} from "antd/es/table";
import { getCredentials } from "../api/credentialApi";
import type { Credential } from "../types/credential";
import { PlusOutlined } from "@ant-design/icons";
import CredentialFormModal from "../components/CredentialFormModal";

const { Title } = Typography;

export default function CredentialPage(){
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const loadCredentials = async () => {
        try {
            setLoading(true);
            const data = await getCredentials();
            setCredentials(data);
        }
        catch{
            setError("Error loading credentials.");
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCredentials();
    },[]);

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
            dataIndex : "url",
            key: "url"
        },
        {
            title: "Notes",
            dataIndex: "notes",
            key: "notes",
        }, 
    ];

    if (loading){
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
            onClick={() => setModalOpen(true)}
            style={{ marginBottom: 16}}
            >
                Nueva contraseña
            </Button>

            <CredentialFormModal
            open={modalOpen}
            onClose={()=> setModalOpen(false)}
            onCreated={loadCredentials}
            />

            <Table
            rowKey="id"
            columns={columns}
            dataSource={credentials}
            />
        </div>
    );
}