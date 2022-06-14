import React from "react";
import {CollectionType, ICollection} from "../../../@types/Collection";
import {useCollections} from "../../../api/services/CollectionServices";
import CollectionCard from "./CollectionCard";
import {Button, Grid, MenuItem, Select, Typography} from "@mui/material";
import styles from "../../../assets/styles/Room.module.scss";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";

interface Props {
    onSelect: (collectionId: string) => void;
}

const ListCollection = ({onSelect}: Props) => {
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
                : data?.filter(item => item.type == filterType);

        setFilteredData(filterRs);
    }, [filterType, data]);

    const CollectionFilter = () => (
        <Select
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
        </Select>
    );

    const isLogin = true;

    return (
        <>
            <Grid
                item
                container={isLogin}
                alignItems="center"
                className={styles.collectionOption}
            >
                {!isLogin ? (
                    <Typography>
                        Select any topic collection or <b>Sign in</b> to create
                        your own.
                    </Typography>
                ) : (
                    <>
                        <Grid item md={5}>
                            <Typography>Select one topic</Typography>
                        </Grid>
                        <Grid item container md justifyContent="space-evenly">
                            <Grid item md={5}>
                                <CollectionFilter />
                            </Grid>
                            <Grid item>
                                <Button
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                    onClick={() => navigate("/collection")}
                                >
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
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
                            onSelect(item.id);
                        }}
                    />
                ))}
            </Grid>
        </>
    );
};

export default ListCollection;
