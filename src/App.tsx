import EventsContextProvider from "./context/EventsContext.tsx";
import Calendar from "./containers/Calendar/Calendar.tsx";
import ClickedDayProvider from "./context/ClickedDayProvider.tsx";
import ClickedEventProvider from "./context/ClickedEventProvider.tsx";
import WindowSizeProvider from "./context/WindowSizeProvider.tsx";

function App() {
    return (
        <WindowSizeProvider>
            <ClickedEventProvider>
                <EventsContextProvider>
                    <ClickedDayProvider>
                        <Calendar />
                    </ClickedDayProvider>
                </EventsContextProvider>
            </ClickedEventProvider>
        </WindowSizeProvider>
    );
}

export default App;
