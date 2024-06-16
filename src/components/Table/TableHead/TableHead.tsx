import styles from "./TableHead.module.scss";

interface ITableHeadProps {
    columnNames: string[];
}

const TableHead = ({ columnNames }: ITableHeadProps) => {
    return (
        <thead>
            <tr className={styles.TableHead}>
                {columnNames.map((colName, i) => {
                    // what to use onsetad of index?
                    return <th key={i}>{colName.toUpperCase()}</th>;
                })}
            </tr>
        </thead>
    );
};

export default TableHead;
