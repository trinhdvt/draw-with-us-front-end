import React from "react";
import {Button, ButtonProps, CircularProgress} from "@mui/material";
import clsx from "clsx";

interface LoadingButtonProps extends ButtonProps {
    isLoading: boolean;
    loadingIcon?: React.ReactNode;
}

const LoadingButton = (props: LoadingButtonProps) => {
    const {isLoading, endIcon, loadingIcon, ...others} = props;

    return (
        <Button
            className={clsx(isLoading && "cursor-progress pointer-events-auto")}
            endIcon={
                isLoading
                    ? loadingIcon ?? <CircularProgress size={16.67} />
                    : endIcon
            }
            disabled={isLoading}
            {...others}
        />
    );
};

export default LoadingButton;
