import React from "react";
import {Avatar, Chip, Grid, GridProps, Stack, Typography} from "@mui/material";

interface PlayerProps {
    name: string;
    avatar?: string;
    point: number;
    topk?: number;
}

const Player = (props: PlayerProps & GridProps) => {
    const {name, avatar, point, topk, ...others} = props;

    return (
        <Grid container direction="row" alignItems="center" {...others}>
            <Grid
                item
                container
                md={3}
                direction="column"
                className="pr-[10px]"
                alignItems="center"
            >
                <Avatar
                    src={avatar ?? "https://cdn.trinhdvt.tech/avatar.png"}
                />
                {topk && (
                    <Chip
                        variant="filled"
                        size="small"
                        label={`Top${topk}`}
                        className="bg-yellow-300"
                    />
                )}
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
export type {PlayerProps};
