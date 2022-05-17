import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {Box} from "@mui/material";

interface TagProps {
    label: string;
    onDelete: () => void;
}

const tagCss = {
    display: "flex",
    alignItems: "center",
    height: "24px",
    margin: "2px",
    lineHeight: "22px",
    backgroundColor: "#fafafa",
    border: "1px solid #e8e8e8",
    borderRadius: "4px",
    boxSizing: "content-box",
    padding: "0 4px 0 10px",
    outline: "0",
    overflow: "hidden",
    "& span": {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    "& svg": {
        fontSize: "12px",
        cursor: "pointer",
        padding: "4px",
    },
};
const Tag = (props: TagProps) => {
    const {label, onDelete} = props;
    return (
        <Box sx={tagCss}>
            <span>{label}</span>
            <CloseIcon onClick={onDelete} />
        </Box>
    );
};

export type {TagProps};
export default Tag;
