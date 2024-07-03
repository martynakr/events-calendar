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
    const response = await instance.post("/auth/register", data);
};

export const login = async (data: LoginData) => {
    const response = await instance.post("/auth/login", data);
    // const response = await fetch(`${MAIN_URL}/auth/login`, {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "X-XSRF-TOKEN": document.cookie.replace(
    //             /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
    //             "$1"
    //         ),
    //     },
    //     body: JSON.stringify(data),
    // });

    // if (!response.ok) {
    //     throw new Error("Could not login, try again");
    // }

    // return response;
};

export const logout = async () => {
    const response = await instance.post("/auth/logout");
};

export const getToken = async () => {
    await instance.get("/auth/token");
};
