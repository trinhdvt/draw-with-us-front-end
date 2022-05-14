enum CollectionType {
    ALL,
    PUBLIC,
    YOUR,
    OFFICIAL,
}

interface CollectionProps {
    hidden?: boolean;
    selected?: boolean;
    thumbnail: string;
    name: string;
    type: string;
    id: string;
}

const CollectionDefault: CollectionProps = {
    thumbnail: "",
    name: "Easy",
    type: "Default",
    hidden: false,
    selected: false,
    id: "",
};

export {CollectionType, CollectionDefault};
export type {CollectionProps};
