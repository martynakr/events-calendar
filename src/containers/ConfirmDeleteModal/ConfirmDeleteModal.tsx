import Button, { ButtonVariant } from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import styles from "./ConfirmDeleteModal.module.scss";

interface ConfirmDeleteModalProps {
    showModal: boolean;
    setShowModal: (data: boolean) => unknown;
}

const ConfirmDeleteModal = ({
    showModal,
    setShowModal,
}: ConfirmDeleteModalProps) => {
    return (
        <Modal setShow={setShowModal} show={showModal}>
            {/* inc;ude what event */}

            <h2>Are you sure you want to delete this event?</h2>
            <div className={styles.DeleteModal_Buttons}>
                <Button variant={ButtonVariant.PRIMARY}>Delete</Button>
                <Button variant={ButtonVariant.SECONDARY}>Cancel</Button>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteModal;
