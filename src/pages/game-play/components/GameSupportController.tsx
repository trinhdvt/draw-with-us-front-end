import React from "react";
import {
    Button,
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
import {useTranslation} from "react-i18next";

import CssTextField from "../../../components/CssTextField";
import {useGame} from "../context/GameContext";
import TopTooltip from "../../../components/TopTooltip";
import AppQrCode from "../../../components/AppQRCode";

import SmallOutlineBtn from "./SmallOutlineBtn";

const GameSupportController = () => {
    const {t} = useTranslation();
    const {gameState} = useGame();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [isCopied, setCopied] = React.useState(false);
    const qrCodeEL = React.useRef<HTMLDivElement>(null);
    const {protocol, hostname} = location;
    const port = import.meta.env.DEV ? `:${location.port}` : "";
    const shareLink = `${protocol}//${hostname}${port}/join?rid=${gameState.roomId}`;

    const onExit = () => {
        const isExit = confirm(t("game_play.exit_confirm"));
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
        <TopTooltip
            title={
                isCopied
                    ? t("game_play.share_modal.copied")
                    : t("game_play.share_modal.not_copied")
            }
        >
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
                {t("game_play.support_btn.exit")}
            </SmallOutlineBtn>
            <SmallOutlineBtn
                startIcon={<ShareIcon />}
                className="flex-1 ml-2"
                onClick={onShare}
            >
                {t("game_play.support_btn.share")}
            </SmallOutlineBtn>
            <Dialog open={open} onClose={handleClose} maxWidth="xs">
                <DialogTitle>{t("game_play.share_modal.title")}</DialogTitle>
                <DialogContent sx={{marginTop: "1px"}}>
                    <Grid container direction="column">
                        <Divider variant="middle" sx={{marginBottom: "8px"}}>
                            <Typography>
                                {t("game_play.share_modal.link_desc")}
                            </Typography>
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
                            <Typography>
                                {t("game_play.share_modal.qr_code_desc")}
                            </Typography>
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
                            <Button onClick={copyQRCode}>
                                {t("game_play.share_modal.copy_qr")}
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GameSupportController;
