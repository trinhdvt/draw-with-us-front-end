import React from "react";

const DividerWithText = ({children}: {children: React.ReactNode}) => {
    const styles = {
        border: {
            borderBottom: "2px solid lightgray",
            width: "100%",
        },
    };

    return (
        <div className="flex items-center">
            <div style={styles["border"]} />
            <div className="px-2.5">{children}</div>
            <div style={styles["border"]} />
        </div>
    );
};

export default DividerWithText;
