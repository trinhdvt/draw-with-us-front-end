import {useMutation, useQuery} from "react-query";

import {BackendAPI, HttpError} from "../HttpClient";
import {
    IRoomConfig,
    IRoomPreview,
    IRoomRequest,
    IRoomResponse,
} from "../@types/Room";
import {IPlayer} from "../@types/User";

const createRoom = async (payload: IRoomRequest): Promise<IRoomResponse> => {
    const {data} = await BackendAPI.post("/api/rooms", payload);
    return data;
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
    return useQuery<IRoomConfig, HttpError>(
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

const usePreviewRoom = (roomId: string | null) => {
    return useQuery<IRoomPreview, HttpError>(
        ["room-preview", roomId],
        async () => {
            const {data} = await BackendAPI.get(`/api/room/${roomId}/preview`);
            return data;
        },
        {
            enabled: !!roomId,
            retry: false,
        }
    );
};

const usePlayers = (roomId?: string) => {
    return useQuery<IPlayer[], HttpError>(
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

const useCreateRoom = () => {
    return useMutation<IRoomResponse, HttpError, IRoomRequest>(
        "create-room",
        createRoom
    );
};

export {
    useRoom,
    usePlayers,
    fetchRandom,
    useRooms,
    useValidPlayer,
    useCreateRoom,
    usePreviewRoom,
};
