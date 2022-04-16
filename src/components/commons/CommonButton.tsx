import React from 'react';
import {Button} from "@mui/material";

type BtnProps = {
    children: React.ReactNode;
    color?: 'inherit'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'error'
        | 'info'
        | 'warning';
    disabled?: boolean;
    variant?: 'text'
        | 'outlined'
        | 'contained';
}

const CommonButton = ({children, variant, color = 'primary', disabled = false}: BtnProps) => {
    const btnStyles = {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'red',
        '&:hover': {
            backgroundColor: 'gray',
        }
    }

    return (
        <Button
            color={color}
            disabled={disabled}
            variant={variant}
            sx={btnStyles}
        >
            {children}
        </Button>
    );
};

export default CommonButton;