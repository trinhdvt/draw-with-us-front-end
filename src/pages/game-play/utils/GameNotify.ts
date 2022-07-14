import confetti from "canvas-confetti";
import Swal from "sweetalert2";

import i18n from "../../../i18n/config";
import notify from "../../../utils/Notify";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

const alertSuccess = () => {
    FireWorks();
    return notify({
        title: "Yay!",
        text: i18n.t("game_play.alert.success"),
    });
};

const alertWrong = () => {
    return Toast.fire({
        icon: "error",
        title: i18n.t("game_play.alert.wrong"),
    });
};

const timeUp = () => {
    return notify({
        title: i18n.t("game_play.alert.time_out_title"),
        text: i18n.t("game_play.alert.time_out_content"),
        icon: "error",
        timer: 2500,
    });
};

const alertWelcome = () => {
    return notify({
        title: i18n.t("game_play.alert.welcome_title"),
        text: i18n.t("game_play.alert.welcome_content"),
        icon: "info",
        timer: 3000,
        showConfirmButton: true,
    });
};

const Congrats = (timeLimit = 5) => {
    const end = Date.now() + timeLimit * 1000;
    const colors = ["#bb0000", "#ffffff"];
    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: {x: 0},
            colors: colors,
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: {x: 1},
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
};

const FireWorks = (timeLimit = 3) => {
    const duration = timeLimit * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {startVelocity: 30, spread: 360, ticks: 60, zIndex: 0};

    const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: {x: randomInRange(0.1, 0.3), y: Math.random() - 0.2},
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2},
            })
        );
    }, 250);
};

export {alertSuccess, alertWrong, timeUp, alertWelcome, Congrats, FireWorks};
export default Toast;
