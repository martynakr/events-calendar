import { redirect, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import Button, { ButtonVariant } from "../Button/Button";
import styles from "./Nav.module.scss";

interface NavProps {
    onClick: () => unknown;
}

const Nav = ({ onClick }: NavProps) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <nav className={styles.Nav}>
            <a
                onClick={onClick}
                className={`${styles.Nav_Link} ${styles.Nav_Today}`}
            >
                TODAY
            </a>
            <Button
                variant={ButtonVariant.PRIMARY}
                extraClasses={`${styles.Nav_Logout}`}
                onClick={handleLogout}
            >
                Logout
            </Button>
        </nav>
    );
};

export default Nav;
