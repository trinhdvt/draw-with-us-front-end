import {BackendAPI} from "../HttpClient";
import {IRoomConfig, IRoomRequest, IRoomResponse} from "../../@types/Room";
import {useQuery} from "react-query";
import {IPlayer} from "../../@types/User";

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

const fetchRoom = async (roomId?: string): Promise<IRoomConfig> => {
    if (!roomId) throw new Error("Room id is required");

    const {data} = await BackendAPI.get(`/api/room/${roomId}`);
    return data;
};

const fetchPlayers = async (roomId?: string): Promise<IPlayer[]> => {
    if (!roomId) throw new Error("Room id is required");

    const {data} = await BackendAPI.get(`/api/room/${roomId}/players`);
    return data;
};

const useRooms = () => useQuery(["rooms"], fetchAllRooms);

const useRoom = (roomId?: string) =>
    useQuery(["room-config", roomId], () => fetchRoom(roomId));

const usePlayers = (roomId?: string) =>
    useQuery(["room-players", roomId], () => fetchPlayers(roomId));

export {
    useRoom,
    fetchRoom,
    usePlayers,
    fetchPlayers,
    fetchRandom,
    useRooms,
    createRoom,
};
