import { useContext, useEffect } from "react";
import styles from "./EventCard.module.scss";
import { ClickedEventContext } from "../../context/ClickedEventProvider";

const EventCard = ({ event, isNotFirstEventDay }: any) => {
    const { setShowEventModal, setClickedEvent, showEventModal } =
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

    const handleClick = () => {
        setShowEventModal(true);
        setClickedEvent(event);
        console.log("clicked");
    };

    useEffect(() => {
        console.log("state updated");
    }, [showEventModal]);
    return (
        <div className={styles.EventCard} onClick={handleClick}>
            <div>
                <p>{event.eventName}</p>
            </div>
        </div>
    );
};

export default EventCard;
// 300
// 500

//
