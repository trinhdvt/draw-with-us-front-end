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
}

interface IUserAction {
    setUser: (user: IUser) => void;
    setSID: (sid: string) => void;
}

const useUser = create<IUserState & IUserAction>()(
    persist(
        (set, getState) => ({
            user: DefaultUser,
            setSID: sid => set({user: {...getState().user, sid}}),
            setUser: user => set({user}),
        }),
        {
            name: "user-state",
            getStorage: () => sessionStorage,
        }
    )
);

export {useUser};
