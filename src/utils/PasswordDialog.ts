import Swal from "sweetalert2";

import i18n from "../i18n/config";

const GetPassword = async () => {
    const {value: password} = await Swal.fire<string | undefined>({
        title: i18n.t("password_prompt.title"),
        input: "password",
        inputPlaceholder: i18n.t("password_prompt.place_holder"),
        showCancelButton: true,
        inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off",
        },
    });
    return password;
};

export default GetPassword;
