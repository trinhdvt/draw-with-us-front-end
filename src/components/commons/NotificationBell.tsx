import React from "react";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";


type NotificationProps = {
    color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    badgeContent?: number | string,
}

const NotificationBell = ({ color, badgeContent }: NotificationProps) => {
    return (
        <Tooltip title={`You have ${badgeContent} notifications`} arrow>
            <IconButton
                color={color}
            >
                <Badge badgeContent={badgeContent} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
        </Tooltip>
    )
}

export default NotificationBell;