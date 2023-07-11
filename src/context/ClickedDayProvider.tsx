import { ReactNode, createContext, useState } from "react";

interface ContextProps {
    readonly clickedDay: Date;
    readonly setClickedDay: (date: Date) => void;
}
export const ClickedDayContext = createContext<ContextProps>({
    clickedDay: new Date(),
    setClickedDay: () => null,
});

interface IContextProps {
    children: ReactNode;
}

const ClickedDayProvider = ({ children }: IContextProps) => {
    const [clickedDay, setClickedDay] = useState<Date>(new Date());

    console.log(clickedDay, "clicked day");
    return (
        <ClickedDayContext.Provider value={{ clickedDay, setClickedDay }}>
            {children}
        </ClickedDayContext.Provider>
    );
};

export default ClickedDayProvider;
