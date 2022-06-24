import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import queryString from "query-string";

import {useUser} from "../../../store/UserStore";
import {useSocket} from "../../../store/SocketStore";
import {BackendAPI} from "../../../api/HttpClient";
import HomePage from "..";

const OAuthLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {setUser, setToken} = useUser();
    const socket = useSocket();
    const {long_lived_token} = queryString.parse(location.hash);
    React.useEffect(() => {
        if (!long_lived_token) return;

        BackendAPI.post("/api/login/fb", {
            access_token: long_lived_token,
        }).then(({data: {name, avatar, token}}) => {
            setUser({name, avatar});
            setToken(token);
            socket?.emit("user:update", {name, avatar});
            navigate("/", {replace: true});
        });
    }, [long_lived_token, navigate, setToken, setUser, socket]);

    return <HomePage />;
};

export default OAuthLogin;
