import instance from "./axios";

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export const MAIN_URL = "http://localhost:8080";

export const register = async (data: RegisterData) => {
    await instance.post("/auth/register", data);
};

export const login = async (data: LoginData) => {
    await instance.post("/auth/login", data);
};

export const logout = async () => {
    await instance.post("/auth/logout");
};

export const getToken = async () => {
    await instance.get("/auth/token");
};
