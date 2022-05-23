import {BackendAPI} from "../HttpClient";

import {Collection} from "../../@types/Collection";
import {useQuery} from "react-query";

const allCollections = async (): Promise<Collection[]> => {
    const response = await BackendAPI.get<Collection[]>("/api/collections");
    return response.data;
};

const useCollectionsQuery = () => {
    return useQuery("collections", () => allCollections(), {
        staleTime: Infinity,
    });
};

export {allCollections, useCollectionsQuery};
