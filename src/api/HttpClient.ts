import axios from "axios";

const BackendUrl = "https://backend.draw-with.trinhdvt.tech/";
// const BackendUrl = "http://localhost:8888";
const PredictUrl = "https://api.draw-with.trinhdvt.tech";

const BackendAPI = axios.create({
    baseURL: BackendUrl,
});

const PredictAPI = axios.create({
    baseURL: PredictUrl,
});

export {BackendAPI, PredictAPI, BackendUrl, PredictUrl};
