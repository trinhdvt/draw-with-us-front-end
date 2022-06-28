import React from "react";
import {Select, SelectProps} from "@mui/material";

const CssSelect = (props: SelectProps) => (
    <Select
        inputProps={{
            sx: {
                border: "2px solid gray",
                borderRadius: "12px !important",
            },
        }}
        sx={{
            "& fieldset": {
                borderRadius: "12px",
                borderWidth: "0px !important",
            },
        }}
        size="small"
        {...props}
    />
);

export default CssSelect;
