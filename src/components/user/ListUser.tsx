import React from 'react';
import User, {UserProps} from "./User";
import {Divider, Stack} from "@mui/material";

const ListUser = () => {
    const [users, setUsers] = React.useState<UserProps[]>();
    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => {
                // @ts-ignore
                const userProps: UserProps[] = [];
                // @ts-ignore
                json.forEach(user => {
                    userProps.push({
                        name: user.name,
                        point: Math.ceil(Math.random() * 100)
                    })
                });
                setUsers(userProps);
            });
    }, []);
    return (
        <Stack
            spacing={1}
            divider={<Divider orientation="horizontal" flexItem/>}
        >
            {users?.map((user, idx) => <User key={idx} {...user}/>)}
        </Stack>
    );
};

export default ListUser;
