import notify from "../../../utils/Notify";

const alertSuccess = () => {
    return notify({
        title: "Yay!",
        text: "You got it right!",
    });
};

const alertWrong = () => {
    return notify({
        title: "Oops!",
        text: "You got it wrong!",
        icon: "warning",
        timer: 1000,
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

const nextTurn = (html?: string | HTMLElement) => {
    return notify({
        title: "Drawing time!",
        html: html,
        icon: "info",
        timer: 3000,
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

export {alertSuccess, alertWrong, timeUp, nextTurn, alertWelcome};
