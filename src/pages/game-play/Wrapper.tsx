import React from "react";
import {Navigate, useLocation, useParams} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";

import {useSocket} from "../../store/SocketStore";
import {useValidPlayer} from "../../api/services/RoomServices";
import {AnimatedLoading} from "../../components/LoadingScreen";

import {alertWelcome} from "./utils/GameNotify";
import {GameActionType, useGame} from "./context/GameContext";
import GameLayout from "./layout/GameLayout";

const Wrapper = ({children}: {children: React.ReactNode}) => {
    const {roomId} = useParams();
    const socket = useSocket();
    const queryClient = useQueryClient();
    const {dispatch} = useGame();
    const {isError, isFetching, isSuccess} = useValidPlayer(roomId);
    const location = useLocation();
    const state = location.state as {onMiddleGame?: boolean};
    const onMiddleGame = state?.onMiddleGame ?? false;

    React.useEffect(() => {
        socket?.on("room:update", async () => {
            await queryClient.invalidateQueries(["room-config", roomId]);
            await queryClient.invalidateQueries(["room-players", roomId]);
        });

        return () => {
            socket?.off("room:update");
            if (roomId) {
                socket?.emit("room:exit", roomId);
            }
        };
    }, [queryClient, roomId, socket]);

    const handleTabClose = React.useCallback((e: BeforeUnloadEvent) => {
        e.preventDefault();
        const message = "Are you sure you want to leave?";
        e.returnValue = message;
        return message;
    }, []);

    React.useEffect(() => {
        window.addEventListener("beforeunload", handleTabClose);
        return () => window.removeEventListener("beforeunload", handleTabClose);
    }, [handleTabClose]);

    React.useEffect(() => {
        if (isSuccess) {
            dispatch({type: GameActionType.SET_ROOM_ID, payload: roomId});
            if (onMiddleGame) {
                dispatch({type: GameActionType.DONE, payload: true});
            }
            alertWelcome().then(() => (document.title = `Draw With Us 🎮`));
        }
    }, [dispatch, isSuccess, onMiddleGame, roomId]);

    if (isError) return <Navigate to="/" replace />;
    if (isFetching) return <AnimatedLoading />;

    return <GameLayout>{children}</GameLayout>;
};

export default Wrapper;
