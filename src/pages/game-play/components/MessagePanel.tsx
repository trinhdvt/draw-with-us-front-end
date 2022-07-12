import React from "react";
import {
    Grid,
    GridProps,
    IconButton,
    InputAdornment,
    Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import clsx from "clsx";
import {useTranslation} from "react-i18next";

import CssTextField from "../../../components/CssTextField";
import {useSocket} from "../../../store/SocketStore";
import {useGame} from "../context/GameContext";
import {useUser} from "../../../store/UserStore";

const MessageColorPalette = {
    warn: "#ffa726",
    success: "#66bb6a",
    default: "#1976d2",
    error: "#f44336",
};

type ISimpleMessage = {
    from?: string;
    message: string;
};
type I18nMessage = {
    [locale in "en" | "vi"]: ISimpleMessage;
};
type IMessage = ISimpleMessage & {
    type?: keyof typeof MessageColorPalette;
    id?: string;
    i18n?: I18nMessage;
};

const Message = ({from, message, type}: IMessage) => {
    const color = MessageColorPalette[type ?? "default"];
    return (
        <Typography className="my-0.5">
            <Typography
                variant="body1"
                component="span"
                className={clsx(
                    "capitalize font-bold ml-1 text-gray-800",
                    from && "mr-1"
                )}
            >
                {from}
            </Typography>
            <Typography component="span" className="break-words" color={color}>
                {message}
            </Typography>
        </Typography>
    );
};

const MessagePanel = (props: GridProps) => {
    const {t, i18n} = useTranslation();
    const socket = useSocket();
    const {
        gameState: {roomId},
    } = useGame();
    const {user} = useUser();
    const [myMsg, setMyMsg] = React.useState("");
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [roomMsg, setRoomMsg] = React.useState<IMessage[]>([]);
    const MAX_MSG_LENGTH = 150;

    React.useEffect(() => {
        socket?.on("room:msg", payload => {
            const i18nMsg = payload.i18n;
            let {message, from} = payload;
            if (i18nMsg) {
                const i18nPayload =
                    i18n.language == "vi" ? i18nMsg.vi : i18nMsg.en;
                message = i18nPayload.message;
                from = i18nPayload.from;
            }

            setRoomMsg(prev => [...prev, {...payload, message, from}]);
        });
        return () => {
            socket?.off("room:msg");
        };
    }, [i18n.language, socket]);

    React.useEffect(() => {
        containerRef.current?.scrollTo({
            top: containerRef.current?.scrollHeight,
            behavior: "smooth",
        });
    }, [roomMsg]);

    const onMsgSend = () => {
        const trimmedMsg = myMsg.trim();
        if (trimmedMsg.length === 0) return;
        setMyMsg("");
        if (roomId) {
            socket?.emit("room:msg", roomId, {
                from: `💬 ${user.name}:`,
                message: trimmedMsg,
            });
        }
    };

    return (
        <Grid item container direction="column" {...props}>
            <Grid
                item
                height="110px"
                ref={containerRef}
                className="scrollBar flex flex-col mb-1 border-solid border-[2px] bg-white
                border-[#1976d2] rounded-xl overflow-y-scroll"
            >
                {roomMsg.map((message, index) => (
                    <Message key={message.id ?? index} {...message} />
                ))}
            </Grid>
            <CssTextField
                className="mt-1"
                value={myMsg}
                onChange={e =>
                    setMyMsg(e.target.value.slice(0, MAX_MSG_LENGTH))
                }
                size="small"
                label={myMsg ? `${myMsg.length}/${MAX_MSG_LENGTH}` : ""}
                autoComplete="off"
                placeholder={t("message_panel.place_holder")}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        onMsgSend();
                    }
                }}
                InputLabelProps={{
                    style: {
                        color:
                            myMsg.length > MAX_MSG_LENGTH * 0.75
                                ? "red"
                                : "#1976d2",
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                size="small"
                                edge="end"
                                onClick={onMsgSend}
                            >
                                <SendIcon color="warning" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Grid>
    );
};

export type {IMessage};
export default MessagePanel;
