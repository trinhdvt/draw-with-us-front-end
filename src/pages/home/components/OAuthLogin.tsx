import React from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import {useUser} from "../../../store/UserStore";
import {useSocket} from "../../../store/SocketStore";
import {BackendAPI} from "../../../api/HttpClient";
import HomePage from "..";
import {ReadToken} from "../../../utils/TokenUtils";

const OAuthLogin = () => {
    const navigate = useNavigate();
    const {setUser, setToken} = useUser();
    const socket = useSocket();
    const [searchParams] = useSearchParams();
    React.useEffect(() => {
        const code = searchParams.get("code");
        if (!code) return;

        BackendAPI.post("/api/login/fb", {code}).then(({data: {token}}) => {
            setToken(token);

            const {name, avatar} = ReadToken(token);
            setUser({name, avatar});
            socket?.emit("user:update", {name, avatar});
            navigate("/", {replace: true});
        });
    }, [navigate, searchParams, setToken, setUser, socket]);

    return <HomePage />;
};

export default OAuthLogin;
