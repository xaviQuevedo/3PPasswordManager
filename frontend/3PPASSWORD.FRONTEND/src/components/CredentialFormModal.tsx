import { useEffect } from "react";
import { Form, Input, Modal, Button } from "antd";
import { createCredential, updateCredential, generatePassword } from "../api/credentialApi";
import type { Credential, CreateCredentialRequest } from "../types/credential";

interface Props {
    open: boolean;
    mode: "create" | "edit";
    credentialToEdit?: Credential | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function CredentialFormModal({
    open,
    mode,
    credentialToEdit,
    onClose,
    onSaved,
}: Props) {
    const [form] = Form.useForm<CreateCredentialRequest>();

    const handleGeneratePassword = async () => {
        const result = await generatePassword({
            length: 16,
            includeUppercase: true,
            includeLowercase: true,
            includeNumbers: true,
            includeSymbols: true,
        });

        form.setFieldsValue({
            password: result.password,
            repeatPassword: result.password,
        });
    };

    useEffect(() => {
        if (mode === "edit" && credentialToEdit){
            form.setFieldsValue({
                systemName: credentialToEdit.systemName,
                username: credentialToEdit.username,
                url:credentialToEdit.url,
                notes: credentialToEdit.notes,
                password: "",
                repeatPassword: "",
            });
        }
        if (mode === "create"){
            form.resetFields();
        }
    }, [mode, credentialToEdit, form])

    const handleSubmit = async () => {
        const values = await form.validateFields();

        if (mode === "edit" && credentialToEdit) {
            await updateCredential(credentialToEdit.id, values);
        } else {
            await createCredential(values);
        }

        form.resetFields();
        onSaved();
        onClose();
    };

    return (
        <Modal
            title={mode === "create" ? "Nueva contraseña": "Editar contraseña"}
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
                <Button
                type="dashed"
                onClick={handleGeneratePassword}
                style={{marginBottom: 16}}
                >
                    Generar contraseña segura
                </Button>

                <Form.Item label="Notas" name="notes">
                    <Input.TextArea rows={3} />
                </Form.Item>
            </Form>
        </Modal>
    );
}