import React from "react";
import {GameActionType, useGame} from "./context/GameContext";
import {Navigate, useParams} from "react-router-dom";
import {useSocket} from "../../context/SocketContext";
import {useQueryClient} from "react-query";
import {useValidPlayer} from "../../api/services/RoomServices";
import {alertWelcome} from "./utils/GameNotify";
import {AnimatedLoading} from "../../components/LoadingScreen";
import AppLayout from "../../layout/AppLayout";

const Wrapper = ({children}: {children: React.ReactNode}) => {
    const {roomId} = useParams();
    const socket = useSocket();
    const queryClient = useQueryClient();
    const {dispatch} = useGame();
    const {isError, isFetching, isSuccess} = useValidPlayer(roomId);

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
        return () => {
            window.removeEventListener("beforeunload", handleTabClose);
        };
    }, [handleTabClose]);

    React.useEffect(() => {
        if (isSuccess) {
            dispatch({type: GameActionType.SET_ROOM_ID, payload: roomId});
            alertWelcome().then(() => ({}));
        }
    }, [dispatch, isSuccess, roomId]);

    if (isError) return <Navigate to="/" replace />;

    if (isFetching) return <AnimatedLoading />;

    return <AppLayout>{children}</AppLayout>;
};

export default Wrapper;
