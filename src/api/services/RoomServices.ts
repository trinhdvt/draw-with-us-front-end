import {BackendAPI} from "../HttpClient";
import {IRoomConfig, IRoomResponse} from "../../@types/Room";
import {useQuery} from "react-query";
import {IPlayer} from "../../@types/User";

export default class RoomServices {
    static async create(data: Partial<IRoomResponse>) {
        try {
            const response = await BackendAPI.post("/api/rooms", data);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }

    static async getAll() {
        const response = await BackendAPI.get<IRoomResponse[]>("/api/rooms");
        return response.data;
    }
}

const fetchRoom = async (roomId?: string): Promise<IRoomConfig> => {
    if (!roomId) {
        throw new Error("Room id is required");
    }
    const {data} = await BackendAPI.get<IRoomConfig>(`/api/room/${roomId}`);
    return data;
};

const fetchPlayers = async (roomId?: string): Promise<IPlayer[]> => {
    if (!roomId) {
        throw new Error("Room id is required");
    }

    const {data} = await BackendAPI.get<IPlayer[]>(
        `/api/room/${roomId}/players`
    );
    return data.sort((a, b) => (a.point > b.point ? -1 : 1));
};

const useRoom = (roomId?: string) => {
    return useQuery(["room-config", roomId], () => fetchRoom(roomId));
};

const usePlayers = (roomId?: string) => {
    return useQuery(["room-players", roomId], () => fetchPlayers(roomId));
};

export {useRoom, fetchRoom, usePlayers, fetchPlayers};
