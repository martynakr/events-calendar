import { useContext, useState } from "react";
import styles from "./EventCard.module.scss";
import { ClickedEventContext } from "../../context/ClickedEventProvider";
import Button, { ButtonVariant } from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { EventData } from "../../services/events";

interface EventCardProps {
    event: any;
    isNotFirstEventDay?: boolean;
    onDeleteClick: () => unknown;
}

const EventCard = ({
    event,
    isNotFirstEventDay,
    onDeleteClick,
}: EventCardProps) => {
    const { setShowEventModal, setClickedEvent } =
        useContext(ClickedEventContext);

    // return !isNotFirstEventDay ? (
    //     <div className={styles.EventCard}>
    //         <div>
    //             <p>{name}</p>
    //         </div>
    //     </div>
    // ) : (
    //     <div className={`${styles.EventCard} ${styles.EventCard_MiddleDay}`}>
    //         <p></p>
    //     </div>
    // );

    console.log(event, "");

    const handleClick = (e: any) => {
        e.stopPropagation();
        setShowEventModal(true);
        setClickedEvent(event);
    };

    return (
        <div className={styles.EventCard}>
            <p className={styles.EventCard__Text} onClick={handleClick}>
                {event.name}
            </p>
            <Button
                variant={ButtonVariant.ICON}
                extraClasses={styles.EventCard_Delete}
                onClick={onDeleteClick}
            >
                <FontAwesomeIcon icon={faX} />
            </Button>
        </div>
    );
};

export default EventCard;
