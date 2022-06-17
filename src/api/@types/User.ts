interface IUser {
    sid: string;
    avatar?: string;
    name: string;
    eid: string;
}

interface IPlayer extends IUser {
    point: number;
    topk?: number;
    isHost: boolean;
    isMe: boolean;
}

export type {IUser, IPlayer};
