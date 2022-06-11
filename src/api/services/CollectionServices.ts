import {BackendAPI} from "../HttpClient";
import {ICollection} from "../../@types/Collection";
import {useQuery} from "react-query";

const fetchCollections = async (): Promise<ICollection[]> => {
    const {data} = await BackendAPI.get("/api/collections");
    return data;
};

const useCollections = () => {
    return useQuery("collections", fetchCollections, {
        staleTime: Infinity,
    });
};

export {useCollections};
