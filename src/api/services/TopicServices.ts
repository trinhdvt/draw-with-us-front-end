import {BackendAPI} from "../HttpClient";
import Topic from "../../@types/Topic";

const allTopics = async () => {
    const response = await BackendAPI.get<Topic[]>("/api/topics");
    return response.data;
};
export {allTopics};
