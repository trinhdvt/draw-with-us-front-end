import React from "react";
import {Outlet} from "react-router-dom";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import {Container} from "@mui/material";

const AppLayout = () => {
    return (
        <main className="bg-blue-300">
            <Container maxWidth="md" className="my-[30px] mx-auto">
                <AppHeader />
                <Outlet />
                <AppFooter />
            </Container>
        </main>
    );
};

export default AppLayout;
