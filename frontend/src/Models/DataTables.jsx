import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export const DataTables = ({ rows, columns, isloading}) => {
    return (
        <Box justifyContent="center" className='w-full' style={{ height: 650 }}>
            <DataGrid rows={rows} columns={columns} loading={isloading} />
        </Box> 
    );
}

export const Table = ({ rows, columns, isloading}) => {
    return (
        <Box justifyContent="center" className='w-full' style={{ height: 650 }}>
            <table className="table w-full z-0">
                <thead>
                    <tr>
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>accNumber</th>
                    <th>email</th>
                    <th>Blocked</th>
                    <th>age</th>
                    <th>phone</th>
                    <th>status</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </Box> 
    );
}
