import React from "react";
import Fuse from "fuse.js";
import {debounce} from "@mui/material";

import FuseOptionKey = Fuse.FuseOptionKey;

const useSearch = <T,>({
    data,
    keys,
}: {
    data: ReadonlyArray<T> | undefined;
    keys: FuseOptionKey<T>[];
}) => {
    const [filtered, setFiltered] = React.useState<T[] | undefined>();

    const fuse = React.useMemo(() => {
        if (data)
            return new Fuse(data, {
                includeScore: true,
                keys: keys,
            });
    }, [data, keys]);

    const debouncedSearch = React.useMemo(() => {
        return debounce((keyword: string) => {
            const filtered = fuse?.search(keyword);
            setFiltered(filtered?.map(i => i.item));
        }, 500);
    }, [fuse]);

    return [filtered, debouncedSearch] as const;
};

export default useSearch;
