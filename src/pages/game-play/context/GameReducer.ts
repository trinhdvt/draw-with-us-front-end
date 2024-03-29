import ITopic from "../../../api/@types/Topic";

enum GameActionType {
    DONE,
    NEXT_TURN,
    SET_ROOM_ID,
    END_TURN,
    SHOW_RESULT,
}

interface IGameAction {
    type: GameActionType;
    payload?: unknown;
}

interface IGameState {
    isDone: boolean;
    target?: ITopic;
    roomId?: string;
    isEndTurn?: boolean;
    showResult?: boolean;
    history: Set<ITopic>;
}

const GameReducer = (state: IGameState, {payload, type}: IGameAction) => {
    switch (type) {
        case GameActionType.SET_ROOM_ID:
            return {...state, roomId: payload as string};
        case GameActionType.DONE:
            return {...state, isDone: payload as boolean};
        case GameActionType.NEXT_TURN:
            return {
                ...state,
                isDone: false,
                target: payload as ITopic,
                isEndTurn: false,
                history: state.target ? state.history : new Set<ITopic>(),
            };
        case GameActionType.END_TURN:
            return {
                ...state,
                isEndTurn: true,
                history: state.history.add(<ITopic>state.target),
            };
        case GameActionType.SHOW_RESULT:
            return {...state, showResult: payload as boolean};
        default:
            return state;
    }
};

export {GameReducer, GameActionType};
export type {IGameState, IGameAction};
