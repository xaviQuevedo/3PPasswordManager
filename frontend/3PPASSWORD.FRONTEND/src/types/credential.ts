export interface Credential {
    id: string;
    systemName: string;
    username: string;
    url: string;
    notes: string;
    createdAt: string;
    updateAt: string;
}

export interface CreateCredentialRequest {
    systemName: string;
    username: string;
    url: string;
    password: string;
    repeatPassword: string;
    notes: string;
}

export interface CredentialPassword {
    id: string;
    systemName: string;
    password: string;
}

export interface UpdateCredentialRequest {
    systemName: string;
    username: string;
    url: string;
    password: string;
    repeatPassword: string;
    notes: string;
}

export interface PasswordGeneratorOptions {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
}

export interface GeneratedPassword {
    password: string;
}