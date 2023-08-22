import { useContext, useEffect, useState } from "react";
import styles from "./TableCell.module.scss";
import { EventsContext } from "../../../context/EventsContext";
import EventCard from "../../EventCard/EventCard";
import { isNotFirstEventDay } from "../../../utils/date-utils";
import { ClickedDayContext } from "../../../context/ClickedDayProvider";
import { WindowSizeContext } from "../../../context/WindowSizeProvider";

interface ITableCellProps {
    dateInfo: Date;
    currMonth: number;
    onClick: (data: Date) => unknown;
}

const TableCell = ({ dateInfo, currMonth, onClick }: ITableCellProps) => {
    const [eventsForDay, setEventsForDay] = useState<any>([]);
    const { events } = useContext(EventsContext);
    const { isTabletAndBelow } = useContext(WindowSizeContext);
    const { setClickedDay } = useContext(ClickedDayContext);

    useEffect(() => {
        if (events) {
            const filteredEvents = events.filter((ev: any) => {
                return (
                    new Date(ev.startDate).toLocaleDateString() ===
                        dateInfo.toLocaleDateString() ||
                    (new Date(ev.startDate) <= dateInfo &&
                        new Date(ev.endDate) >= dateInfo)
                );
            });
            setEventsForDay(filteredEvents);
        }
    }, [events, currMonth]);

    const today = new Date();

    let classes =
        currMonth === dateInfo.getMonth()
            ? `${styles.TableCell}`
            : `${styles.TableCell} ${styles.TableCell_Inactive}`;

    if (
        today.setHours(0, 0, 0, 0).toLocaleString() ===
        dateInfo.setHours(0, 0, 0, 0).toLocaleString()
    )
        classes += ` ${styles.TableCell_Today}`;
    return !isTabletAndBelow ? (
        <td className={classes}>
            <div
                onClick={() => {
                    onClick(dateInfo);
                    setClickedDay(dateInfo);
                }}
                className={styles.TableCell_Clickable_Div}
            >
                <p>
                    {dateInfo.getDate().toString().length < 2
                        ? "0" + dateInfo.getDate()
                        : dateInfo.getDate()}
                </p>
            </div>
            {eventsForDay.length > 0 &&
                eventsForDay.map((ev: any) => {
                    // const duartion =
                    //     (new Date(ev.endDay).getTime() -
                    //         new Date(ev.startDay).getTime()) /
                    //         (1000 * 60 * 60 * 24) +
                    //     1;
                    // console.log(duartion, "duration", ev.name);
                    return (
                        <EventCard
                            event={ev}
                            key={ev.id}
                            isNotFirstEventDay={isNotFirstEventDay(
                                dateInfo,
                                ev
                            )}
                        />
                    );
                })}
        </td>
    ) : (
        <td className={classes} onClick={() => setClickedDay(dateInfo)}>
            <p>
                {dateInfo.getDate().toString().length < 2
                    ? "0" + dateInfo.getDate()
                    : dateInfo.getDate()}
            </p>
            {eventsForDay.length > 0 && (
                <div className={styles.TableCell_Small_Event}></div>
            )}
        </td>
    );
};

export default TableCell;
