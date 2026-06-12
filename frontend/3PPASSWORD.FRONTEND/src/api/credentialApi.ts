import axios from "axios";
import type { Credential, CreateCredencialRequest, CredentialPassword } from "../types/credential";

const API_BASE_URL = "https://localhost:7230/api";

export async function getCredentials(): Promise<Credential[]> {
    const response = await axios.get<Credential[]>(
        `${API_BASE_URL}/credentials`
    );

    return response.data;
}

export async function createCredential(data: CreateCredencialRequest
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

