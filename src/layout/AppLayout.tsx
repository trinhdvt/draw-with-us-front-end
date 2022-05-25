import React from "react";
import {Outlet} from "react-router-dom";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import {Container} from "@mui/material";

const AppLayout = ({children}: {children?: React.ReactNode}) => {
    return (
        <Container
            component="main"
            maxWidth="md"
            className="my-[30px] mx-auto bg-blue-300"
        >
            <AppHeader />
            {children ?? <Outlet />}
            <AppFooter />
        </Container>
    );
};

export default AppLayout;
