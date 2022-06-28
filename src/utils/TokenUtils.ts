import jwt_decode from "jwt-decode";

import {IUser} from "../api/@types/User";

const ReadToken = (token: string): IUser => jwt_decode<IUser>(token);

export {ReadToken};
