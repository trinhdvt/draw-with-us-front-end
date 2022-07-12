import React, {ChangeEvent} from "react";
import {Button, Divider, Grid, Stack} from "@mui/material";
import clsx from "clsx";
import {useTranslation} from "react-i18next";

import styles from "../../assets/styles/Gallery.module.scss";
import RoomLayout from "../../layout/RoomLayout";
import SearchField from "../../components/SearchField";
import {useTopics} from "../../api/services/TopicServices";
import useSearch from "../../hooks/useSearch";

import SamplePanel from "./components/SamplePanel";

const Gallery = () => {
    const {t, i18n} = useTranslation();
    const {data} = useTopics(i18n.language);
    const [selectedId, setSelectId] = React.useState<string | undefined>();
    const [filtered, debouncedSearch] = useSearch({
        data: data,
        keys: ["name"],
    });

    const onSearch = React.useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            const keyword = e.target.value;
            debouncedSearch(keyword);
        },
        [debouncedSearch]
    );

    return (
        <RoomLayout
            title={t("gallery.title")}
            endChildren={
                <SearchField
                    className="w-[150px]"
                    placeholder={t("gallery.search_place_holder")}
                    onChange={onSearch}
                />
            }
        >
            <Grid item className="grid grid-cols-[1fr_3fr] gap-x-3">
                <Grid className={clsx(styles.topicSelectPanel, "scrollBar ")}>
                    <Stack
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                        className="min-w-[195px]"
                    >
                        {(filtered?.length ? filtered : data)?.map(
                            ({id, name}) => (
                                <Button
                                    key={id}
                                    className={clsx(
                                        selectedId == id && styles.selected,
                                        "mx-1"
                                    )}
                                    onClick={() => setSelectId(id)}
                                >
                                    {name}
                                </Button>
                            )
                        )}
                    </Stack>
                </Grid>
                <SamplePanel topicId={selectedId} />
            </Grid>
        </RoomLayout>
    );
};

export default Gallery;
