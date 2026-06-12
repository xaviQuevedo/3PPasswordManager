import { Modal, Input, Button, Space, message } from "antd";

interface Props {
    open: boolean;
    password: string;
    systemName: string;
    onClose: () => void;
}

export default function PasswordModal({
    open, 
    password,
    systemName,
    onClose,
}: Props) {
    const copyPassword = async () => {
        await navigator.clipboard.writeText(password);
        message.success("Contraseña copiada al portapapeles");
    };

    return (
        <Modal
        open={open}
        title={systemName}
        onCancel={onClose}
        footer={null}
        >
            <Space direction="vertical" style={{ width: "100%" }}>
                <Input.Password value={password} readOnly />

                <Button onClick={copyPassword}>
                    Copy password
                </Button>
            </Space>
        </Modal>
    );
}