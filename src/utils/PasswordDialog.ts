import Swal from "sweetalert2";

const GetPassword = async () => {
    const {value: password} = await Swal.fire<string | undefined>({
        title: "Enter room's password",
        input: "password",
        inputPlaceholder: "Room's password",
        showCancelButton: true,
        inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off",
        },
    });
    return password;
};

export default GetPassword;
