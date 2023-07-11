import { ReactNode, createContext, useState } from "react";
import { Event } from "../App";

interface ContextProps {
    readonly events: any;
    readonly setEvents: (data: any) => void;
    readonly updatedEvents: number;
    readonly setUpdatedEvents: (data: number) => void;
}
export const EventsContext = createContext<ContextProps>({
    events: null,
    setEvents: () => null,
    updatedEvents: 0,
    setUpdatedEvents: () => null,
});

interface IContextProps {
    children: ReactNode;
}

const EventsContextProvider = ({ children }: IContextProps) => {
    const [events, setEvents] = useState<Event[] | null>(null);
    const [updatedEvents, setUpdatedEvents] = useState<number>(0);
    console.log(updatedEvents, "updated events from context");
    return (
        <EventsContext.Provider
            value={{ events, setEvents, updatedEvents, setUpdatedEvents }}
        >
            {children}
        </EventsContext.Provider>
    );
};

export default EventsContextProvider;
