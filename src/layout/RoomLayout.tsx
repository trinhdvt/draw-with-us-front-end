import {Grid} from "@mui/material";
import React from "react";
import styles from "../assets/styles/Room.module.scss";
import RoomHeader, {HeaderProps} from "./RoomHeader";

interface RoomLayoutProps extends HeaderProps {
    children: React.ReactNode;
}

const RoomLayout = (props: RoomLayoutProps) => {
    const {children, title, headerChildren, ...others} = props;

    React.useEffect(() => {
        document.title = `${title} - Draw With Us`;
    }, [title]);

    return (
        <Grid container className={styles.container} {...others}>
            <RoomHeader title={title} headerChildren={headerChildren} />
            {children}
        </Grid>
    );
};

export default RoomLayout;
