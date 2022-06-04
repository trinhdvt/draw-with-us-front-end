import React from "react";
import {Chip, Grid, GridProps, Typography} from "@mui/material";
import {IPlayer} from "../../../@types/User";
import RandomAvatar from "../../../components/RandomAvatar";
import StyledAvatar from "../../../components/StyledAvatar";
import styles from "../../../assets/styles/Player.module.scss";
import HowToRegIcon from "@mui/icons-material/HowToReg";

class Player extends React.Component<IPlayer & GridProps> {
    render() {
        const {name, eid, point, topk, isHost, isMe, ...others} = this.props;

        const Badge = () => {
            if (topk)
                return (
                    <Chip
                        variant="filled"
                        size="small"
                        label={`Top${topk}`}
                        className="bg-yellow-300"
                    />
                );
            if (isHost)
                return (
                    <Chip
                        variant="filled"
                        size="small"
                        label="Host"
                        className="bg-cyan-500"
                    />
                );
        };

        return (
            <Grid
                container
                alignItems="center"
                {...others}
                className={styles.playerCard}
            >
                <Grid
                    item
                    container
                    md={3}
                    direction="column"
                    className="pr-[10px]"
                    alignItems="center"
                >
                    <RandomAvatar value={eid} size={45} />
                    {Badge()}
                </Grid>

                <Grid item container md={9} direction="column">
                    <div className="flex items-center">
                        {isMe && <HowToRegIcon color="primary" />}
                        <Typography className="font-bold" noWrap={true}>
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

const PlayerSkeleton = () => (
    <Grid container alignItems="center" className={styles.playerCard}>
        <Grid
            item
            container
            md={3}
            direction="column"
            className="pr-[10px]"
            alignItems="center"
        >
            <StyledAvatar />
        </Grid>

        <Grid item md={9}>
            <Typography className="font-thin">Waiting...</Typography>
        </Grid>
    </Grid>
);

export default Player;
export {PlayerSkeleton};
