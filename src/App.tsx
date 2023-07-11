import EventsContextProvider from "./context/EventsContext.tsx";
import Calendar from "./containers/Calendar/Calendar.tsx";
import ClickedDayProvider from "./context/ClickedDayProvider.tsx";

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
