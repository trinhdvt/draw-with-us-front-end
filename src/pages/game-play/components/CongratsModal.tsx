import React from "react";
import {Avatar, Grid, Typography} from "@mui/material";
import clsx from "clsx";
import {motion} from "framer-motion";

import styles from "../../../assets/styles/Game.module.scss";
import {useGame} from "../context/GameContext";
import {usePlayers} from "../../../api/services/RoomServices";
import {Congrats} from "../utils/GameNotify";

import {RankingBgColor, SmallChip} from "./Player";

const CongratsModal = () => {
    const {gameState} = useGame();
    const {data} = usePlayers(gameState.roomId);

    React.useEffect(() => {
        Congrats();
    }, []);

    return (
        <div className="modal">
            <motion.div
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                transition={{ease: "easeIn", duration: 1}}
                className={clsx(
                    styles.centerModal,
                    "flex flex-col max-w-[500px] w-[500px] " +
                        "p-4 items-center justify-center rounded-xl"
                )}
            >
                <Typography variant="h2">🎉 Congratulation 🎉</Typography>
                <Grid item container className="flex-col mt-4 max-w-[300px]">
                    {data?.slice(0, 3).map(({avatar, eid, name}, idx) => (
                        <Grid
                            key={eid}
                            item
                            container
                            className="items-center mb-2"
                        >
                            <Grid
                                item
                                md={2.5}
                                xs={2.5}
                                className="flex flex-col items-center "
                            >
                                <Avatar
                                    src={avatar}
                                    className="w-[60px] h-[60px]"
                                />
                                <SmallChip
                                    label={`Top ${idx + 1}`}
                                    className={RankingBgColor[idx]}
                                />
                            </Grid>
                            <Grid item md={9.5} xs={9.5} className="pl-2">
                                <Typography variant="h4" noWrap={true}>
                                    {name}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </div>
    );
};

export default React.memo(CongratsModal);
