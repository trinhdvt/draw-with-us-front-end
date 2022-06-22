import React from "react";
import {io, ManagerOptions, SocketOptions} from "socket.io-client";
import create from "zustand";

import {BackendUrl} from "../api/HttpClient";
import {SocketType} from "../api/@types/SocketEvent";

import {useUser} from "./UserStore";

interface ISocketState {
    socket: SocketType | null;
    setSocket: (socket: SocketType) => void;
}

const useAppSocket = create<ISocketState>()(setState => ({
    socket: null,
    setSocket: socket => setState({socket}),
}));

const SocketWrapper = ({children}: {children: React.ReactNode}) => {
    const {setSocket} = useAppSocket();
    const {setSID, setUser} = useUser();
    React.useEffect(() => {
        try {
            const options: Partial<ManagerOptions & SocketOptions> = {
                transports: ["websocket", "polling"],
                closeOnBeforeunload: false,
                rememberUpgrade: import.meta.env.PROD,
            };
            const socketCnn: SocketType = io(BackendUrl, options);
            setSocket(socketCnn);
            socketCnn.on("connect", () => setSID(socketCnn.id));
            socketCnn.emit("user:init", response => setUser(response));
        } catch (e) {
            alert(e);
        }
    }, [setSID, setSocket, setUser]);

    return <React.Fragment>{children}</React.Fragment>;
};

const useSocket = () => {
    const socketSelector = React.useCallback((state: ISocketState) => {
        return state.socket;
    }, []);
    return useAppSocket(socketSelector);
};

export default SocketWrapper;
export {useSocket};
