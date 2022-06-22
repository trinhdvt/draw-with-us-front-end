import React from "react";

import {ReactComponent as Logo} from "../../../assets/images/logo.svg";

const GameHeader = () => (
    <header className="flex justify-center mb-4">
        <Logo width="100%" height="60px" className="cursor-pointer" />
    </header>
);

export default GameHeader;
