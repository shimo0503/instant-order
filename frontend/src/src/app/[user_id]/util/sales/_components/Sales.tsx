'use client';

import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useGetApiSales } from '@/generated/backend/customer/customer';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'date', headerName: '会計日時', width: 200 },
  { field: 'price', headerName: '値段' },
];

const Sales = () => {
  const { data, isPending, error } = useGetApiSales();
  if (isPending) {
    return <Box>データ取得中</Box>;
  } else if (error) {
    return <Box>データ取得時にエラーが発生しました。</Box>;
  } else if (data) {
    return (
      <DataGrid
        columns={columns}
        disableColumnMenu
        rows={data?.data}
        sx={{
          maxWidth: '1000px',
        }}
      />
    );
  }
};

export default Sales;
