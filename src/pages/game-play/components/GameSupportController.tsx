import React from "react";
import {
    Button,
    ButtonProps,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {useNavigate} from "react-router-dom";

import CssTextField from "../../../components/CssTextField";
import {useGame} from "../context/GameContext";
import TopTooltip from "../../../components/TopTooltip";

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
    const shareLink = `${location.protocol}://${location.hostname}/play?rid=${gameState.roomId}`;

    const onExit = () => {
        const isExit = confirm("Are you sure you want to exit the game?");
        if (isExit) navigate("/", {replace: true});
    };

    const handleClose = () => setOpen(false);
    const onShare = () => setOpen(true);
    const onCopy = async () => {
        await navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(handleClose, 1500);
    };

    const CopyBtn = () => (
        <TopTooltip title={isCopied ? "Copied!" : "Click to copy"}>
            <IconButton onClick={onCopy}>
                <ContentCopyIcon color="primary" />
            </IconButton>
        </TopTooltip>
    );

    return (
        <div className="flex my-2">
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
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>Share this game</DialogTitle>
                <DialogContent sx={{marginTop: "1px"}}>
                    <CssTextField
                        size="small"
                        disabled
                        fullWidth
                        value={shareLink}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CopyBtn />
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GameSupportController;