import {BackendAPI} from "../HttpClient";
import {IRoomConfig, IRoomResponse} from "../../@types/Room";

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

    static async getConfig(roomId?: string): Promise<IRoomConfig> {
        const resp = await BackendAPI.get<IRoomConfig>(`/api/room/${roomId}`);
        return resp.data;
    }
}
