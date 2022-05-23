import {IUser} from "../context/UserContext";

interface IRoomResponse {
    id: string;
    eid: string;
    timeOut: number;
    maxUsers: number;
    currentUsers: number;
    host: Partial<IUser>;
    collectionName: string;
}

enum RoomStatus {
    WAITING = "waiting",
    PLAYING = "playing",
}

interface IRoomConfig extends IRoomResponse {
    status: RoomStatus;
}

interface RoomRequest {
    sid: string;
    timeOut: number;
    maxUsers: number;
    collectionId: string;
}

export type {IRoomResponse, RoomRequest, IRoomConfig};
export {RoomStatus};
