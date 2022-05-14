import {BackendAPI} from "../api/HttpClient";

import {
    CollectionDefault,
    CollectionProps,
    CollectionType,
} from "../models/Collection";

const allCollections = async () => {
    const response = await BackendAPI.get<CollectionProps[]>("/api/collection");
    const data = response.data.map(item => ({
        ...item,
        type: CollectionType[Number(item["type"])],
    }));
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
