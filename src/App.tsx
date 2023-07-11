import EventsContextProvider from "./context/EventsContext.tsx";
import Calendar from "./containers/Calendar/Calendar.tsx";
import ClickedDayProvider from "./context/ClickedDayProvider.tsx";
import ClickedEventProvider from "./context/ClickedEventProvider.tsx";

function App() {
    return (
        <ClickedEventProvider>
            <EventsContextProvider>
                <ClickedDayProvider>
                    <Calendar />
                </ClickedDayProvider>
            </EventsContextProvider>
        </ClickedEventProvider>
    );
}

export default App;
