import React from "react";
import {FcGoogle} from "react-icons/fc";
import {Button, ButtonProps} from "@mui/material";
import {useGoogleLogin} from "@react-oauth/google";

import {BackendAPI} from "../../../api/HttpClient";
import {ReadToken} from "../../../utils/TokenUtils";
import {useUser} from "../../../store/UserStore";
import {useSocket} from "../../../store/SocketStore";

const GoogleLoginBtn = (props: ButtonProps) => {
    const {setToken, setUser} = useUser();
    const socket = useSocket();

    const login = useGoogleLogin({
        onSuccess: async ({access_token}) => {
            const {data} = await BackendAPI.post("/api/login/google", {
                accessToken: access_token,
            });

            const {token} = data;
            setToken(token);
            const {name, avatar} = ReadToken(token);
            setUser({name, avatar});
            socket?.emit("user:update", {name, avatar}, response => {
                setUser({...response});
            });
        },
    });

    return (
        <Button
            startIcon={<FcGoogle />}
            variant="outlined"
            {...props}
            onClick={() => login()}
        >
            Google
        </Button>
    );
};

export default GoogleLoginBtn;
