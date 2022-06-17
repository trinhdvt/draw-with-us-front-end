import React from "react";
import {Container} from "@mui/material";

import AppHeader from "../../../layout/AppHeader";

import GameFooter from "./GameFooter";

const GameLayout = ({children}: {children?: React.ReactNode}) => (
    <main>
        <Container maxWidth="md" className="mt-[30px] mx-auto bg-blue-300">
            <AppHeader />
            {children}
            <GameFooter />
        </Container>
    </main>
);

export default GameLayout;
