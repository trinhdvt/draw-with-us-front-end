enum CollectionType {
    ALL,
    PUBLIC,
    YOUR,
    OFFICIAL,
}

interface Collection {
    hidden?: boolean;
    selected?: boolean;
    thumbnail: string;
    name: string;
    type: CollectionType;
    id: string;
}

const CollectionDefault: Collection = {
    thumbnail: "",
    name: "Easy",
    type: CollectionType.ALL,
    hidden: false,
    selected: false,
    id: "",
};

export {CollectionType, CollectionDefault};
export type {Collection};
