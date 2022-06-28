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
        <Grid item md={7.8} className="flex flex-col ml-auto" {...others}>
            <Grid
                item
                className={clsx(styles.selectPanel, "flex items-center")}
            >
                <Grid item md={5}>
                    <Typography>Select one topic</Typography>
                </Grid>
                <Grid item md className="flex justify-evenly items-center">
                    <Grid item md={4}>
                        <CollectionFilter />
                    </Grid>
                    <Grid item>
                        <LightTooltip title={tooltipTitle()}>
                            <span>
                                <Button
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                    disabled={!isLogin}
                                    onClick={() => navigate("/collection")}
                                >
                                    New Collection
                                </Button>
                            </span>
                        </LightTooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container className={styles.collectionPanel}>
                {filteredData?.map(item => (
                    <CollectionCard
                        {...item}
                        key={item.id}
                        md={3.7}
                        selected={selected === item.id}
                        onClick={() => {
                            setSelected(item.id);
                            onCollectionSelect(item.id);
                        }}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default ListCollection;
