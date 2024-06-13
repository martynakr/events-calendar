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

interface Label {
    name: string;
    // add id later
}

export interface EventData {
    name: string;
    startDate: Date;
    endDate: Date;
    labels: Label[];
}

const MAIN_URL = "http://localhost:8080";

export const createEvent = async (data: any, token: string) => {
    console.log(data);
    console.log(token, "TOKEN FROM CRETAE");
    const response = await fetch(`${MAIN_URL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    console.log(response, "RESPONSE CREATE");

    if (!response.ok) {
        throw new Error("Could not create an event");
    }

    const createdEvent = await response.json();
    return createdEvent;
};

export const getEvents = async (token: string) => {
    const response = await fetch(
        `${MAIN_URL}/events`,
        {
            credentials: "include",
        }
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
    );

    if (!response.ok) {
        throw new Error("Could not fetch events");
    }
    const data = await response.json();
    console.log(data, "EVENT DATA");

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
    console.log(data, "LOgin data");
    const response = await fetch(`${MAIN_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    console.log(response.ok, "RESPONSE OKAY");

    if (!response.ok) {
        throw new Error("Could not login, try again");
    }
    //return await response.json();
};
