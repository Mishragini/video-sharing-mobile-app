import { getCurrentUser } from "@/lib/appwrite";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

interface GlobalContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    user: Models.Document | null;
    setUser: (user: Models.Document | null) => void;
    isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};

const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<Models.Document | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    setUser(res);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
            }
            }
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;