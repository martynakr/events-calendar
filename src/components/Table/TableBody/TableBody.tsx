import TableCell from "../TableCell/TableCell";

interface ITableBodyProps {
    weeks: Date[][];
    onClick: (data: boolean) => unknown;
}

const TableBody = ({ weeks, onClick }: ITableBodyProps) => {
    const currMonth = weeks[Math.floor(weeks.length / 2)][0].getMonth();
    return (
        <tbody>
            {weeks.map((week, i) => {
                return (
                    // what can I use instead of index here?
                    <tr key={i}>
                        {week.map((day, i) => {
                            return (
                                <TableCell
                                    onClick={onClick}
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
