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
    console.log(data);
    const response = await fetch(`${MAIN_URL}/events`, {
        method: "POST",
        credentials: "include",
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
