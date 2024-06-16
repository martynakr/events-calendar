import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthContextProps {
    readonly token: string | null;
    readonly setToken: (token: string) => void;
}
export const AuthContext = createContext<AuthContextProps>({
    token: null,
    setToken: () => null,
});

interface ContextProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: ContextProps) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        console.log(token, "TOKEN");
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
