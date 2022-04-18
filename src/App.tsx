import React from 'react';
import DrawBoard from "./components/draw-board/DrawBoard";
import {Container} from "@mui/material";

function App() {
    return (
        <Container
            maxWidth="md"
            sx={{margin: "30px auto"}}
        >
            <DrawBoard/>
        </Container>
    );
}

export default App;
