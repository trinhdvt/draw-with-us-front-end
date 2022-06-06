import {BackendAPI} from "../HttpClient";
import ITopic from "../../@types/Topic";
import {useQuery} from "react-query";

const allTopics = async (): Promise<ITopic[]> => {
    const response = await BackendAPI.get<ITopic[]>("/api/topics");
    return response.data;
};
const useTopics = () => {
    return useQuery("topics", allTopics, {
        staleTime: Infinity,
    });
};

export {allTopics, useTopics};
