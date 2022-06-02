import React from "react";
import {
    IGameAction,
    GameReducer,
    IGameState,
    GameActionType,
} from "./GameReducer";
import {useSocket} from "../../../context/SocketContext";
import {useParams} from "react-router-dom";
import {useQueryClient} from "react-query";
import {alertWelcome} from "../utils/GameNotify";

const initState: IGameState = {
    isDone: false,
    target: undefined,
    roomId: undefined,
};

interface GameContextProps {
    state: IGameState;
    dispatch: React.Dispatch<IGameAction>;
}

const GameContext = React.createContext<GameContextProps | null>(null);

function GameProvider({children}: {children: React.ReactNode}) {
    const [state, dispatch] = React.useReducer(GameReducer, initState);
    const contextValue = React.useMemo(() => {
        return {state, dispatch};
    }, [state]);

    const {roomId} = useParams();
    const socket = useSocket();
    const queryClient = useQueryClient();

    React.useEffect(() => {
        dispatch({type: GameActionType.SET_ROOM, payload: roomId});
        alertWelcome();
        
        socket?.on("room:update", async () => {
            await queryClient.invalidateQueries(["room-config", roomId]);
            await queryClient.invalidateQueries(["room-players", roomId]);
        });

        return () => {
            socket?.off("room:update");
            console.log(`Exiting from room ${roomId}`);
        };
    }, [queryClient, roomId, socket]);

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
}

const useGame = () => {
    const ctx = React.useContext(GameContext);
    if (!ctx) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return ctx;
};

export default GameProvider;
export {useGame, GameActionType};
