import React from "react";
import {Avatar, Grid, Stack, Typography} from "@mui/material";
import sample from "../../assets/images/avatar.png";
import {makeStyles} from "@mui/styles";

export interface UserProps {
    name: string;
    avatar?: string;
    point: number;
}

const useStyles = makeStyles({
    boldText: {
        fontWeight: "bold",
    },
});

const User = (props: UserProps) => {
    const classes = useStyles();

    return (
        <Grid container direction="row" alignItems="center">
            <Grid item md={3} sx={{paddingRight: "10px"}}>
                <Avatar src={props.avatar ?? sample} />
            </Grid>

            <Grid item md={9}>
                <Stack direction="column">
                    <Typography className={classes.boldText} noWrap={true}>
                        {props.name}
                    </Typography>
                    <Typography>
                        <span className={classes.boldText}>{props.point}</span>
                        &nbsp;points
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default User;
