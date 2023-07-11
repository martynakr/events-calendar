import styles from "./EventCard.module.scss";

const EventCard = ({ eventName, isNotFirstEventDay }: any) => {
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
    return (
        <div className={styles.EventCard}>
            <div>
                <p>{eventName}</p>
            </div>
        </div>
    );
};

export default EventCard;
// 300
// 500

//
