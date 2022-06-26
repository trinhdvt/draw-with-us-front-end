interface IRoomResponse {
    eid: string;
    id: string;
    name: string;
    timeOut: number;
    maxUsers: number;
    currentUsers: number;
    collectionName: string;
    image?: string;
    isPrivate?: boolean;
}

enum RoomStatus {
    WAITING = "waiting",
    PLAYING = "playing",
}

interface IRoomConfig extends IRoomResponse {
    status: RoomStatus;
    isHost: boolean;
}

interface IRoomRequest {
    timeOut: number;
    maxUsers: number;
    collectionId: string;
    name: string;
    password?: string;
}

interface IRoomJoinEvent {
    eid: string;
    password?: string;
}

export type {IRoomResponse, IRoomRequest, IRoomConfig, IRoomJoinEvent};
export {RoomStatus};
