import {createAvatar} from "@dicebear/avatars";
import * as style from "@dicebear/micah";

const generateAvatar = (seed?: string) => {
    return createAvatar(style, {
        seed: seed,
        dataUri: true,
    });
};

export default generateAvatar;
