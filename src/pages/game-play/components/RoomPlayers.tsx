import React from "react";
import Player, {PlayerProps} from "./Player";
import {Divider, Stack} from "@mui/material";
import axios from "axios";

const RoomPlayers = () => {
    const [users, setUsers] = React.useState<PlayerProps[]>([]);
    React.useEffect(() => {
        axios
            .get<PlayerProps[]>("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                const data = res.data
                    .map<PlayerProps>(user => ({
                        ...user,
                        point: Math.ceil(Math.random() * 100),
                    }))
                    .sort((a, b) => (a.point > b.point ? -1 : 1));
                setUsers(data);
            });
    }, []);

    return (
        <Stack
            spacing={1}
            divider={<Divider orientation="horizontal" flexItem />}
        >
            {users.map((user, idx) => (
                <Player
                    key={idx}
                    {...user}
                    topk={idx < 3 ? idx + 1 : undefined}
                />
            ))}
        </Stack>
    );
};

export default RoomPlayers;
