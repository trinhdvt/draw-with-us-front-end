import data from "../assets/index_to_name.json";
import Topic from "../models/Topic";

const allTopic = () => {
    return Object.keys(data).map(topicId => {
        // @ts-ignore
        const {vi} = data[topicId];
        return {
            id: topicId,
            name: vi + "",
        } as Topic;
    });
};

export {allTopic};
