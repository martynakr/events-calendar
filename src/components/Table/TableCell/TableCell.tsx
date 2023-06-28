import styles from "./TableCell.module.scss";

interface ITableCellProps {
    dateInfo: Date;
    currMonth: number;
    onClick: (data: boolean) => unknown;
}

const TableCell = ({ dateInfo, currMonth, onClick }: ITableCellProps) => {
    const today = new Date();
    console.log();

    let classes =
        currMonth === dateInfo.getMonth()
            ? `${styles.TableCell}`
            : `${styles.TableCell} ${styles.TableCell_Inactive}`;

    if (
        today.setHours(0, 0, 0, 0).toLocaleString() ===
        dateInfo.setHours(0, 0, 0, 0).toLocaleString()
    )
        classes += ` ${styles.TableCell_Today}`;
    return (
        <td className={classes} onClick={() => onClick(true)}>
            <p>
                {dateInfo.getDate().toString().length < 2
                    ? "0" + dateInfo.getDate()
                    : dateInfo.getDate()}
            </p>
        </td>
    );
};

export default TableCell;
