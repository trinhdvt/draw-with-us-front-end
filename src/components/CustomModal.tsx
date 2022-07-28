import React from "react";
import {createPortal} from "react-dom";

type ModalProps = {
    children: React.ReactNode;
};

const CustomModal = ({children}: ModalProps) => {
    const modalEle = React.useMemo(() => {
        const el = document.createElement("div");
        el.classList.add("modal");
        return el;
    }, []);

    React.useEffect(() => {
        const rootEle = document.getElementById("root") as HTMLElement;
        rootEle.appendChild(modalEle);
        return () => {
            rootEle.removeChild(modalEle);
        };
    }, [modalEle]);

    return createPortal(children, modalEle);
};

export default CustomModal;
