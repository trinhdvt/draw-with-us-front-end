import axios, {AxiosError, AxiosRequestConfig} from "axios";

import {IUser} from "./@types/User";

const BackendUrl = "https://api.draw-with.trinhdvt.tech/";
// const BackendUrl = "http://localhost:8888";

const onRequest = (config: AxiosRequestConfig) => {
    const {state} = JSON.parse(sessionStorage.getItem("user-state") ?? "{}");
    if (state && Object.hasOwn(state, "user")) {
        const userState: IUser = state.user;
        const {sid, eid} = userState;
        config.headers = {
            "X-SID": sid,
            "X-EID": eid,
        };
    }

    return config;
};

const BackendAPI = axios.create({
    baseURL: BackendUrl,
});
BackendAPI.interceptors.request.use(onRequest);

interface ErrorResponse {
    httpCode: number;
    message: string;
}

type HttpError = AxiosError<ErrorResponse>;

export {BackendAPI, BackendUrl};
export type {HttpError, ErrorResponse};
