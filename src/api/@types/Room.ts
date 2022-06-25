interface IRoomResponse {
    eid: string;
    id: string;
    name: string;
    timeOut: number;
    maxUsers: number;
    currentUsers: number;
    collectionName: string;
    image?: string;
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
}

export type {IRoomResponse, IRoomRequest, IRoomConfig};
export {RoomStatus};
