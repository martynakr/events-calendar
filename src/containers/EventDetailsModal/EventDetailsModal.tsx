import { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { ClickedEventContext } from "../../context/ClickedEventProvider";
import { countdown, isAfterToday } from "../../utils/date-utils";

const EventDetailsModal = () => {
    const { clickedEvent, setShowEventModal, showEventModal } =
        useContext(ClickedEventContext);

    const [timeUntil, setTimeUntil] = useState<any>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [calculating, setCalculating] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    let intervalId: any;
    useEffect(() => {
        if (showEventModal && clickedEvent) {
            setCalculating(true);
            setError(false);
            intervalId = setInterval(() => {
                try {
                    setTimeUntil(countdown(new Date(clickedEvent.startDate)));
                } catch (e) {
                    setError(true);
                } finally {
                    setCalculating(false);
                }
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [showEventModal]);

    return (
        <Modal show={showEventModal} setShow={setShowEventModal}>
            {clickedEvent && <h3>{clickedEvent.eventName}</h3>}
            {clickedEvent && !error && !calculating && (
                <>
                    <p>
                        {timeUntil.days} days : {timeUntil.hours} h :&nbsp;
                        {timeUntil.minutes} min : {timeUntil.seconds} s
                    </p>
                    <p>unitl this event</p>
                </>
            )}
            {error && <p>This event already started</p>}
            {calculating && <p>Calculating...</p>}
        </Modal>
    );
};

export default EventDetailsModal;
