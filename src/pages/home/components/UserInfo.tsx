import React from "react";
import {Avatar, IconButton, InputAdornment} from "@mui/material";
import {motion} from "framer-motion";
import {GoSync} from "react-icons/go";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import CssTextField from "../../../components/CssTextField";
import {useUser} from "../../../store/UserStore";
import {useSocket} from "../../../store/SocketStore";

const UserInfo = () => {
    const socket = useSocket();
    const {token, user, setUser} = useUser();
    const defaultNameRef = React.useRef<string>(user.name);
    const isLoggedIn = !!token;

    const changeAvatar = () => {
        if (isLoggedIn) return;

        const randomIdx = Math.floor(Math.random() * 30) + 1;
        const newAvatar = `https://cdn.trinhdvt.tech/${randomIdx}.webp`;
        socket?.emit(
            "user:update",
            {avatar: newAvatar, name: user.name},
            response => setUser(response)
        );
    };

    return (
        <div className="h-full flex flex-col flex-1 items-center">
            <div className="my-auto relative">
                <Avatar src={user.avatar} className="w-[100px] h-[100px]" />
                {!isLoggedIn && (
                    <IconButton
                        size="small"
                        className="absolute top-[85%] right-[33%] bg-[rgba(255,255,255,0.8)]"
                        component={motion.div}
                        onClick={changeAvatar}
                        initial={{scale: 1}}
                        whileHover={{
                            scale: 1.1,
                            rotate: 180,
                            transition: {duration: 0.3},
                        }}
                        whileTap={{scale: 0.95}}
                    >
                        <GoSync className="primary-icon" />
                    </IconButton>
                )}
            </div>
            <div className="my-auto">
                <CssTextField
                    size="small"
                    label={`Nickname* ${user.name.length}/30`}
                    value={user.name}
                    placeholder={defaultNameRef.current}
                    onChange={e => setUser({name: e.target.value})}
                    onBlur={() => {
                        socket?.emit("user:update", user, response => {
                            setUser({...response});
                        });
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </div>
    );
};

export default UserInfo;
