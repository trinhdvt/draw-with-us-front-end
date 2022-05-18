import React from "react";
import Player, {PlayerProps} from "./Player";
import {Divider, Stack} from "@mui/material";
import axios from "axios";

const ListPlayer = () => {
    const [users, setUsers] = React.useState<PlayerProps[]>();
    React.useEffect(() => {
        axios
            .get<PlayerProps[]>("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                const data = res.data.map<PlayerProps>(user => ({
                    ...user,
                    point: Math.ceil(Math.random() * 100),
                }));
                setUsers(data);
            });
    }, []);

    return (
        <Stack
            spacing={1}
            divider={<Divider orientation="horizontal" flexItem />}
        >
            {users?.map((user, idx) => (
                <Player key={idx} {...user} />
            ))}
        </Stack>
    );
};

export default ListPlayer;
