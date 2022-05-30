import {BackendAPI} from "../HttpClient";
import ITopic from "../../@types/Topic";

const allTopics = async (): Promise<ITopic[]> => {
    const response = await BackendAPI.get<ITopic[]>("/api/topics");
    return response.data;
};

export {allTopics};
