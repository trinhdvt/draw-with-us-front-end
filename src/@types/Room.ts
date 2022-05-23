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

interface RoomRequest {
    sid: string;
    timeOut: number;
    maxUsers: number;
    collectionId: string;
}

export type {IRoomResponse, RoomRequest};
