import {BackendAPI} from "../api/HttpClient";

import {CollectionDefault, Collection} from "../@types/Collection";

const allCollections = async () => {
    const response = await BackendAPI.get<Collection[]>("/api/collections");
    const data = response.data;
    const size = data.length;
    if (size % 4 !== 0) {
        for (let i = 0; i < 4 - (size % 4); i++) {
            data.push({
                ...CollectionDefault,
                hidden: true,
                id: Math.random() + "",
            });
        }
    }

    return data;
};

export {allCollections};
