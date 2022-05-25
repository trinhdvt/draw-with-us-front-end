interface IRoomResponse {
    eid: string;
    id: string;
    name: string;
    timeOut: number;
    maxUsers: number;
    currentUsers: number;
    collectionName: string;
}

enum RoomStatus {
    WAITING = "waiting",
    PLAYING = "playing",
}

interface IRoomConfig extends IRoomResponse {
    status: RoomStatus;
    isHost: boolean;
}

interface RoomRequest {
    timeOut: number;
    maxUsers: number;
    collectionId: string;
}

export type {IRoomResponse, RoomRequest, IRoomConfig};
export {RoomStatus};
