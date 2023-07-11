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

export const getEvents = async () => {
    const response = await fetch("http://localhost:3000/events");
    const data = await response.json();
    console.log(data);
    return data;
};
