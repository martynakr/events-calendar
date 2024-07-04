import instance from "./axios";

export interface Label {
    name: string;
}

export interface LabelFromBackend {
    id: number;
    name: string;
    colour: string;
}

export const getLabels = async (): Promise<LabelFromBackend[]> => {
    const response = await instance.get("/labels");
    console.log(response, "labels response");
    return response.data;
};

export const createLabel = async (data: Label) => {
    const response = await instance.post("/labels", data);
    return response.data;
};
