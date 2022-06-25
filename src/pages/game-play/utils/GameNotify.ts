import confetti from "canvas-confetti";
import Swal from "sweetalert2";

import notify from "../../../utils/Notify";

const alertSuccess = () => {
    FireWorks();
    return notify({
        title: "Yay!",
        text: "You got it right!",
    });
};

const alertWrong = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });

    return Toast.fire({
        icon: "error",
        title: "Oops! You got it wrong!",
    });
};

const timeUp = () => {
    return notify({
        title: "Time's up!",
        text: "You have no more time to draw! Let's try in the next round!",
        icon: "error",
        timer: 2500,
    });
};

const alertWelcome = () => {
    return notify({
        title: "Welcome!",
        text: "Draw an image about the word below to get the points!",
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
