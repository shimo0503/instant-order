import { Box, Button, Paper } from '@mui/material';

import { usePostApiProvide } from '@/generated/backend/product/product';

type ProductProps = {
  name: string | undefined;
  quantity: number | undefined;
  table_number: number | undefined;
};

const Product = (props: ProductProps) => {
  const table_number = props.table_number;
  const name = props.name;
  const quantity = props.quantity;

  const { mutate } = usePostApiProvide();

  // 提供済みかどうかを反転する。
  const SubmitHandler = () => {
    if (name !== undefined) {
      mutate(
        {
          data: {
            name: name,
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

  if (table_number && name && quantity) {
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
        <Box>{name}</Box>
        <Box>{quantity}個</Box>
        <Button
          color="success"
          onClick={SubmitHandler}
          sx={{
            mt: 2,
          }}
          variant="contained"
        >
          提供
        </Button>
      </Paper>
    );
  } else {
    return null;
  }
};

export default Product;
