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
            fixed={true}
            sx={{
                backgroundImage:
                    "linear-gradient(to bottom right, #00C0FF, #a9d1d0)",
            }}
            className="mt-[40px] mb-[20px] min-w-[900px] mx-auto rounded-xl"
        >
            <AppHeader />
            {children ?? <Outlet />}
            <AppFooter />
        </Container>
    );
};

export default AppLayout;
