import Swal, {SweetAlertOptions} from 'sweetalert2';

const defaultOption: SweetAlertOptions = {
    icon: 'success',
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true,
}

function notify({title, text, ...otherOptions}: SweetAlertOptions) {
    Swal.fire({
        title,
        text,
        ...defaultOption,
        ...otherOptions
    });
}

export default notify;
