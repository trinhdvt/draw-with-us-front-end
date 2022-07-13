import React from "react";

import ITopic from "../../../api/@types/Topic";

import {
    IGameAction,
    GameReducer,
    IGameState,
    GameActionType,
} from "./GameReducer";

const initState: IGameState = {
    isDone: false,
    target: undefined,
    roomId: undefined,
    history: new Set<ITopic>([]),
};

interface GameContextProps {
    gameState: IGameState;
    dispatch: React.Dispatch<IGameAction>;
}

const GameContext = React.createContext<GameContextProps | null>(null);
const GameProvider = ({children}: {children: React.ReactNode}) => {
    const [gameState, dispatch] = React.useReducer(GameReducer, initState);
    const contextValue = React.useMemo(() => {
        return {gameState, dispatch};
    }, [gameState]);

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};

const useGame = () => {
    const ctx = React.useContext(GameContext);
    if (!ctx) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return ctx;
};

export default GameProvider;
export {useGame, GameActionType};
