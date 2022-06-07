import React from "react";
import {Button, Divider, Grid, Stack} from "@mui/material";
import styles from "../../assets/styles/Gallery.module.scss";
import clsx from "clsx";
import RoomLayout from "../../layout/RoomLayout";
import SearchField from "../../components/SearchField";
import {useTopics} from "../../api/services/TopicServices";
import SamplePanel from "./components/SamplePanel";

const Gallery = () => {
    const {data} = useTopics();
    const [selectedId, setSelectId] = React.useState<string | undefined>(
        undefined
    );

    return (
        <RoomLayout
            title="Gallery"
            headerChildren={
                <SearchField className="w-[130px]" placeholder="Topic" />
            }
        >
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
                                onClick={() => setSelectId(id)}
                                variant="outlined"
                            >
                                {nameVi}
                            </Button>
                        ))}
                    </Stack>
                </Grid>
                <SamplePanel
                    topicId={selectedId}
                    md={9}
                    className={styles.samplePanel}
                />
            </Grid>
        </RoomLayout>
    );
};

export default Gallery;
