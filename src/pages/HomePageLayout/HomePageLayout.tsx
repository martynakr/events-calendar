import styles from "./HomePageLayout.module.scss";
import calendarImage from "../../assets/calendar.png";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const HomePageLayout = ({ children }: LayoutProps) => {
    return (
        <main className={styles.HomePage}>
            <div
                className={`${styles.HomePage_Section} ${styles.HomePage_Calendar}`}
            >
                <h1>Events Calendar</h1>
                <p>Always be on top of your schedule</p>
                <img
                    src={calendarImage}
                    alt="calendar page"
                    className={styles.HomePage_Calendar_Image}
                />
            </div>
            <div className={styles.HomePage_Section}>{children}</div>
        </main>
    );
};

export default HomePageLayout;
