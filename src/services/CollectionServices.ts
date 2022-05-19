import {BackendAPI} from "../api/HttpClient";

import {Collection} from "../@types/Collection";

const allCollections = async () => {
    const response = await BackendAPI.get<Collection[]>("/api/collections");
    return response.data;
};

export {allCollections};
