import { Box, Button, Paper } from '@mui/material';

import { usePostApiPay } from '@/generated/backend/customer/customer';

type ProductProps = {
  price: number | undefined;
  table_number: number | undefined;
};

const Customer = (props: ProductProps) => {
  const table_number = props.table_number;
  const price = props.price;

  const { mutate } = usePostApiPay();

  // 提供済みかどうかを反転する。
  const SubmitHandler = () => {
    if (table_number !== undefined) {
      mutate(
        {
          data: {
            table_number: table_number,
          },
        },
        {
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
    window.location.reload();
  };

  if (table_number && price) {
    return (
      <Paper
        elevation={5}
        sx={{
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          m: 1,
          p: 2,
          width: 260,
        }}
      >
        <Box>テーブル番号: {table_number}</Box>
        <Box>{price}円</Box>
        <Button
          color="success"
          onClick={SubmitHandler}
          sx={{
            mt: 2,
          }}
          variant="contained"
        >
          会計
        </Button>
      </Paper>
    );
  } else {
    return null;
  }
};

export default Customer;
