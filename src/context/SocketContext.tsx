import React from "react";
import {io, ManagerOptions, SocketOptions} from "socket.io-client";
import {BackendUrl} from "../api/HttpClient";
import {IUser, useUser} from "./UserContext";
import {SocketType} from "../@types/SocketEvent";

const SocketContext = React.createContext<SocketType | null>(null);

const SocketProvider = ({children}: {children: React.ReactNode}) => {
    const [connection, setConnection] = React.useState<SocketType | null>(null);
    const options: Partial<ManagerOptions & SocketOptions> =
        React.useMemo(() => {
            return {
                transports: ["websocket", "polling"],
                rememberUpgrade: import.meta.env.PROD,
            };
        }, []);

    const {user, setUser} = useUser();

    React.useEffect(() => {
        try {
            const socketCnn: SocketType = io(BackendUrl, options);
            console.log("Socket connected");

            setConnection(socketCnn);

            socketCnn.on("connect", () => {
                setUser({...user, sid: socketCnn.id});
            });

            socketCnn.emit("user:init", (response: IUser) => {
                setUser(response);
            });
        } catch (e) {
            console.error(e);
        }
    }, [options]);

    const contextValue = React.useMemo(() => connection, [connection]);

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};

const useSocket = () => {
    const ctx = React.useContext(SocketContext);
    if (ctx === undefined) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return ctx;
};

export default SocketProvider;
export {useSocket};
