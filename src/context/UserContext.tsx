import React from "react";

import {IUser} from "../api/@types/User";

const DefaultUser: IUser = {
    name: "",
    eid: "",
    sid: "",
    avatar: "https://cdn.trinhdvt.tech/avatar.png",
};

interface UserContextProps {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

const UserContext = React.createContext<UserContextProps | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = React.useState<IUser>(DefaultUser);
    const contextValue = React.useMemo(() => {
        return {user, setUser};
    }, [user]);

    React.useEffect(() => {
        sessionStorage.setItem("user", JSON.stringify(user));

        return () => {
            sessionStorage.removeItem("user");
        };
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
