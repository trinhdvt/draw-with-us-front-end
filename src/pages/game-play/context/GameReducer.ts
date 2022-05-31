import ITopic from "../../../@types/Topic";

enum GameActionType {
    DONE,
    NEXT,
}

interface IGameAction {
    type: GameActionType;
    payload?: unknown;
}

interface IGameState {
    isDone: boolean;
    target?: ITopic;
}

const gameReducer = (state: IGameState, action: IGameAction) => {
    const {type, payload} = action;
    switch (type) {
        case GameActionType.DONE:
            return {...state, isDone: payload as boolean};
        case GameActionType.NEXT:
            return {...state, isDone: false, target: payload as ITopic};
        default:
            return state;
    }
};

export {gameReducer, GameActionType};
export type {IGameState, IGameAction};
