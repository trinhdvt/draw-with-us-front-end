import React from "react";
import {Container} from "@mui/material";

import GameHeader from "./GameHeader";

const GameLayout = ({children}: {children?: React.ReactNode}) => (
    <main>
        <Container
            maxWidth="md"
            fixed={true}
            className="mt-5 mx-auto bg-blue-300 rounded-xl"
        >
            <GameHeader />
            {children}
            <footer />
        </Container>
    </main>
);

export default GameLayout;
