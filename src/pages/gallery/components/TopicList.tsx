import React from "react";
import {Button, Divider, Grid, Stack} from "@mui/material";
import clsx from "clsx";

import styles from "../../../assets/styles/Gallery.module.scss";
import ITopic from "../../../api/@types/Topic";

import SamplePanel from "./SamplePanel";

type TopicListProps = {
    data?: ITopic[];
};

const TopicList = ({data}: TopicListProps) => {
    const [selectedId, setSelectId] = React.useState<string | undefined>();

    return (
        <Grid item className="grid grid-cols-[1fr_3fr] gap-x-3">
            <Grid className={clsx(styles.topicSelectPanel, "scrollBar ")}>
                <Stack
                    divider={<Divider orientation="horizontal" flexItem />}
                    spacing={1}
                    className="min-w-[195px]"
                >
                    {data?.map(({id, name}) => (
                        <Button
                            key={id}
                            className={clsx(
                                selectedId === id &&
                                    "border-[2px] border-solid border-[red]",
                                "mx-1"
                            )}
                            onClick={() => setSelectId(id)}
                        >
                            {name}
                        </Button>
                    ))}
                </Stack>
            </Grid>
            <SamplePanel topicId={selectedId} />
        </Grid>
    );
};

export default TopicList;
