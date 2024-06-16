import EventsContextProvider from "./context/EventsContext.tsx";
import Calendar from "./containers/Calendar/Calendar.tsx";
import ClickedDayProvider from "./context/ClickedDayProvider.tsx";
import ClickedEventProvider from "./context/ClickedEventProvider.tsx";
import WindowSizeProvider from "./context/WindowSizeProvider.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Register/RegisterPage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route
                    path="/calendar"
                    element={
                        <WindowSizeProvider>
                            <ClickedEventProvider>
                                <EventsContextProvider>
                                    <ClickedDayProvider>
                                        <Calendar />
                                    </ClickedDayProvider>
                                </EventsContextProvider>
                            </ClickedEventProvider>
                        </WindowSizeProvider>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
