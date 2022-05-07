import React from "react";
import {
    Button,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {makeStyles, withStyles} from "@mui/styles";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

const useStyles = makeStyles({
    userControl: {
        margin: "5px 0px 20px 0px !important",
    },
    upperText: {
        textTransform: "uppercase",
    },
    container: {
        display: "flex",
        alignItems: "center",
    },
    border: {
        borderBottom: "2px solid lightgray",
        width: "100%",
    },
    content: {
        padding: "0 10px 0 10px",
    },
});

const CssTextField = withStyles({
    root: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                border: "2px solid gray",
                borderRadius: 12,
            },
            "&.Mui-focused fieldset": {
                borderColor: "purple",
            },
        },
    },
})(TextField);

const DividerWithText = ({children}: {children: React.ReactNode}) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.border} />
            <div className={classes.content}>{children}</div>
            <div className={classes.border} />
        </div>
    );
};
const LoginPanel = () => {
    const classes = useStyles();

    return (
        <Grid
            item
            container
            className={classes.userControl}
            md={5}
            direction="column"
            alignItems="center"
            rowSpacing={2}
            // justifyContent="space-between"
        >
            <Grid item>
                <Typography
                    variant="h2"
                    align="center"
                    className={classes.upperText}
                >
                    Login Here
                </Typography>
            </Grid>
            <Grid
                item
                container
                columnSpacing={2}
                justifyContent="space-evenly"
            >
                <Grid
                    item
                    container
                    md={5}
                    justifyContent="space-around"
                    alignItems="center"
                    direction="column"
                >
                    <Grid item xs={5}>
                        <CssTextField
                            required
                            id="outlined-required"
                            size="small"
                            label="Email"
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <CssTextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            size="small"
                            type="password"
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    md={5}
                    justifyContent="space-evenly"
                    sx={{marginBottom: "25px"}}
                >
                    <Stack
                        direction="column"
                        divider={<DividerWithText>OR</DividerWithText>}
                        spacing={2}
                    >
                        <Button
                            startIcon={<MeetingRoomIcon />}
                            variant="contained"
                        >
                            Sign In
                        </Button>
                        <Button
                            startIcon={<SportsEsportsIcon />}
                            variant="outlined"
                        >
                            Sign Up
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
            <Divider
                orientation="horizontal"
                flexItem
                sx={{"&::before": {top: "0%"}, "&::after": {top: "0%"}}}
            >
                Login With
            </Divider>
            <Grid item justifyContent="space-evenly">
                <Stack direction="row" spacing={2}>
                    <Button startIcon={<FacebookIcon />} variant="outlined">
                        Facebook
                    </Button>
                    <Button startIcon={<GoogleIcon />} variant="outlined">
                        Google
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default LoginPanel;
