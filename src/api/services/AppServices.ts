import {useQuery} from "@tanstack/react-query";

import {BackendAPI} from "../HttpClient";

interface IRoomCreateConfig {
    timeOut: number[];
    maxUsers: number[];
}

interface IAppConfig {
    room: IRoomCreateConfig;
}

const useAppConfig = () => {
    return useQuery<IAppConfig>(
        ["app-config"],
        async () => {
            const {data} = await BackendAPI.get("/api/app");
            return data;
        },
        {
            staleTime: Infinity,
        }
    );
};

export {useAppConfig};
export type {IAppConfig, IRoomCreateConfig};
