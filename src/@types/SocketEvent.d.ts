import {Socket} from "socket.io-client";
import {IUser} from "./User";

interface ServerToClientEvents {
    "room:update": () => void;
}

interface ClientToServerEvents {
    "user:init": (callback: (response: IUser) => void) => void;
    "user:update": (arg: IUser) => void;
    "room:join": (
        eid: string,
        callback: (response: Record<string, string>) => void
    ) => void;
    "room:exit": (roomId: string) => void;
}

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;
type SocketResponse = Record<string, unknown>;

export type {SocketResponse};
export type {SocketType};