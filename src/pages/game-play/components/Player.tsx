import React from "react";
import {Chip, Grid, GridProps, Stack, Typography} from "@mui/material";
import {IPlayer} from "../../../@types/User";
import RandomAvatar from "../../../components/RandomAvatar";

const Player = (props: IPlayer & GridProps) => {
    const {name, eid, point, topk, isHost, ...others} = props;

    const Badge = () => {
        if (topk) {
            return (
                <Chip
                    variant="filled"
                    size="small"
                    label={`Top${topk}`}
                    className="bg-yellow-300"
                />
            );
        }
        if (isHost) {
            return (
                <Chip
                    variant="filled"
                    size="small"
                    label="Host"
                    className="bg-cyan-500"
                />
            );
        }
    };

    return (
        <Grid container alignItems="center" {...others}>
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

            <Grid item md={9}>
                <Stack direction="column">
                    <Typography className="font-bold" noWrap={true}>
                        {name}
                    </Typography>
                    <Typography>
                        <span className="font-bold">{point}</span>
                        &nbsp;points
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default Player;
