import React from "react";
import {Container} from "@mui/material";

import AppHeader from "../../../layout/AppHeader";

const GameLayout = ({children}: {children?: React.ReactNode}) => (
    <main>
        <Container maxWidth="md" className="mt-1 mx-auto bg-blue-300">
            <AppHeader height="60px" />
            {children}
            <footer />
        </Container>
    </main>
);

export default GameLayout;
