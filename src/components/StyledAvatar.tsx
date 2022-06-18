import React from "react";
import {Avatar, AvatarProps} from "@mui/material";

const StyledAvatar = ({className, ...others}: AvatarProps) => {
    return <Avatar className={`avatar ${className}`} {...others} />;
};

export default StyledAvatar;
