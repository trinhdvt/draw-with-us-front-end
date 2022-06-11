import ITopic from "../../../@types/Topic";

enum GameActionType {
    DONE,
    NEXT_TURN,
    SET_ROOM_ID,
}

interface IGameAction {
    type: GameActionType;
    payload?: unknown;
}

interface IGameState {
    isDone: boolean;
    target?: ITopic;
    roomId?: string;
}

const GameReducer = (state: IGameState, action: IGameAction) => {
    const {type, payload} = action;
    switch (type) {
        case GameActionType.DONE:
            return {...state, isDone: payload as boolean};
        case GameActionType.NEXT_TURN:
            return {...state, isDone: false, target: payload as ITopic};
        case GameActionType.SET_ROOM_ID:
            return {...state, roomId: payload as string};
        default:
            return state;
    }
};

export {GameReducer, GameActionType};
export type {IGameState, IGameAction};
