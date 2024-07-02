import { ReactNode, createContext, useState } from "react";
import { Event } from "../containers/Calendar/Calendar";

interface ClickedEventContextProps {
    readonly showEventModal: boolean;
    readonly setShowEventModal: (val: boolean) => void;
    readonly clickedEvent: Event | null;
    readonly setClickedEvent: (data: Event) => void;
}

interface IContextProps {
    children: ReactNode;
}

export const ClickedEventContext = createContext<ClickedEventContextProps>({
    showEventModal: false,
    setShowEventModal: () => null,
    clickedEvent: null,
    setClickedEvent: () => null,
});
const ClickedEventProvider = ({ children }: IContextProps) => {
    const [showEventModal, setShowEventModal] = useState<boolean>(false);

    const [clickedEvent, setClickedEvent] = useState<Event | null>(null);

    return (
        <ClickedEventContext.Provider
            value={{
                setClickedEvent,
                clickedEvent,
                setShowEventModal,
                showEventModal,
            }}
        >
            {children}
        </ClickedEventContext.Provider>
    );
};

export default ClickedEventProvider;
