import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { ButtonVariant } from "../../components/Button/Button";
import Nav from "../../components/Nav/Nav";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead/TableHead";
import TableBody from "../../components/Table/TableBody/TableBody";
import { useContext, useEffect, useState } from "react";
import { getEvents } from "../../services/services";
import { EventsContext } from "../../context/EventsContext";
import { generateDays } from "../../utils/date-utils";
import styles from "./Calendar.module.scss";
interface ICalendarProps {
    setShowModal: (data: boolean) => unknown;
}
const Calendar = ({ setShowModal }: ICalendarProps) => {
    const [today, setToday] = useState<Date>(new Date());

    // one state for all 3?
    const [currentMonthDays, setCurrentMonthDays] = useState<Date[][] | null>(
        null
    );
    const [displayedMonth, setDisplayedMonth] = useState<number>(0);
    const [displayedYear, setDisplayedYear] = useState<number>(0);
    const { setEvents, updatedEvents } = useContext(EventsContext);

    useEffect(() => {
        getEvents().then((res) => {
            setEvents(res);
        });
        console.log("updated state");
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

    const daysOfWeek = currentMonthDays
        ? currentMonthDays[currentMonthDays.length - 1].map((date) =>
              date.toLocaleString("default", { weekday: "short" })
          )
        : [""];

    // static data would be better?

    const handleTodayClick = () => {
        if (displayedMonth !== today.getMonth()) {
            setDisplayedMonth(today.getMonth());
        }

        if (displayedYear !== today.getFullYear()) {
            setDisplayedYear(today.getFullYear());
        }
    };
    return (
        <div className={styles.Calendar}>
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
        </div>
    );
};

export default Calendar;
