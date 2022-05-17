import React from "react";
import StyledAvatar from "./StyledAvatar";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Jdenticon from "react-jdenticon";
import {AvatarProps} from "@mui/material";

interface Props {
    size: string;
    value?: string;
}

const RandomAvatar = (props: Props & Omit<AvatarProps, "size">) => {
    const {value, size, ...others} = props;
    const defaultValue = "https://cdn.trinhdvt.tech/avatar.png";

    return (
        <StyledAvatar {...others}>
            <Jdenticon value={value ?? defaultValue} size={size} />
        </StyledAvatar>
    );
};

export default RandomAvatar;
