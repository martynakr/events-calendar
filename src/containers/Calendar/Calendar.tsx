import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { ButtonVariant } from "../../components/Button/Button";
import Nav from "../../components/Nav/Nav";
import {
    faChevronLeft,
    faChevronRight,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead/TableHead";
import TableBody from "../../components/Table/TableBody/TableBody";
import { useContext, useEffect, useState } from "react";
import { getEvents } from "../../services/services";
import { EventsContext } from "../../context/EventsContext";
import { generateDays } from "../../utils/date-utils";
import styles from "./Calendar.module.scss";
import AddEventModal from "../AddEventModal/AddEventModal";
import EventDetailsModal from "../EventDetailsModal/EventDetailsModal";
import { WindowSizeContext } from "../../context/WindowSizeProvider";
import { ClickedDayContext } from "../../context/ClickedDayProvider";
import EventCard from "../../components/EventCard/EventCard";
import { AuthContext } from "../../context/AuthProvider";

export interface Event {
    startDate: string;
    endDate: string;
    startHour: string;
    finishHour: string;
    eventName: string;
    labels: string[];
}

const Calendar = () => {
    const [today, setToday] = useState<Date>(new Date());
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentMonthDays, setCurrentMonthDays] = useState<Date[][] | null>(
        null
    );
    const [displayedMonth, setDisplayedMonth] = useState<number>(0);
    const [displayedYear, setDisplayedYear] = useState<number>(0);
    const { setEvents, updatedEvents, events } = useContext(EventsContext);
    const { isTabletAndBelow } = useContext(WindowSizeContext);
    const [eventsForDay, setEventsForDay] = useState<any>([]);
    const { clickedDay } = useContext(ClickedDayContext);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (token)
            getEvents(token).then((res) => {
                setEvents(res);
            });
        // if not token redirect to login
    }, [updatedEvents]);

    useEffect(() => {
        setDisplayedMonth(today.getMonth());
        setDisplayedYear(today.getFullYear());
    }, [today]);

    useEffect(() => {
        setCurrentMonthDays(generateDays(displayedYear, displayedMonth));
    }, [displayedMonth, displayedYear]);

    const handlePrevClick = () => {
        if (displayedMonth === 0) {
            setDisplayedMonth(11);
            setDisplayedYear(displayedYear - 1);
            return;
        }
        setDisplayedMonth(displayedMonth - 1);
    };

    const handleNextClick = () => {
        if (displayedMonth === 11) {
            setDisplayedMonth(0);
            setDisplayedYear(displayedYear + 1);
            return;
        }
        setDisplayedMonth(displayedMonth + 1);
    };

    const handleCellClick = () => {
        setShowModal(true);
    };

    // static data would be better?
    const daysOfWeek = currentMonthDays
        ? currentMonthDays[currentMonthDays.length - 1].map((date) =>
              date.toLocaleString("default", { weekday: "short" })
          )
        : [""];

    const handleTodayClick = () => {
        if (displayedMonth !== today.getMonth()) {
            setDisplayedMonth(today.getMonth());
        }

        if (displayedYear !== today.getFullYear()) {
            setDisplayedYear(today.getFullYear());
        }
    };

    useEffect(() => {
        if (events) {
            const filteredEvents = events.filter((ev: any) => {
                return (
                    new Date(ev.startDate).toLocaleDateString() ===
                        clickedDay.toLocaleDateString() ||
                    (new Date(ev.startDate) <= clickedDay &&
                        new Date(ev.endDate) >= clickedDay)
                );
            });
            setEventsForDay(filteredEvents);
        }
    }, [clickedDay]);
    return (
        <div className={styles.Calendar}>
            <AddEventModal setShowModal={setShowModal} showModal={showModal} />
            <EventDetailsModal />
            <Nav onClick={handleTodayClick} />
            <div className={styles.Calendar_Container}>
                <Button
                    data-testid={"prevBtn"}
                    onClick={handlePrevClick}
                    variant={ButtonVariant.ICON}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
                <h1>
                    {new Date(
                        displayedYear,
                        displayedMonth + 1,
                        0
                    ).toLocaleString("default", {
                        month: "long",
                    })}{" "}
                    {displayedYear}
                </h1>

                <Button
                    data-testid={"nextBtn"}
                    onClick={handleNextClick}
                    variant={ButtonVariant.ICON}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </Button>
            </div>
            {daysOfWeek.length > 1 && currentMonthDays && (
                <Table>
                    <TableHead columnNames={daysOfWeek} />
                    <TableBody
                        weeks={currentMonthDays}
                        onClick={handleCellClick}
                    />
                </Table>
            )}
            {isTabletAndBelow && (
                <div>
                    <div className={styles.Calendar_Container}>
                        <h3>Events for {clickedDay.toLocaleDateString()}</h3>
                        <Button
                            variant={ButtonVariant.ICON}
                            onClick={() => setShowModal(true)}
                        >
                            {" "}
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </div>
                    {eventsForDay.length > 0 &&
                        eventsForDay.map((ev: any) => {
                            return <EventCard event={ev} key={ev.id} />;
                        })}
                    {eventsForDay.length === 0 && <p>No events</p>}
                </div>
            )}
        </div>
    );
};

export default Calendar;
