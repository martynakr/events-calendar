import { ReactNode, createContext, useEffect, useState } from "react";

interface ContextProps {
    readonly isTabletAndBelow: boolean;
    readonly setIsTabletAndBelow: (data: boolean) => void;
}
export const WindowSizeContext = createContext<ContextProps>({
    isTabletAndBelow: window.innerWidth <= 992,
    setIsTabletAndBelow: () => null,
});

interface IContextProps {
    children: ReactNode;
}

const WindowSizeProvider = ({ children }: IContextProps) => {
    const [isTabletAndBelow, setIsTabletAndBelow] = useState(
        window.innerWidth <= 992
    );

    const updateMedia = () => {
        setIsTabletAndBelow(window.innerWidth <= 992);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <WindowSizeContext.Provider
            value={{ isTabletAndBelow, setIsTabletAndBelow }}
        >
            {children}
        </WindowSizeContext.Provider>
    );
};

export default WindowSizeProvider;
