import React from "react";
import {Button, Grid, GridProps, MenuItem, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Link, useNavigate} from "react-router-dom";
import clsx from "clsx";

import {CollectionType, ICollection} from "../../../api/@types/Collection";
import {useCollections} from "../../../api/services/CollectionServices";
import styles from "../../../assets/styles/Room.module.scss";
import {LightTooltip} from "../../../components/TopTooltip";
import {useUser} from "../../../store/UserStore";
import CssSelect from "../../../components/CssSelect";

import CollectionCard from "./CollectionCard";

interface Props {
    onCollectionSelect: (collectionId: string) => void;
}

const ListCollection = ({onCollectionSelect, ...others}: Props & GridProps) => {
    const navigate = useNavigate();
    const [filterType, setFilter] = React.useState(CollectionType.ALL);
    const [filteredData, setFilteredData] = React.useState<ICollection[]>();
    const {data} = useCollections();
    const [selected, setSelected] = React.useState("");

    React.useEffect(() => {
        setFilteredData(data);
    }, [data]);

    React.useEffect(() => {
        const filterRs =
            filterType == CollectionType.ALL
                ? data
                : data?.filter(item => item.type === filterType);

        setFilteredData(filterRs);
    }, [filterType, data]);

    const CollectionFilter = () => (
        <CssSelect
            className={styles.selectBox}
            value={filterType}
            onChange={e => setFilter(e.target.value as CollectionType)}
        >
            {Object.keys(CollectionType)
                .filter(k => !isNaN(Number(k)))
                .map(Number)
                .map(k => (
                    <MenuItem value={k} key={k}>
                        {CollectionType[k]}
                    </MenuItem>
                ))}
        </CssSelect>
    );

    const token = useUser(state => state.token);
    const isLogin = !!token;
    const tooltipTitle = () => {
        if (isLogin) return "";

        return (
            <Typography>
                <Link to={"/"}>Sign In</Link>
                <span>{" to create your collection"}</span>
            </Typography>
        );
    };

    return (
        <Grid
            className="w-full grid auto-rows-auto gap-y-2 ml-auto"
            {...others}
        >
            <Grid item className={clsx(styles.selectPanel, "grid grid-cols-3")}>
                <div className="flex items-center">
                    <Typography className="capitalize">
                        Select one topic
                    </Typography>
                </div>
                <div className="flex col-span-2 justify-end items-center">
                    <div className="mr-2">
                        <CollectionFilter />
                    </div>
                    <LightTooltip title={tooltipTitle()}>
                        <div>
                            <Button
                                startIcon={<AddIcon />}
                                variant="contained"
                                disabled={!isLogin}
                                onClick={() => navigate("/collection")}
                            >
                                New Collection
                            </Button>
                        </div>
                    </LightTooltip>
                </div>
            </Grid>
            <div
                className={clsx(
                    styles.collectionPanel,
                    "w-full grid grid-cols-3 gap-2 px-1 mt-0 scrollBar"
                )}
            >
                {filteredData?.map(item => (
                    <CollectionCard
                        {...item}
                        key={item.id}
                        selected={selected === item.id}
                        onClick={() => {
                            setSelected(item.id);
                            onCollectionSelect(item.id);
                        }}
                    />
                ))}
            </div>
        </Grid>
    );
};

export default ListCollection;
