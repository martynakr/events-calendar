import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { generateDays } from "./utils/date-utils";
import Table from "./components/Table/Table";
import TableHead from "./components/Table/TableHead/TableHead";
import TableBody from "./components/Table/TableBody/TableBody";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./components/Modal/Modal";
import Nav from "./components/Nav/Nav";
import Form from "./components/Form/Form";
import Input, { InputSizes } from "./components/Form/Input/Input";
import Button, { ButtonVariant } from "./components/Button/Button";
import Select from "./components/Form/Select/Select";

function App() {
    const [today, setToday] = useState<Date | null>(null);

    // one state for all 3?
    const [currentMonthDays, setCurrentMonthDays] = useState<Date[][] | null>(
        null
    );
    const [displayedMonth, setDisplayedMonth] = useState<number>(0);
    const [displayedYear, setDisplayedYear] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);

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

    const handleTodayClick = () => {
        if (today) {
            if (displayedMonth !== today.getMonth()) {
                setDisplayedMonth(today.getMonth());
            }

            if (displayedYear !== today.getFullYear()) {
                setDisplayedYear(today.getFullYear());
            }
        }
    };

    const onFormSubmit = (data: any) => {
        console.log(data);
    };

    console.log(new Date().toISOString());

    return (
        <>
            {today && (
                <>
                    <Modal show={showModal} setShow={setShowModal}>
                        <h2>Create a new event</h2>
                        <Form
                            onSubmit={onFormSubmit}
                            defaults={{
                                startDate: new Date()
                                    .toISOString()
                                    .substring(0, 10),
                                startHour: new Date()
                                    .toISOString()
                                    .substring(11, 16),
                                finishHour: "10:00",
                            }}
                        >
                            <Input
                                labelText="Event name"
                                type="text"
                                id="eventName"
                            />
                            <div className={styles.container}>
                                <Input
                                    labelText="Start Date"
                                    type="date"
                                    id="startDate"
                                />
                                <Input
                                    labelText="Start Time"
                                    type="time"
                                    id="startHour"
                                />
                            </div>
                            <div className={styles.container}>
                                <Input
                                    labelText="End Date"
                                    type="date"
                                    id="endDate"
                                />
                                <Input
                                    type="time"
                                    id="finishHour"
                                    labelText="End Time"
                                />
                            </div>
                            <Select options={["sport", "fun"]} id="labels" />
                            <div>
                                <Button
                                    variant={ButtonVariant.SECONDARY}
                                    type="reset"
                                >
                                    Clear
                                </Button>
                                <Button
                                    variant={ButtonVariant.PRIMARY}
                                    type="submit"
                                >
                                    Create
                                </Button>
                            </div>
                        </Form>
                    </Modal>
                    <Nav onClick={handleTodayClick} />
                    <div className={styles.App_Container}>
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
                            ).toLocaleString("default", { month: "long" })}{" "}
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
                                onClick={setShowModal}
                            />
                        </Table>
                    )}
                </>
            )}
        </>
    );
}

export default App;
