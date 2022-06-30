import React from "react";
import {InputAdornment, TextFieldProps} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import CssTextField from "./CssTextField";

const SearchField = (props?: TextFieldProps) => (
    <CssTextField
        size="small"
        autoComplete="off"
        {...props}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon color="action" />
                </InputAdornment>
            ),
            sx: {paddingLeft: "4px"},
        }}
    />
);

export default SearchField;
