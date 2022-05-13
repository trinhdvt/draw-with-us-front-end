import React from "react";
import {Avatar, Grid, Stack, Typography} from "@mui/material";
import sample from "../../assets/images/avatar.png";

export interface UserProps {
    name: string;
    avatar?: string;
    point: number;
}

const User = (props: UserProps) => {
    return (
        <Grid container direction="row" alignItems="center">
            <Grid item md={3} className="pr-[10px]">
                <Avatar src={props.avatar ?? sample} />
            </Grid>

            <Grid item md={9}>
                <Stack direction="column">
                    <Typography className="font-bold" noWrap={true}>
                        {props.name}
                    </Typography>
                    <Typography>
                        <span className="font-bold">{props.point}</span>
                        &nbsp;points
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default User;
