import { saveCsrfToken } from "./auth";

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

export const MAIN_URL = "http://localhost:8080";

export const createEvent = async (data: any) => {
    console.log(data, "POST EVENT");
    console.log(
        document.cookie.replace(
            /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
        ),
        "get csrf token"
    );
    const response = await fetch(`${MAIN_URL}/events`, {
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
    saveCsrfToken();
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
    //saveCsrfToken();

    return data;
};
