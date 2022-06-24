import React from "react";
import queryString from "query-string";
import {Button, ButtonProps} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";

const FbLoginBtn = (props: ButtonProps) => {
    const fbLoginUrl = () => {
        let clientId = "406293024760126";
        let redirectUri = "https://draw-with.trinhdvt.tech/login/fb/callback";
        if (import.meta.env.DEV) {
            clientId = "438978628228056";
            redirectUri = "http://localhost:3000/login/fb/callback";
        }

        const params = queryString.stringify({
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: ["email", "public_profile"].join(","),
            response_type: "token",
            display: "popup",
        });

        return `https://www.facebook.com/v14.0/dialog/oauth?${params}`;
    };

    return (
        <Button
            startIcon={<FacebookIcon />}
            variant="outlined"
            onClick={() => (window.location.href = fbLoginUrl())}
            {...props}
        >
            Facebook
        </Button>
    );
};

export default FbLoginBtn;
