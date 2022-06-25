enum CollectionType {
    ALL,
    PUBLIC,
    YOUR,
    OFFICIAL,
}

interface ICollection {
    selected?: boolean;
    thumbnail: string;
    name: string;
    type: CollectionType;
    id: string;
    playedCount?: number;
    numberOfTopics?: number;
}

interface ICollectionRequest {
    name: string;
    topicIds: string[];
    isPublic: boolean;
}

export {CollectionType};
export type {ICollection, ICollectionRequest};
