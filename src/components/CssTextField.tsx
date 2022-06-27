import React from "react";
import {TextField, TextFieldProps} from "@mui/material";

const CssTextField = (props: TextFieldProps) => (
    <TextField
        sx={{
            "& fieldset": {
                border: "2px solid gray",
                borderRadius: "12px",
            },
        }}
        {...props}
    />
);

export default CssTextField;
