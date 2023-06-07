interface ITableHeadProps {
    columnNames: string[];
}

const TableHead = ({ columnNames }: ITableHeadProps) => {
    return (
        <thead>
            <tr>
                {columnNames.map((colName, i) => {
                    return <th key={i}>{colName.toUpperCase()}</th>;
                })}
            </tr>
        </thead>
    );
};

export default TableHead;
