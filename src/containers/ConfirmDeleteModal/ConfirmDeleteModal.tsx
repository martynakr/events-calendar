import { useContext, useState } from "react";
import Button, { ButtonVariant } from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import styles from "./ConfirmDeleteModal.module.scss";
import { ClickedEventContext } from "../../context/ClickedEventProvider";
import { deleteEvent, getEvents } from "../../services/events";
import { EventsContext } from "../../context/EventsContext";

interface ConfirmDeleteModalProps {
    showModal: boolean;
    setShowModal: (data: boolean) => unknown;
}

interface Error {
    message: string | null;
    showError: boolean;
}
const ConfirmDeleteModal = ({
    showModal,
    setShowModal,
}: ConfirmDeleteModalProps) => {
    const { setShowConfirmDeleteModal, clickedEvent } =
        useContext(ClickedEventContext);
    const { setEvents } = useContext(EventsContext);
    const [error, setError] = useState<Error>({
        message: null,
        showError: false,
    });
    console.log(clickedEvent, "CLICKED EVENT");

    const handleDelete = async () => {
        try {
            if (clickedEvent) {
                await deleteEvent(clickedEvent.id);
                const updatedEvents = await getEvents();
                setEvents(updatedEvents);
                setShowConfirmDeleteModal(false);
            }
        } catch (e) {
            setError({ showError: true, message: "Could not delete event" });
        }
    };
    return (
        <Modal setShow={setShowModal} show={showModal}>
            <h2>{clickedEvent?.name}</h2>
            <p>Are you sure you want to delete this event?</p>
            <div className={styles.DeleteModal_Buttons}>
                <Button variant={ButtonVariant.PRIMARY} onClick={handleDelete}>
                    Delete
                </Button>
                <Button
                    variant={ButtonVariant.SECONDARY}
                    onClick={() => {
                        setShowConfirmDeleteModal(false);
                    }}
                >
                    Cancel
                </Button>
            </div>
            {error.showError && (
                <p className={styles.DeleteModal_Error}>{error.message}</p>
            )}
        </Modal>
    );
};

export default ConfirmDeleteModal;
