import {Socket} from "socket.io-client";

import {IMessage} from "../../pages/game-play/components/MessagePanel";

import ITopic from "./Topic";
import {IUser} from "./User";

interface ServerToClientEvents {
    "room:update": () => void;
    "game:nextTurn": (topic: ITopic) => void;
    "game:endTurn": () => void;
    "room:msg": (payload: IMessage) => void;
    "list-room:update": () => void;
}

interface ClientToServerEvents {
    "user:init": (callback: (response: IUser) => void) => void;
    "user:update": (arg: IUser) => void;
    "room:join": (
        eid: string,
        callback: (response: Record<string, string>) => void
    ) => void;
    "room:exit": (roomId: string) => void;
    "game:start": () => void;
    "game:predict": (
        roomId: string,
        image: string,
        callback: (response: {isCorrect: boolean}) => void
    ) => void;
    "room:msg": (roomId: string, payload: IMessage) => void;
}

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

export type {SocketType};
