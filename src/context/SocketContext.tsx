import React from "react";
import {io, Socket, ManagerOptions, SocketOptions} from "socket.io-client";
import {BackendUrl} from "../api/HttpClient";
import {useUser} from "./UserContext";

const SocketContext = React.createContext<Socket | null>(null);

const SocketProvider = ({children}: {children: React.ReactNode}) => {
    const [connection, setConnection] = React.useState<Socket | null>(null);
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
            const socketCnn = io(BackendUrl, options);
            setConnection(socketCnn);
            socketCnn.onAny((eventName, ...args) => {
                console.log(`event ${eventName}`, ...args);
            });
            socketCnn.on("connect", () => {
                setUser({...user, sid: socketCnn.id});
            });
        } catch (e) {
            console.error(e);
        }
    }, [options]);

    return (
        <SocketContext.Provider value={connection}>
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
