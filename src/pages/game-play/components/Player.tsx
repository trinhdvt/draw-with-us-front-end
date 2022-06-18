import React from "react";
import {
    Avatar,
    Chip,
    ChipProps,
    Grid,
    GridProps,
    Typography,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import {IPlayer} from "../../../api/@types/User";
import styles from "../../../assets/styles/Player.module.scss";
import {useGame} from "../context/GameContext";

const SmallChip = (props: ChipProps) => {
    return <Chip variant="filled" size="small" {...props} />;
};

class Player extends React.Component<IPlayer & GridProps> {
    render() {
        const {name, point, topk, isHost, isMe, avatar, ...others} = this.props;

        const PlayerBadge = () => {
            if (topk)
                return (
                    <SmallChip label={`Top${topk}`} className="bg-yellow-300" />
                );
            if (isHost)
                return <SmallChip label="Host" className="bg-cyan-500" />;
            return <></>;
        };

        const PlayerAvatar = () => (
            <Avatar src={avatar} className="w-[45px] h-[45px]" />
        );

        return (
            <Grid
                container
                alignItems="center"
                className={styles.playerCard}
                {...others}
            >
                <Grid item md={3} className="flex flex-col items-center pr-2.5">
                    <PlayerAvatar />
                    <PlayerBadge />
                </Grid>

                <Grid item md={9} className="flex flex-col">
                    <div className="flex items-center">
                        {isMe && <HowToRegIcon color="primary" />}
                        <Typography
                            className="font-bold max-w-[140px]"
                            noWrap={true}
                        >
                            {name}
                        </Typography>
                    </div>
                    <Typography>
                        <span className="font-bold">{point}</span>
                        &nbsp;points
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

const PlayerSkeleton = () => {
    const {state} = useGame();
    const isPlaying = !state.target;

    return (
        <Grid container alignItems="center" className={styles.playerCard}>
            <Grid item md={3} className="pr-2.5">
                <Avatar className="avatar" />
            </Grid>

            <Grid item md={9}>
                {isPlaying && (
                    <Typography className="font-thin">Waiting...</Typography>
                )}
            </Grid>
        </Grid>
    );
};

export default Player;
export {PlayerSkeleton};
