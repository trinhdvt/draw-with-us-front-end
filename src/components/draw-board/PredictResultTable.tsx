import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {field: 'id', headerName: 'Label', width: 150, flex: 1},
    {field: 'prob', headerName: 'Probability', width: 250, flex: 1},
];


type Row = {
    id: string | number;
    prob: string | number;
}

interface RsTableProps {
    rows: Row[] | any[];
    isLoading: boolean;
}

const ResultTable = ({rows, isLoading}: RsTableProps) => (
    <div style={{width: 400}}>
        <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            showColumnRightBorder
            hideFooterPagination
            hideFooter
            loading={isLoading}
        />
    </div>
);

export default ResultTable;
export type {Row};
