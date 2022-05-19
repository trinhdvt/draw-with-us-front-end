import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../components/commons/header/Header";
import Footer from "../components/commons/footer/Footer";
import {Container} from "@mui/material";

const NormalLayout = () => {
    return (
        <main className="bg-blue-300">
            <Container maxWidth="md" className="my-[30px] mx-auto">
                <Header />
                <Outlet />
                <Footer />
            </Container>
        </main>
    );
};

export default NormalLayout;
