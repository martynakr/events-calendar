interface INavProps {
    onClick: () => unknown;
}

const Nav = ({ onClick }: INavProps) => {
    return (
        <div>
            <a onClick={onClick}>TODAY</a>
        </div>
    );
};

export default Nav;
