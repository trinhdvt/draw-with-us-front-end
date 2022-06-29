import React from "react";
import {
    Button,
    ButtonProps,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {useNavigate} from "react-router-dom";

import CssTextField from "../../../components/CssTextField";
import {useGame} from "../context/GameContext";
import TopTooltip from "../../../components/TopTooltip";
import AppQrCode from "../../../components/AppQRCode";

const SmallOutlineBtn = ({
    children,
    ...props
}: {children: React.ReactNode} & ButtonProps) => (
    <Button variant="outlined" size="small" {...props}>
        {children}
    </Button>
);

const GameSupportController = () => {
    const {gameState} = useGame();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [isCopied, setCopied] = React.useState(false);
    const qrCodeEL = React.useRef<HTMLDivElement>(null);
    const {protocol, hostname} = location;
    const port = import.meta.env.DEV ? `:${location.port}` : "";

    const shareLink = `${protocol}//${hostname}${port}/join?rid=${gameState.roomId}`;

    const onExit = () => {
        const isExit = confirm("Are you sure you want to exit the game?");
        if (isExit) navigate("/", {replace: true});
    };

    const handleClose = () => setOpen(false);
    const onShare = () => setOpen(true);
    const onCopy = async () => {
        await navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(handleClose, 1000);
    };

    const CopyBtn = () => (
        <TopTooltip title={isCopied ? "Copied!" : "Click to copy"}>
            <IconButton edge="end" onClick={onCopy}>
                <ContentCopyIcon color="primary" />
            </IconButton>
        </TopTooltip>
    );

    const copyQRCode = () => {
        const canvasEl = qrCodeEL.current?.children[0] as HTMLCanvasElement;
        canvasEl?.toBlob(async blob => {
            if (!blob) return;
            const item = new ClipboardItem({"image/png": blob});
            await navigator.clipboard.write([item]);
            handleClose();
        });
    };

    return (
        <div className="flex mt-2">
            <SmallOutlineBtn
                startIcon={<LogoutIcon />}
                color="error"
                className="flex-1"
                onClick={onExit}
            >
                Exit
            </SmallOutlineBtn>
            <SmallOutlineBtn
                startIcon={<ShareIcon />}
                className="flex-1 ml-2"
                onClick={onShare}
            >
                Share
            </SmallOutlineBtn>
            <Dialog open={open} onClose={handleClose} maxWidth="xs">
                <DialogTitle>Share this game</DialogTitle>
                <DialogContent sx={{marginTop: "1px"}}>
                    <Grid container direction="column">
                        <Divider variant="middle" sx={{marginBottom: "8px"}}>
                            <Typography>Via The Link Below</Typography>
                        </Divider>
                        <CssTextField
                            size="small"
                            disabled
                            value={shareLink}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <CopyBtn />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Divider variant="middle" sx={{margin: "8px 0"}}>
                            <Typography>Or Share This QR Code</Typography>
                        </Divider>
                        <Grid item container direction="column">
                            <Grid
                                ref={qrCodeEL}
                                item
                                sx={{
                                    margin: "auto",
                                    "& canvas": {
                                        borderRadius: "12px",
                                    },
                                }}
                            >
                                <AppQrCode value={shareLink} />
                            </Grid>
                            <Button onClick={copyQRCode}>Copy QR Code</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GameSupportController;
