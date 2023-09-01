import styles from "./Nav.module.scss";

interface INavProps {
    onClick: () => unknown;
}

const Nav = ({ onClick }: INavProps) => {
    return (
        <div>
            <a onClick={onClick} className={styles.Link}>
                TODAY
            </a>
        </div>
    );
};

export default Nav;
