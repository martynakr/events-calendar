import { useContext } from "react";
import styles from "./EventCard.module.scss";
import { ClickedEventContext } from "../../context/ClickedEventProvider";

const EventCard = ({ event, isNotFirstEventDay }: any) => {
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

    const handleClick = () => {
        setShowEventModal(true);
        setClickedEvent(event);
    };

    return (
        <div className={styles.EventCard} onClick={handleClick}>
            <div>
                <p>{event.name}</p>
            </div>
        </div>
    );
};

export default EventCard;
