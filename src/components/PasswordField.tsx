import React from "react";
import {IconButton, InputAdornment, TextFieldProps} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

import CssTextField from "./CssTextField";

const PasswordField = (props: TextFieldProps) => {
    const [showPass, setShowPass] = React.useState(false);
    return (
        <CssTextField
            type={showPass ? "text" : "password"}
            autoComplete="off"
            size="small"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
};

export default PasswordField;
