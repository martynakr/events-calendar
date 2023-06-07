import { useEffect, useState } from "react";
import "./App.scss";
import { generateDays } from "./utils/date-utils";
import Table from "./components/Table/Table";
import TableHead from "./components/Table/TableHead";
import TableBody from "./components/Table/TableBody";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function App() {
    const [today, setToday] = useState<Date | null>(null);

    // one state for all 3?
    const [currentMonthDays, setCurrentMonthDays] = useState<Date[][] | null>(
        null
    );
    const [displayedMonth, setDisplayedMonth] = useState<number>(0);
    const [displayedYear, setDisplayedYear] = useState<number>(0);

    useEffect(() => {
        setToday(new Date());
    }, []);

    useEffect(() => {
        if (today) {
            setDisplayedMonth(today.getMonth());
            setDisplayedYear(today.getFullYear());
        }
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

    const daysOfWeek = currentMonthDays
        ? currentMonthDays[currentMonthDays.length - 1].map((date) =>
              date.toLocaleString("default", { weekday: "short" })
          )
        : [""];

    console.log(daysOfWeek);

    // static data would be better?
    return (
        <>
            {today && (
                <>
                    <div className="container">
                        <button onClick={handlePrevClick}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <h1>
                            {new Date(
                                displayedYear,
                                displayedMonth + 1,
                                0
                            ).toLocaleString("default", { month: "long" })}{" "}
                            {displayedYear}
                        </h1>

                        <button onClick={handleNextClick}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                    {daysOfWeek && currentMonthDays && (
                        <Table>
                            <TableHead columnNames={daysOfWeek} />
                            <TableBody weeks={currentMonthDays} />
                        </Table>
                    )}
                </>
            )}
        </>
    );
}

export default App;

// <FontAwesomeIcon icon="fa-sharp fa-solid fa-circle-arrow-right" />
// <FontAwesomeIcon icon="fa-sharp fa-solid fa-circle-arrow-left" />
// <FontAwesomeIcon icon="fa-regular fa-angle-left" />
//<FontAwesomeIcon icon="fa-regular fa-angle-right" />;
