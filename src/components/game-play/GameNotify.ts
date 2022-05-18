import notify from "../../utils/Notify";

const success = () => {
    return notify({
        title: "Yay!",
        text: "You got it right!",
    });
};

const wrong = () => {
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
        text: "You have no more time to draw!",
        icon: "error",
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
const welcome = () => {
    return notify({
        title: "Welcome!",
        text: "Draw an image about the word below to get the points!",
        icon: "info",
        timer: 3000,
        showConfirmButton: true,
    });
};
export {success, wrong, timeUp, nextTurn, welcome};
