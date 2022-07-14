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
    numberOfTopics: number;
}

enum RoomStatus {
    WAITING = "waiting",
    PLAYING = "playing",
    PAUSED = "paused",
}

interface IRoomConfig extends IRoomResponse {
    status: RoomStatus;
    isHost: boolean;
}

interface IRoomPreview extends IRoomResponse {
    host: {
        name: string;
        avatar: string;
    };
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

export type {
    IRoomResponse,
    IRoomRequest,
    IRoomConfig,
    IRoomJoinEvent,
    IRoomPreview,
};
export {RoomStatus};
