import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {Typography} from "@mui/material";

import styles from "../assets/styles/Tag.module.scss";

interface TagProps {
    label: string;
    onDelete: () => void;
}

const Tag = ({label, onDelete}: TagProps) => (
    <div className={styles.tag}>
        <Typography component="span">{label}</Typography>
        <CloseIcon onClick={onDelete} />
    </div>
);

export default Tag;
