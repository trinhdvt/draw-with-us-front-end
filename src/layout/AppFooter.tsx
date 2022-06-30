import React from "react";
import {Divider, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const FooterText = ({children}: {children: React.ReactNode}) => (
    <Typography variant="body2" align="center" color="textSecondary">
        {children}
    </Typography>
);

const AppFooter = () => (
    <footer className="my-2 ml-2">
        <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
        >
            <Link to="/gallery" className="no-underline">
                <FooterText>Gallery</FooterText>
            </Link>
            <Link
                to="/terms_and_conditions.txt"
                target="_blank"
                className="no-underline"
            >
                <FooterText>Terms</FooterText>
            </Link>
            <Link
                to="/privacy_policy.txt"
                target="_blank"
                className="no-underline"
            >
                <FooterText>Privacy Policy</FooterText>
            </Link>
            <a
                href="https://status.draw-with.trinhdvt.tech/"
                target="_blank"
                className="no-underline"
                rel="noreferrer"
            >
                <FooterText>Status</FooterText>
            </a>
        </Stack>
    </footer>
);

export default AppFooter;
