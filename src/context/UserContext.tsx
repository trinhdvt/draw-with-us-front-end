import React from "react";

interface IUser {
    sid: string;
    avatar?: string;
    name: string;
    id: string;
}

const DefaultUser: IUser = {
    name: "",
    id: "",
    sid: "",
    avatar: "https://cdn.trinhdvt.tech/avatar.png",
};

interface UserContextProps {
    user: IUser;
    setUser: (user: IUser) => void;
}

const UserContext = React.createContext<UserContextProps | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = React.useState<IUser>(DefaultUser);
    const contextValue = React.useMemo(() => {
        return {user, setUser};
    }, [user]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const ctx = React.useContext(UserContext);
    if (!ctx) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return ctx;
};

export default UserProvider;
export {useUser};
export type {IUser};
