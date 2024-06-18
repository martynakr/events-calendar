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
    const response = await fetch(`${MAIN_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Could not register, try again later");
    }
    return response;
};

export const login = async (data: LoginData) => {
    const response = await fetch(`${MAIN_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Could not login, try again");
    }

    return response;
};

export const logout = async () => {
    const response = await fetch(`${MAIN_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Could not logout, try again");
    }
};
