import React from "react";
import {Divider, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const AppFooter = () => {
    const footerText = ["Gallery", "About Us", "Contact Us"];
    const footerLink = ["/gallery", "#", "#"];

    return (
        <footer className="my-2 ml-2">
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
            >
                {footerText.map((label, index) => (
                    <Link
                        to={footerLink[index]}
                        key={label}
                        className="no-underline"
                    >
                        <Typography
                            variant="body1"
                            align="center"
                            color="textSecondary"
                        >
                            {label}
                        </Typography>
                    </Link>
                ))}
            </Stack>
        </footer>
    );
};

export default AppFooter;
