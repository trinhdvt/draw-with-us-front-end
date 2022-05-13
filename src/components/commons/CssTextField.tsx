import {styled, TextField} from "@mui/material";

const CssTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "2px solid gray",
            borderRadius: 12,
        },
        "&.Mui-focused fieldset": {
            borderColor: "purple",
        },
    },
});

export default CssTextField;
