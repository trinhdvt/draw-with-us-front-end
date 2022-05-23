import React from "react";
import CssTextField from "./CssTextField";
import {InputAdornment, TextFieldProps} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
        }}
    />
);

export default React.memo(SearchField);
