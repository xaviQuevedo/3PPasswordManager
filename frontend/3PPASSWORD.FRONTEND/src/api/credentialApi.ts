import axios from "axios";
import type {
    Credential,
    CreateCredentialRequest,
    CredentialPassword,
    UpdateCredentialRequest,
    PasswordGeneratorOptions,
    GeneratedPassword
} from "../types/credential";

const API_BASE_URL = "https://localhost:7230/api";

export async function getCredentials(): Promise<Credential[]> {
    const response = await axios.get<Credential[]>(
        `${API_BASE_URL}/credentials`
    );

    return response.data;
}

export async function createCredential(data: CreateCredentialRequest
): Promise<Credential> {
    const response = await axios.post<Credential>(
        `${API_BASE_URL}/credentials`,
        data
    );

    return response.data;
}

export async function getCredentialPassword(id: string): Promise<CredentialPassword> {
    const response = await axios.get<CredentialPassword>(
        `${API_BASE_URL}/credentials/${id}/password`
    );

    return response.data;
}

export async function updateCredential(
    id: string,
    data: UpdateCredentialRequest): Promise<Credential> {
    const response = await axios.put<Credential>(
        `${API_BASE_URL}/credentials/${id}`,
        data
    );

    return response.data;
}

export async function generatePassword(
    options: PasswordGeneratorOptions
): Promise<GeneratedPassword> {
    const response = await axios.post<GeneratedPassword>(
        `${API_BASE_URL}/PasswordGenerator`,
        options
    );

    return response.data;
}
