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

export {CollectionType};
export type {ICollection};
