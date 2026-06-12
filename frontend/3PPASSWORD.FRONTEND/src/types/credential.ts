export interface Credential {
    id: string;
    systemName: string;
    username: string;
    url: string;
    notes: string;
    createdAt: string;
    updateAt: string;
}

export interface CreateCredencialRequest {
    systemName: string;
    username: string;
    url: string;
    password: string;
    repeatPassword: string;
    notes: string;
}

export interface CredentialPassword{
    id: string;
    systemName: string;
    password: string;
}