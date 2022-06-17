import React from "react";
import {AvatarProps} from "@mui/material";

import StyledAvatar from "./StyledAvatar";

interface Props {
    size: number;
    value?: string;
}

const RandomAvatar = (props: Props & Omit<AvatarProps, "size">) => {
    const {value, size, ...others} = props;
    const defaultValue = "https://cdn.trinhdvt.tech/avatar.png";

    const [base64, setBase64] = React.useState("");
    React.useEffect(() => {
        import("jdenticon")
            .then(({toSvg}) => {
                const svgString = toSvg(value ?? defaultValue, size);
                const base64 = btoa(svgString);
                setBase64(`data:image/svg+xml;base64,${base64}`);
            })
            .catch(() => ({}));
    }, [size, value]);

    return <StyledAvatar src={base64} alt="User's avatar" {...others} />;
};

export default RandomAvatar;
