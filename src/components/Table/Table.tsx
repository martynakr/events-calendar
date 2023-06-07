import { ReactNode } from "react";

interface ITableProps {
    children: ReactNode;
}

const Table = ({ children }: ITableProps) => {
    return <table>{children}</table>;
};

export default Table;
