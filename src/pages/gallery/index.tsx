import React, {ChangeEvent} from "react";
import {useTranslation} from "react-i18next";

import RoomLayout from "../../layout/RoomLayout";
import SearchField from "../../components/SearchField";
import {useTopics} from "../../api/services/TopicServices";
import useSearch from "../../hooks/useSearch";

import TopicList from "./components/TopicList";

const Gallery = () => {
    const {t, i18n} = useTranslation();
    const {data} = useTopics(i18n.language);
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

    const renderData = filtered?.length ? filtered : data;

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
            <TopicList data={renderData} />
        </RoomLayout>
    );
};

export default Gallery;
