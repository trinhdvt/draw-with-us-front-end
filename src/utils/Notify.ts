import Swal, {SweetAlertOptions} from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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
        text: "There is no room available! Let's create one!",
        icon: "warning",
        showConfirmButton: true,
        timer: undefined,
    });
};

const confirmJoinRoomNotify = async () => {
    return await notify({
        title: "Join now!",
        text: "We found the room! Do you want to join now?",
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        timer: 10000,
    });
};

export default notify;
export {noRoomNotify, confirmJoinRoomNotify};
