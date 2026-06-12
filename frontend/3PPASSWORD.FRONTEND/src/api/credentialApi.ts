import axios from "axios";
import type { Credential } from "../types/credential";

const API_BASE_URL = "https://localhost:7230/api";

export async function getCredentials(): Promise<Credential[]> {
    const response = await axios.get<Credential[]>(
        `${API_BASE_URL}/credentials`
    );
    
    return response.data;
}