import create from "zustand";

enum ShowMode {
    ROOM_NAME,
    COLLECTION_NAME,
}

interface AppState {
    roomShowMode: ShowMode;
}

interface AppAction {
    setRoomShowMode: (mode: ShowMode) => void;
}

/**
 * Global bullshit state management for room's page.
 */
const useRoomStore = create<AppState & AppAction>()(setState => ({
    roomShowMode: ShowMode.ROOM_NAME,
    setRoomShowMode: (mode: ShowMode) => setState({roomShowMode: mode}),
}));

export {useRoomStore, ShowMode};
