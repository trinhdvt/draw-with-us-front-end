import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const YourCollection = (props: GridProps) => {
    const {t} = useTranslation();
    return (
        <Grid className="w-full flex flex-col items-center" {...props}>
            <Typography variant="h2" className="uppercase text-center">
                {t("home.your_collection.title")}
            </Typography>
            <div
                className="flex flex-col rounded-xl bg-[#a0bdc9] scrollBar
                    h-full w-full mt-2 max-h-full overflow-y-scroll items-center justify-center"
            >
                <Typography variant="h5">
                    {t("home.your_collection.warn")}
                </Typography>
            </div>
        </Grid>
    );
};

export default YourCollection;
