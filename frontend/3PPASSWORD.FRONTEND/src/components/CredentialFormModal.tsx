import { Form, Input, Modal } from "antd";
import { createCredential } from "../api/credentialApi";
import type { CreateCredencialRequest } from "../types/credential";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
}

export default function CredentialFormModal({
    open,
    onClose,
    onCreated,
}: Props) {
    const [form] = Form.useForm<CreateCredencialRequest>();

    const handleSubmit = async () => {
        const values = await form.validateFields();

        await createCredential(values);

        form.resetFields();
        onCreated();
        onClose();
    };

    return (
        <Modal
            title="Nueva contraseña"
            open={open}
            onOk={handleSubmit}
            onCancel={onClose}
            okText="Guardar"
            cancelText="Cancelar"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                label="sistema"
                name="systemName"
                rules={[{ required: true, message: "El sistema es obligatorio" }]}
                >
                    <Input placeholder="Ej: Github" />
                </Form.Item>

                <Form.Item
                label="Usuario"
                name="username"
                rules={[{ required: true, message: "El usuario es obligatorio" }]}
                >
                    <Input placeholder="Ej: xquevedo" />
                </Form.Item>

                <Form.Item label="URL" name="url">
                    <Input placeholder="https://..." />
                </Form.Item>

                <Form.Item
                label="Contraseña"
                name="password"
                rules={[{ required: true, message: "La contraseña es obligatoria"}]}>
                    <Input.Password placeholder="Contraseña" />
                </Form.Item>

                <Form.Item
                label="Repetir contraseña"
                name="repeatPassword"
                dependencies={["password"]}
                rules={[
                    { required: true, message: "Repite la contraseña" },
                    ({ getFieldValue }) => ({
                        validator(_, value){
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error("Las contraseñas no coinciden")
                            );
                        },
                    }),
                ]}
                >
                    <Input.Password placeholder="Repetir contraseña" />
                </Form.Item>

                <Form.Item label="Notas" name="notes">
                    <Input.TextArea rows={3} />
                </Form.Item>
            </Form>
        </Modal>
    );
}