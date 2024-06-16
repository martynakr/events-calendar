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

export interface LabelFromBackend {
    id: number;
    name: string;
    colour: string;
}

interface Label {
    name: string;
}

export interface EventData {
    name: string;
    startDate: Date;
    endDate: Date;
    labels: Label[];
}

const MAIN_URL = "http://localhost:8080";

export const createEvent = async (data: any) => {
    console.log(data);
    const response = await fetch(`${MAIN_URL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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

export const getEvents = async () => {
    const response = await fetch(`${MAIN_URL}/events`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Could not fetch events");
    }
    const data = await response.json();
    console.log(data, "EVENTS");
    return data;
};

export const getLabels = async (): Promise<LabelFromBackend[]> => {
    const response = await fetch(`${MAIN_URL}/labels`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Could not fetch events");
    }
    const data = await response.json();
    console.log(data, "labels");

    return data;
};

export const register = async (data: RegisterData) => {
    const response = await fetch(`${MAIN_URL}/auth/register`, {
        method: "POST",
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
    console.log(data, "LOgin data");
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
