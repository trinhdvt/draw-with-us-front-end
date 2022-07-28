import {useMutation, useQuery} from "@tanstack/react-query";

import {BackendAPI, HttpError} from "../HttpClient";
import {ICollection, ICollectionRequest} from "../@types/Collection";

const fetchCollections = async (): Promise<ICollection[]> => {
    const {data} = await BackendAPI.get("/api/collections");
    return data;
};

const createCollection = async (payload: ICollectionRequest) => {
    const {data} = await BackendAPI.post("/api/collection", payload);
    return data;
};

const useCollections = () => {
    return useQuery(["collections"], fetchCollections);
};

const useCreateCollection = () => {
    return useMutation<unknown, HttpError, ICollectionRequest>(
        ["create-collection"],
        createCollection
    );
};

export {useCollections, useCreateCollection};
