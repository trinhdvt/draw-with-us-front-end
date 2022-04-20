import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/commons/header/Header";
import Footer from "../components/commons/footer/Footer";
import {Container} from "@mui/material";

const containerStyles = {
    margin: "30px auto",
}

const NormalLayout = () => {
    return (
        <main style={{backgroundColor: "aquamarine"}}>
            <Container
                maxWidth="md"
                sx={containerStyles}
            >
                <Header/>
                <Outlet/>
                <Footer/>
            </Container>
        </main>
    );
};

export default NormalLayout;
