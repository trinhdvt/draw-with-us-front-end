import Swal, {SweetAlertOptions} from "sweetalert2";

import "sweetalert2/dist/sweetalert2.min.css";
import i18n from "../i18n/config";

const defaultOption: SweetAlertOptions = {
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true,
};

const notify = ({title, text, ...otherOptions}: SweetAlertOptions) =>
    Swal.fire({
        title,
        text,
        ...defaultOption,
        ...otherOptions,
    });

const noRoomNotify = async () => {
    return await notify({
        title: "Oops!",
        text: i18n.t("no_room"),
        icon: "warning",
        showConfirmButton: true,
        timer: undefined,
    });
};

const confirmJoinRoomNotify = async () => {
    return await notify({
        title: i18n.t("found_room.title"),
        text: i18n.t("found_room.content"),
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        timer: 10000,
    });
};

const notifyError = (message?: string) => {
    return notify({
        icon: "error",
        title: "Error!",
        text: message ?? "Something went wrong!",
        timer: 3000,
    });
};

export default notify;
export {noRoomNotify, confirmJoinRoomNotify, notifyError};
