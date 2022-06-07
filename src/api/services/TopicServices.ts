import {BackendAPI} from "../HttpClient";
import ITopic from "../../@types/Topic";
import {useInfiniteQuery, useQuery} from "react-query";
import ISample from "../../@types/Sample";

const allTopics = async (): Promise<ITopic[]> => {
    const response = await BackendAPI.get<ITopic[]>("/api/topics");
    return response.data;
};

const useTopics = () => {
    return useQuery("topics", allTopics, {
        staleTime: Infinity,
    });
};

interface ISampleRequest {
    topicId?: string;
    pageParam?: number;
}

interface ISampleResponse {
    data: ISample[];
    nextPage: number;
}

const fetchSample = async ({
    topicId,
    pageParam = 0,
}: ISampleRequest): Promise<ISampleResponse> => {
    if (!topicId) {
        throw new Error("Topic id is required");
    }

    const {data} = await BackendAPI.get(`/api/topic/${topicId}/samples`, {
        params: {
            page: pageParam,
            size: 20,
        },
    });
    return {data, nextPage: pageParam + 1};
};

const useTopic = (topicId?: string) => {
    return useInfiniteQuery(
        ["samples", topicId],
        ({pageParam = 0}: ISampleRequest) => fetchSample({topicId, pageParam}),
        {
            getNextPageParam: lastPage => {
                return lastPage.data.length === 0
                    ? undefined
                    : lastPage.nextPage;
            },
        }
    );
};

export {allTopics, useTopics, fetchSample, useTopic};
