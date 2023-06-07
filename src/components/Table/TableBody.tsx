import TableCell from "./TableCell/TableCell";

interface ITableBodyProps {
    weeks: Date[][];
}

const TableBody = ({ weeks }: ITableBodyProps) => {
    const currMonth = weeks[Math.floor(weeks.length / 2)][0].getMonth();
    return (
        <tbody>
            {weeks.map((week, i) => {
                return (
                    <tr key={i}>
                        {week.map((day, i) => {
                            return (
                                <TableCell
                                    key={i}
                                    dateInfo={day}
                                    currMonth={currMonth}
                                />
                            );
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;
