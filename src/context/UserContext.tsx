import React from "react";

interface UserProps {
    sid: string;
    avatar?: string;
    name: string;
    id: string;
}

const DefaultUser: UserProps = {
    name: "",
    id: "",
    sid: "",
    avatar: "https://cdn.trinhdvt.tech/avatar.png",
};

interface UserContextProps {
    user: UserProps;
    setUser: (user: UserProps) => void;
}

const UserContext = React.createContext<UserContextProps | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = React.useState<UserProps>(DefaultUser);
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
export type {UserProps};
