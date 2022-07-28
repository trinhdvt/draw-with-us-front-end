import {useInfiniteQuery, useQuery} from "@tanstack/react-query";

import {BackendAPI} from "../HttpClient";
import ITopic from "../@types/Topic";
import ISample from "../@types/Sample";

const fetchAllTopics = async (locale = "vi"): Promise<ITopic[]> => {
    const {data} = await BackendAPI.get("/api/topics", {
        params: {locale},
    });
    return data;
};

const useTopics = (locale: string) => {
    return useQuery(
        ["topics", locale],
        async () => await fetchAllTopics(locale),
        {
            staleTime: Infinity,
        }
    );
};

const useSamples = (topicId?: string) => {
    return useInfiniteQuery(
        ["samples", topicId],
        async ({pageParam = 0}) => {
            const params = {page: pageParam, size: 20};
            const {data} = await BackendAPI.get<ISample[]>(
                `/api/topic/${topicId}/samples`,
                {params}
            );
            return {data, nextPage: pageParam + 1};
        },
        {
            enabled: !!topicId,
            getNextPageParam: lastPage => {
                return lastPage.data.length === 0
                    ? undefined
                    : lastPage.nextPage;
            },
        }
    );
};

export {fetchAllTopics, useTopics, useSamples};
