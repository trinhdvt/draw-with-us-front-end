import Swal, {SweetAlertOptions} from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const defaultOption: SweetAlertOptions = {
    icon: 'success',
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true,
}

function notify({title, text, ...otherOptions}: SweetAlertOptions) {
    return Swal.fire({
        title,
        text,
        ...defaultOption,
        ...otherOptions
    });
}

export default notify;
