import React from "react";
import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

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
