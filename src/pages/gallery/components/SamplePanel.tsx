import React from "react";
import {Grid, GridProps} from "@mui/material";

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
            container
            className={styles.samplePanel}
            {...others}
            ref={containerRef}
        >
            {data?.pages?.map(({data: samples}, i) => (
                <React.Fragment key={i}>
                    {samples.map(({id, strokes}) => (
                        <DrawSample md={2.8} key={id} strokes={strokes} />
                    ))}
                </React.Fragment>
            ))}
        </Grid>
    );
};

export default SamplePanel;
