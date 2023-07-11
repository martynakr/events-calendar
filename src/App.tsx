import EventsContextProvider from "./context/EventsContext.tsx";
import Calendar from "./containers/Calendar/Calendar.tsx";
import ClickedDayProvider from "./context/ClickedDayProvider.tsx";

export interface Event {
    startDate: string;
    endDate: string;
    startHour: string;
    finishHour: string;
    eventName: string;
    labels: string[];
}

function App() {
    return (
        <EventsContextProvider>
            <ClickedDayProvider>
                <Calendar />
            </ClickedDayProvider>
        </EventsContextProvider>
    );
}

export default App;
