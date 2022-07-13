import React from "react";
import {Grid, Typography} from "@mui/material";
import clsx from "clsx";
import {useTranslation} from "react-i18next";

import {RoomStatus} from "../../api/@types/Room";
import {useRoom} from "../../api/services/RoomServices";
import {useSocket} from "../../store/SocketStore";
import ITopic from "../../api/@types/Topic";

import {
    WaitEndTurn,
    ReadyToStartGame,
    WaitNextTurn,
    WaitHost,
    WaitOtherPlayer,
} from "./components/WaitingScreen";
import CountdownTimer from "./components/CountdownTimer";
import DrawBoard from "./components/DrawBoard";
import RoomPlayers from "./components/RoomPlayers";
import GameProvider, {GameActionType, useGame} from "./context/GameContext";
import {timeUp} from "./utils/GameNotify";
import Wrapper from "./Wrapper";
import MessagePanel from "./components/MessagePanel";
import GameSupportController from "./components/GameSupportController";
import CongratsModal from "./components/CongratsModal";
import GameInfo from "./components/GameInfo";

const Game = () => {
    const {t, i18n} = useTranslation();
    const socket = useSocket();
    const {gameState, dispatch} = useGame();
    const {data} = useRoom(gameState.roomId);
    const isPlaying = data?.status === RoomStatus.PLAYING;

    React.useEffect(() => {
        socket?.on("game:nextTurn", (topic: ITopic) => {
            const name = i18n.language == "vi" ? topic.nameVi : topic.nameEn;
            dispatch({
                type: GameActionType.NEXT_TURN,
                payload: {...topic, name},
            });
        });
        socket?.on("game:endTurn", async () => {
            dispatch({type: GameActionType.END_TURN});
            if (!gameState.isDone && isPlaying) {
                await timeUp();
            }
        });
        socket?.on("game:finish", () => {
            dispatch({type: GameActionType.SHOW_RESULT, payload: true});
            dispatch({type: GameActionType.NEXT_TURN, payload: undefined});
            setTimeout(() => {
                dispatch({type: GameActionType.SHOW_RESULT, payload: false});
            }, 4e3);
        });

        return () => {
            socket?.off("game:nextTurn");
            socket?.off("game:endTurn");
            socket?.off("game:finish");
        };
    }, [gameState.isDone, socket, dispatch, isPlaying, i18n.language]);

    const GameWaitingScreen = () => {
        if (isPlaying) return;
        const isHost = data?.isHost;
        const isReadyForGame = (data?.currentUsers ?? 0) > 1;

        if (!isHost) return <WaitHost />;
        if (isReadyForGame) return <ReadyToStartGame />;
        return <WaitOtherPlayer />;
    };

    const EndTurnWaitingScreen = () => {
        if (!isPlaying) return;
        if (gameState.isEndTurn) return <WaitNextTurn />;
        if (gameState.isDone) return <WaitEndTurn />;
        return;
    };

    return (
        <Grid container>
            <Grid item md={3.5} xs={3.5} className="mb-2">
                <GameInfo />
            </Grid>
            <Grid item md={6} xs={6} className="mb-2 mx-auto flex items-center">
                {isPlaying && !gameState.isEndTurn && !gameState.isDone && (
                    <Typography variant="h4">
                        {t("game_play.draw_topic_prefix")}
                        <Typography
                            variant="h6"
                            component="span"
                            className="font-bold text-2xl capitalize"
                        >
                            {gameState?.target?.name}
                        </Typography>
                    </Typography>
                )}
            </Grid>
            <Grid item container className="pb-2">
                <Grid item md={3.5} xs={4.5} className="flex flex-col">
                    <RoomPlayers />
                    <GameSupportController />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={6}
                    className="flex flex-col justify-between mx-auto"
                >
                    {GameWaitingScreen() ?? (
                        <React.Fragment>
                            {EndTurnWaitingScreen() ?? (
                                <DrawBoard className="max-h-[320px]" />
                            )}
                            {data && (
                                <Grid
                                    item
                                    md
                                    xs
                                    className="my-auto max-h-[30px]"
                                >
                                    <CountdownTimer maxTime={data.timeOut} />
                                </Grid>
                            )}
                        </React.Fragment>
                    )}
                    <MessagePanel className={clsx(!isPlaying)} />
                </Grid>
            </Grid>
            {gameState.showResult && <CongratsModal />}
        </Grid>
    );
};

const GameWrapper = () => (
    <GameProvider>
        <Wrapper>
            <Game />
        </Wrapper>
    </GameProvider>
);

export default GameWrapper;
