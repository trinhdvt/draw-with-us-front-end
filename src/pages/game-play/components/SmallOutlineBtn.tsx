import React from "react";
import {Button, ButtonProps} from "@mui/material";

const SmallOutlineBtn = ({
    children,
    ...props
}: {children: React.ReactNode} & ButtonProps) => (
    <Button variant="outlined" size="small" {...props}>
        {children}
    </Button>
);

export default SmallOutlineBtn;
