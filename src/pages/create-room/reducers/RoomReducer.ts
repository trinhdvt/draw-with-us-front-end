import {RoomRequest} from "../../../@types/Room";

enum Action {
    SET_MAX_USER,
    SET_TIME_OUT,
    SET_COLLECTION,
}

interface NewRoomAction {
    type: Action;
    payload: unknown;
}

type NewRoomState = RoomRequest;

const NewRoomReducer = (state: NewRoomState, action: NewRoomAction) => {
    const {type, payload} = action;
    switch (type) {
        case Action.SET_MAX_USER:
            return {...state, maxUsers: payload as number};
        case Action.SET_TIME_OUT:
            return {...state, timeOut: payload as number};
        case Action.SET_COLLECTION:
            return {...state, collectionId: payload as string};
        default:
            return state;
    }
};

export {Action, NewRoomReducer};
export type {NewRoomAction, NewRoomState};
