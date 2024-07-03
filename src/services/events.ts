import instance from "./axios";
import { Label } from "./labels";

export interface EventData {
    name: string;
    startDate: Date;
    endDate: Date;
    labels: Label[];
}

export const getEvents = async (): Promise<EventData> => {
    const response = await instance.get("/events");
    console.log(response, "events response");
    return response.data;
};

export const createEvent = async (data: any) => {
    console.log(data, "POST EVENT");
    const response = await instance.post("/events", data);
    return response.data;
};
