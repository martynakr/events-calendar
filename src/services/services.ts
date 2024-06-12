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

const MAIN_URL = "http://localhost:8080";

export const createEvent = async (data: any) => {
    console.log(JSON.stringify(data));
    const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    console.log(await response.json());
    // const back = await response.json();
    // console.log(back);
};

export const getEvents = async (token: string) => {
    const response = await fetch(`${MAIN_URL}/events`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Could not fetch events");
    }
    const data = await response.json();

    return data;
};

export const register = async (data: RegisterData) => {
    try {
        const response = await fetch(`${MAIN_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
        throw e;
    }

    // if (!response.ok) {
    //     throw new Error("Could not register, try again later");
    // }
    // const message = await response.json();
};

export const login = async (data: LoginData) => {
    const response = await fetch(`${MAIN_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Could not login, try again");
    }
    return await response.json();
};
