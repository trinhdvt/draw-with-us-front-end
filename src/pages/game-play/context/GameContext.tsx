import React from "react";
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
