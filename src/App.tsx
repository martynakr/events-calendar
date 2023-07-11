import { useContext, useEffect, useState } from "react";
import styles from "./App.module.scss";
import {
    convertToInputString,
    generateDays,
    isAfterToday,
} from "./utils/date-utils";

import Modal from "./components/Modal/Modal";
import Form from "./components/Form/Form";
import Input from "./components/Form/Input/Input";
import Button, { ButtonVariant } from "./components/Button/Button";
import Select from "./components/Form/Select/Select";
import EventsContextProvider, {
    EventsContext,
} from "./context/EventsContext.tsx";
import Calendar from "./containers/Calendar/Calendar.tsx";
import ClickedDayProvider, {
    ClickedDayContext,
} from "./context/ClickedDayProvider.tsx";
import { createEvent, getEvents } from "./services/services.ts";
import { FormProvider, useForm } from "react-hook-form";

export interface Event {
    startDate: string;
    endDate: string;
    startHour: string;
    finishHour: string;
    eventName: string;
    labels: string[];
}

function App() {
    const [showModal, setShowModal] = useState<boolean>(false);
    // const { updatedEvents, setUpdatedEvents } = useContext(EventsContext);
    const { clickedDay } = useContext(ClickedDayContext);

    const onFormSubmit = async (data: Event) => {
        await createEvent(data);
        setShowModal(false);
    };

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

    useEffect(() => {
        console.log(clickedDay, "clicked day form app");
        console.log(convertToInputString(clickedDay));
        setValue("startDate", convertToInputString(clickedDay));
        setValue("endDate", convertToInputString(clickedDay));
        console.log("set values");
    }, [clickedDay]);

    return (
        <EventsContextProvider>
            <ClickedDayProvider>
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
                <Calendar setShowModal={setShowModal} />
            </ClickedDayProvider>
        </EventsContextProvider>
    );
}

export default App;
