import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export const DataTables = ({ rows, columns, isloading}) => {
    return (
        <Box justifyContent="center" className='w-full' style={{ height: 650 }}>
            <DataGrid rows={rows} columns={columns} loading={isloading} />
        </Box> 
    );
}
