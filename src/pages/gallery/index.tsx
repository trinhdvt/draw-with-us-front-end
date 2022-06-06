import React from "react";
import {Button, Divider, Grid, Stack} from "@mui/material";
import SvgSample, {drawSample} from "./components/DrawSample";
import styles from "../../assets/styles/Gallery.module.scss";
import clsx from "clsx";
import RoomLayout from "../../layout/RoomLayout";
import SearchField from "../../components/SearchField";
import {useTopics} from "../../api/services/TopicServices";

const Gallery = () => {
    const {data} = useTopics();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, startTransition] = React.useTransition();
    const [selectedId, setSelectId] = React.useState("");
    const [sampleData, setSample] = React.useState<number[]>([]);

    const onTopicSelect = (topicId: string) => {
        setSelectId(topicId);
        const randomNumber = Math.floor(Math.random() * 10);
        startTransition(() => {
            setSample(Array(randomNumber).fill(Math.random()));
        });
    };

    return (
        <Grid item container>
            <Grid
                item
                container
                md={2.8}
                direction="column"
                className={styles.topicSelectPanel}
            >
                <Stack
                    divider={<Divider orientation="horizontal" flexItem />}
                    spacing={1}
                >
                    {data?.map(({id, nameVi}) => (
                        <Button
                            key={id}
                            className={clsx(
                                selectedId == id && styles.selected,
                                "mx-[5px]"
                            )}
                            onClick={() => onTopicSelect(id)}
                            variant="outlined"
                        >
                            {nameVi}
                        </Button>
                    ))}
                </Stack>
            </Grid>
            <Grid item container md={9} className={styles.samplePanel}>
                {sampleData.map((_, i) => (
                    <Grid
                        item
                        md={2.8}
                        key={i}
                        width={128}
                        height={128}
                        className={styles.sampleCard}
                    >
                        <SvgSample strokes={drawSample} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

const GalleryWrapper = () => (
    <RoomLayout
        title="Gallery"
        headerChildren={
            <SearchField className="w-[130px]" placeholder="Topic" />
        }
    >
        <Gallery />
    </RoomLayout>
);

export default GalleryWrapper;
