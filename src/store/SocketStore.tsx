import React from "react";
import {io, ManagerOptions, SocketOptions} from "socket.io-client";
import create from "zustand";

import {BackendUrl} from "../api/HttpClient";
import {SocketType} from "../api/@types/SocketEvent";
import {ReadToken} from "../utils/TokenUtils";

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
    const {token, setUser} = useUser();
    React.useEffect(() => {
        try {
            const options: Partial<ManagerOptions & SocketOptions> = {
                transports: ["websocket", "polling"],
                closeOnBeforeunload: false,
                rememberUpgrade: import.meta.env.PROD,
            };
            const socketCnn: SocketType = io(BackendUrl, options);
            setSocket(socketCnn);
            let initData = {};
            if (token) {
                const {name, avatar} = ReadToken(token);
                initData = {name, avatar};
            }

            socketCnn.emit("user:init", initData, response => {
                setUser({...response, sid: socketCnn.id});
            });
        } catch (e) {
            alert(e);
        }
    }, [setSocket, setUser, token]);

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
