import axios, {AxiosRequestConfig} from "axios";
import {IUser} from "../@types/User";

const BackendUrl = "https://backend.draw-with.trinhdvt.tech/";
// const BackendUrl = "http://localhost:8888";

const onRequest = (config: AxiosRequestConfig) => {
    const user: IUser = JSON.parse(sessionStorage.getItem("user") ?? "{}");
    const {sid, eid} = user;
    config.headers = {
        "X-SID": sid,
        "X-EID": eid,
    };

    return config;
};

const BackendAPI = axios.create({
    baseURL: BackendUrl,
});
BackendAPI.interceptors.request.use(onRequest);

export {BackendAPI, BackendUrl};
