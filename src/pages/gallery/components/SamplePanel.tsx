import React from "react";
import {Grid, GridProps} from "@mui/material";
import clsx from "clsx";

import {useSamples} from "../../../api/services/TopicServices";
import styles from "../../../assets/styles/Gallery.module.scss";

import DrawSample from "./DrawSample";

type Props = {
    topicId?: string;
};

const SamplePanel = ({topicId, ...others}: Props & GridProps) => {
    const {data, fetchNextPage} = useSamples(topicId);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        containerRef.current?.scrollTo({top: 0, behavior: "smooth"});
        containerRef.current?.addEventListener("scroll", async (e: Event) => {
            const target = e.target as HTMLDivElement;
            const {scrollTop, scrollHeight, clientHeight} = target;

            if (scrollTop + clientHeight === scrollHeight) {
                await fetchNextPage();
            }
        });
    }, [fetchNextPage, topicId]);

    return (
        <Grid
            item
            className={clsx(
                "w-full grid grid-cols-4 gap-1 auto-rows-[128px] scrollBar px-1",
                styles.samplePanel
            )}
            {...others}
            ref={containerRef}
        >
            {data?.pages?.map(({data: samples}, i) => (
                <React.Fragment key={i}>
                    {samples.map(({id, strokes}) => (
                        <DrawSample key={id} strokes={strokes} />
                    ))}
                </React.Fragment>
            ))}
        </Grid>
    );
};

export default SamplePanel;
