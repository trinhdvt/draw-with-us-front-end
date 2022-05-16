import {BackendAPI} from "../api/HttpClient";
import {Room} from "../@types/Room";

export default class RoomServices {
    public static async create(data: Room) {
        try {
            const response = await BackendAPI.post("/api/rooms", data);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }
}
