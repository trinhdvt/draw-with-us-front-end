import data from "../../assets/index_to_name_easy.json";

const randomTarget = () => {
    const randomIdx = Math.floor(Math.random() * Object.keys(data).length);
    // @ts-ignore
    return data[String(randomIdx)];
};

export default randomTarget;
