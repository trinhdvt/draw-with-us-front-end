import React from "react";
import {styled, Tooltip, tooltipClasses, TooltipProps} from "@mui/material";

type Props = {
    children: React.ReactNode;
};

const TopTooltip = ({children, ...others}: Props & TooltipProps) => (
    <Tooltip {...others} placement="top" arrow>
        {children}
    </Tooltip>
);

const LightTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}} placement="top" arrow />
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: "rgba(0, 0, 0, 0.87)",
    },
}));

export {LightTooltip};
export default TopTooltip;
