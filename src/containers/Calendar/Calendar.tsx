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
import { createEvent, getEvents } from "../../services/services";
import { EventsContext } from "../../context/EventsContext";
import {
    convertToInputString,
    generateDays,
    isAfterToday,
} from "../../utils/date-utils";
import styles from "./Calendar.module.scss";
import { Form, FormProvider, useForm } from "react-hook-form";
import Modal from "../../components/Modal/Modal";
import Select from "../../components/Form/Select/Select";
import Input from "../../components/Form/Input/Input";
import { ClickedDayContext } from "../../context/ClickedDayProvider";

const Calendar = () => {
    const [today, setToday] = useState<Date>(new Date());
    const [showModal, setShowModal] = useState<boolean>(false);
    // const { updatedEvents, setUpdatedEvents } = useContext(EventsContext);
    const { clickedDay } = useContext(ClickedDayContext);
    const methods = useForm({
        defaultValues: {
            startDate: convertToInputString(clickedDay),
            startHour: new Date().toLocaleTimeString("en-AU", {
                hour: "numeric",
                minute: "2-digit",
                hour12: false,
            }),
            finishHour: new Date(
                Date.now() + 60 * 60 * 1000
            ).toLocaleTimeString("en-AU", {
                hour: "numeric",
                minute: "2-digit",
                hour12: false,
            }),
            endDate: convertToInputString(clickedDay),
            eventName: "",
            labels: [],
        },
    });

    const {
        setValue,
        formState: { isSubmitSuccessful },
    } = methods;

    const { handleSubmit } = methods;

    const onFormSubmit = async (data: Event) => {
        await createEvent(data);
        setShowModal(false);
    };

    useEffect(() => {
        setValue("startDate", convertToInputString(clickedDay));
        setValue("endDate", convertToInputString(clickedDay));
    }, [clickedDay]);

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
            <Modal show={showModal} setShow={setShowModal}>
                <h2>Create a new event</h2>
                <FormProvider {...methods}>
                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <Input
                            labelText="Event name"
                            type="text"
                            id="eventName"
                            validation={{
                                required: {
                                    value: true,
                                    message: "Event name is required",
                                },
                            }}
                        />
                        <div className={styles.container}>
                            <Input
                                labelText="Start Date"
                                type="date"
                                id="startDate"
                                validation={{
                                    validate: {
                                        afterToday: (value: string) =>
                                            isAfterToday(value) ||
                                            "Cannot create events in the past",
                                    },
                                }}
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
                </FormProvider>
            </Modal>
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
