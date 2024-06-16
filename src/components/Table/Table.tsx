import { ReactNode } from "react";
import styles from "./Table.module.scss";

interface ITableProps {
    children: ReactNode;
}

const Table = ({ children }: ITableProps) => {
    return <table className={styles.Table}>{children}</table>;
};

export default Table;
