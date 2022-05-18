import React from "react";
import {Avatar, Grid, GridProps, Stack, Typography} from "@mui/material";

interface PlayerProps {
    name: string;
    avatar?: string;
    point: number;
}

const Player = (props: PlayerProps & GridProps) => {
    const {name, avatar, point, ...others} = props;

    return (
        <Grid container direction="row" alignItems="center" {...others}>
            <Grid item md={3} className="pr-[10px]">
                <Avatar
                    src={avatar ?? "https://cdn.trinhdvt.tech/avatar.png"}
                />
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
