import {BackendAPI} from "../HttpClient";
import {RoomResponse} from "../../@types/Room";

export default class RoomServices {
    static async create(data: Partial<RoomResponse>) {
        try {
            const response = await BackendAPI.post("/api/rooms", data);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }

    static async getAll() {
        const response = await BackendAPI.get<RoomResponse[]>("/api/rooms");
        return response.data;
    }
}
