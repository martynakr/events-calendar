import { useContext } from "react";
import Modal from "../../components/Modal/Modal";
import { ClickedEventContext } from "../../context/ClickedEventProvider";
import { isAfterToday } from "../../utils/date-utils";

const EventDetailsModal = () => {
    const { clickedEvent, setShowEventModal, showEventModal } =
        useContext(ClickedEventContext);
    return (
        <Modal show={showEventModal} setShow={setShowEventModal}>
            {clickedEvent && <h3>{clickedEvent.eventName}</h3>}
            {clickedEvent && isAfterToday(clickedEvent?.startDate) ? (
                <p>Countdown</p>
            ) : (
                <p>This event already happened</p>
            )}
        </Modal>
    );
};

export default EventDetailsModal;
