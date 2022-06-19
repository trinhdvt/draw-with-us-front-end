import React from "react";
import {
    Grid,
    GridProps,
    IconButton,
    InputAdornment,
    Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import CssTextField from "../../../components/CssTextField";

const MessageColorPalette = {
    warn: "#ffa726",
    success: "#66bb6a",
    default: "#868d96",
    error: "#f44336",
};

type IMessage = {
    from: string;
    message: string;
    type?: keyof typeof MessageColorPalette;
};

const Message = ({from, message, type}: IMessage) => {
    const color = MessageColorPalette[type ?? "default"];
    return (
        <div className="flex my-0.5">
            <Typography
                variant="body1"
                className="capitalize font-bold mx-1 text-gray-800"
            >
                {from}
            </Typography>
            <Typography className="font-medium" color={color}>
                {message}
            </Typography>
        </div>
    );
};

const MessagePanel = (props: GridProps) => {
    const [roomMsg, setRoomMsg] = React.useState(() => {
        return Array.from(
            {length: 10},
            (): IMessage => ({
                from: "Asan ",
                message: "has done!",
                type: "success",
            })
        );
    });
    const [myMsg, setMyMsg] = React.useState("");
    const containerRef = React.useRef<HTMLDivElement>(null);
    const onMsgSend = () => {
        const trimmedMsg = myMsg.trim();
        if (trimmedMsg.length === 0) return;
        setMyMsg("");
        setRoomMsg(prevState => [
            {from: "Me", message: trimmedMsg},
            ...prevState,
        ]);
        containerRef.current?.scrollTo({top: 0, behavior: "smooth"});
    };

    return (
        <Grid item container direction="column" {...props}>
            <Grid
                item
                height="110px"
                ref={containerRef}
                className="scrollBar flex flex-col mb-1 border-solid bg-white
                border-gray-500 rounded-xl overflow-y-scroll"
            >
                {roomMsg.map((message, index) => (
                    <Message key={index} {...message} />
                ))}
            </Grid>
            <CssTextField
                className="my-1"
                value={myMsg}
                onChange={e => setMyMsg(e.target.value.slice(0, 255))}
                size="small"
                placeholder="Type a message..."
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        onMsgSend();
                    }
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={onMsgSend}>
                                <SendIcon color="primary" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Grid>
    );
};

export default MessagePanel;
