"use client"

import { useGetApiSales } from "@/generated/backend/customer/customer";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'date', headerName: '会計日時', width: 200 },
    { field: 'price', headerName: '値段' }
]

const Sales = () => {
    const { data, isPending, error } = useGetApiSales()
    if (isPending) {
        return <Box>データ取得中</Box>
    }
    else if (error) {
        return <Box>データ取得時にエラーが発生しました。</Box>
    }
    else if (data) {
        return (
            <DataGrid
                rows={data?.data}
                columns={columns}
                disableColumnMenu
                sx={{
                    maxWidth: '1000px'
                }}
            />
        )
    }
}

export default Sales