import React from "react";
import {
    IGameAction,
    GameReducer,
    IGameState,
    GameActionType,
} from "./GameReducer";
import {useSocket} from "../../../context/SocketContext";
import {Navigate, useParams} from "react-router-dom";
import {useQueryClient} from "react-query";
import {alertWelcome} from "../utils/GameNotify";
import {useValidPlayer} from "../../../api/services/RoomServices";
import {AnimatedLoading} from "../../../components/LoadingScreen";

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
    const {isError, isFetching, isSuccess} = useValidPlayer(roomId);

    React.useEffect(() => {
        socket?.on("room:update", async () => {
            await queryClient.invalidateQueries(["room-config", roomId]);
            await queryClient.invalidateQueries(["room-players", roomId]);
        });

        return () => {
            socket?.off("room:update");
            console.log(`Exiting from room ${roomId}`);
        };
    }, [queryClient, roomId, socket]);

    React.useEffect(() => {
        if (isSuccess) {
            dispatch({type: GameActionType.SET_ROOM_ID, payload: roomId});
            alertWelcome();
        }
    }, [isSuccess, roomId]);

    if (isError) return <Navigate to="/" replace />;

    if (isFetching) return <AnimatedLoading />;

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
