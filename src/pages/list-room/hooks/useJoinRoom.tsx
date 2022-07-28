import React from "react";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";

import GetPassword from "../../../utils/PasswordDialog";
import {notifyError} from "../../../utils/Notify";
import {useSocket} from "../../../store/SocketStore";

type Params = {
    eid: string;
    isPrivate: boolean;
};

const useJoinRoom = () => {
    const socket = useSocket();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const joinRoom = React.useCallback(
        async ({eid, isPrivate}: Params) => {
            let password: string | undefined;

            if (isPrivate) {
                password = await GetPassword();
                if (!password) return;
            }
            socket?.emit(
                "room:join",
                {eid, password},
                async ({message, roomId, onMiddleGame}) => {
                    if (roomId)
                        return navigate(`/play/${roomId}`, {
                            state: {onMiddleGame},
                        });
                    if (message) {
                        await queryClient.invalidateQueries(["rooms"]);
                        await notifyError(message as string);
                    }
                }
            );
        },
        [navigate, queryClient, socket]
    );

    return {joinRoom};
};

export default useJoinRoom;
