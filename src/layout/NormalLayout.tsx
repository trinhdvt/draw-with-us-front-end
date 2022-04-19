import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/commons/header/Header";
import Footer from "../components/commons/footer/Footer";
import {Container} from "@mui/material";

const NormalLayout = () => {
    return (
        <div>
            <Container
                maxWidth="md"
                sx={{margin: "30px auto"}}
            >
                <Header/>
                <Outlet/>
                <Footer/>
            </Container>
        </div>
    );
};

export default NormalLayout;
