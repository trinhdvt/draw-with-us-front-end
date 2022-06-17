import React from "react";
import {useNavigate} from "react-router-dom";

import {ReactComponent as Logo} from "../assets/images/logo.svg";

const AppHeader = ({height}: {height?: string}) => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center mb-4">
            <Logo
                width="100%"
                height={height ?? "80px"}
                className="cursor-pointer"
                onClick={() => navigate("/", {replace: true})}
            />
        </div>
    );
};

export default AppHeader;
