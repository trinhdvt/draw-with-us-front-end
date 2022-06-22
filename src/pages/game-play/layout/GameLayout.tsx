import React from "react";
import {Container} from "@mui/material";

import GameHeader from "./GameHeader";

const GameLayout = ({children}: {children?: React.ReactNode}) => (
    <main>
        <Container maxWidth="md" className="mt-1 mx-auto bg-blue-300">
            <GameHeader />
            {children}
            <footer />
        </Container>
    </main>
);

export default GameLayout;
