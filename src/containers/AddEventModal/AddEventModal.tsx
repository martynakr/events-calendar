import { useContext, useEffect, useState } from "react";
import { convertToInputString, isAfterToday } from "../../utils/date-utils";
import { ClickedDayContext } from "../../context/ClickedDayProvider";
import Modal from "../../components/Modal/Modal";
import { IEvent } from "../Calendar/Calendar";
import { createEvent } from "../../services/services";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";
import Button, { ButtonVariant } from "../../components/Button/Button";
import Select from "../../components/Form/Select/Select";
import styles from "../Calendar/Calendar.module.scss";
import { EventsContext } from "../../context/EventsContext";

interface IAddEventModalProps {
    showModal: boolean;
    setShowModal: (data: boolean) => unknown;
}

const AddEventModal = ({ showModal, setShowModal }: IAddEventModalProps) => {
    const { clickedDay } = useContext(ClickedDayContext);
    const { updatedEvents, setUpdatedEvents } = useContext(EventsContext);

    const defaults = {
        startDate: convertToInputString(clickedDay),
        startHour: new Date().toLocaleTimeString("en-AU", {
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
        }),
        finishHour: new Date(Date.now() + 60 * 60 * 1000).toLocaleTimeString(
            "en-AU",
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: false,
            }
        ),
        endDate: convertToInputString(clickedDay),
        eventName: "",
        labels: [],
    };

    const methods = useForm({
        defaultValues: defaults,
    });

    const {
        setValue,
        formState: { isSubmitSuccessful },
        reset,
    } = methods;

    const onFormSubmit = async (data: IEvent) => {
        await createEvent(data);
        setShowModal(false);
    };

    useEffect(() => {
        setUpdatedEvents(updatedEvents + 1);
        reset({ ...defaults });
    }, [isSubmitSuccessful]);

    useEffect(() => {
        setValue("startDate", convertToInputString(clickedDay));
        setValue("endDate", convertToInputString(clickedDay));
    }, [clickedDay]);
    return (
        <Modal show={showModal} setShow={setShowModal}>
            <h2>Create a new event</h2>
            <FormProvider {...methods}>
                <Form onSubmit={onFormSubmit}>
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
                        <Input labelText="End Date" type="date" id="endDate" />
                        <Input
                            type="time"
                            id="finishHour"
                            labelText="End Time"
                        />
                    </div>
                    <Select options={["sport", "fun"]} id="labels" />
                    <div>
                        <Button variant={ButtonVariant.SECONDARY} type="reset">
                            Clear
                        </Button>
                        <Button variant={ButtonVariant.PRIMARY} type="submit">
                            Create
                        </Button>
                    </div>
                </Form>
            </FormProvider>
        </Modal>
    );
};

export default AddEventModal;
