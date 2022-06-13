import React from "react";
import {Tooltip, TooltipProps} from "@mui/material";

type Props = {
    children: React.ReactNode;
};

const TopTooltip = ({children, ...others}: Props & TooltipProps) => (
    <Tooltip {...others} placement="top" arrow>
        {children}
    </Tooltip>
);

export default TopTooltip;
