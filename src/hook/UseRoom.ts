import RoomServices from "../api/services/RoomServices";
import {useQuery} from "react-query";

const useRoom = (roomId?: string) => {
    return useQuery(`room-config:${roomId}`, () =>
        RoomServices.getConfig(roomId)
    );
};

export default useRoom;
