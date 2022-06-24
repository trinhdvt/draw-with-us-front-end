import create from "zustand";
import {persist} from "zustand/middleware";

import {IUser} from "../api/@types/User";

const DefaultUser: IUser = {
    name: "",
    eid: "",
    sid: "",
    avatar: "",
};

interface IUserState {
    user: IUser;
    token?: string;
}

interface IUserAction {
    setUser: (user: Partial<IUser>) => void;
    setToken: (token: string) => void;
}

const useUser = create<IUserState & IUserAction>()(
    persist(
        (set, getState) => ({
            user: DefaultUser,
            token: undefined,
            setUser: user => {
                set({user: {...getState().user, ...user}});
            },
            setToken: token => set({token}),
        }),
        {
            name: "user-state",
            getStorage: () => sessionStorage,
        }
    )
);

export {useUser};
