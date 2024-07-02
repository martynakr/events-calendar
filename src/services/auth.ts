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
            "X-XSRF-TOKEN": document.cookie.replace(
                /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
            ),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Could not register, try again later");
    }
    return response;
};

export const saveCsrfToken = () => {
    const csrfToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    if (csrfToken) {
        sessionStorage.setItem("X-XSRF-TOKEN", csrfToken);
    }
};

export const getCsrfToken = () => {
    return sessionStorage.getItem("X-XSRF-TOKEN") || "";
};

export const login = async (data: LoginData) => {
    const response = await fetch(`${MAIN_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": document.cookie.replace(
                /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
            ),
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
            "X-XSRF-TOKEN": document.cookie.replace(
                /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
            ),
        },
    });

    if (!response.ok) {
        throw new Error("Could not logout, try again");
    }
};

export const getToken = async () => {
    await fetch(`${MAIN_URL}/auth/token`);
    saveCsrfToken();
};
