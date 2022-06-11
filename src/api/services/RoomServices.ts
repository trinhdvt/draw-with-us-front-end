import {BackendAPI} from "../HttpClient";
import {IRoomConfig, IRoomRequest, IRoomResponse} from "../../@types/Room";
import {useQuery} from "react-query";
import {IPlayer} from "../../@types/User";
import {AxiosError} from "axios";

const createRoom = async (payload: IRoomRequest): Promise<IRoomResponse> => {
    const response = await BackendAPI.post("/api/rooms", payload);
    return response.data;
};

const fetchRandom = async (): Promise<{roomEId: string}> => {
    const {data} = await BackendAPI.get("/api/play");
    return data;
};

const fetchAllRooms = async (): Promise<IRoomResponse[]> => {
    const {data} = await BackendAPI.get("/api/rooms");
    return data;
};

const useRooms = () => useQuery(["rooms"], fetchAllRooms);

const useValidPlayer = (roomId?: string) => {
    return useQuery(
        ["valid-player", roomId],
        async () => {
            await BackendAPI.head(`/api/room/${roomId}/player`);
        },
        {
            enabled: !!roomId,
            retry: false,
        }
    );
};

const useRoom = (roomId?: string) => {
    return useQuery<IRoomConfig, AxiosError>(
        ["room-config", roomId],
        async () => {
            const {data} = await BackendAPI.get(`/api/room/${roomId}`);
            return data;
        },
        {
            enabled: !!roomId,
        }
    );
};

const usePlayers = (roomId?: string) => {
    return useQuery<IPlayer[], AxiosError>(
        ["room-players", roomId],
        async () => {
            const {data} = await BackendAPI.get(`/api/room/${roomId}/players`);
            return data;
        },
        {
            enabled: !!roomId,
        }
    );
};

export {useRoom, usePlayers, fetchRandom, useRooms, createRoom, useValidPlayer};
