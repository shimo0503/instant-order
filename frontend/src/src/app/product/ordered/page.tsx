'use client';

import { Box } from '@mui/material';

import Header from '@/components/Header';
import { useGetApiOrderGet } from '@/generated/backend/menu/menu';

import Product from '../_components/Product';

const headerData = {
  description:
    '注文済みでまだ提供されていない商品をテーブル番号と一緒に表示します。',
  title: '注文済み商品',
};

const OrderedProduct = () => {
  const { data, isPending, error } = useGetApiOrderGet();
  if (isPending) {
    return <Box>データ取得中</Box>;
  } else if (error) {
    return <Box>エラーが発生しました</Box>;
  } else {
    console.log(data);
    return (
      <Box>
        <Header description={headerData.description} title={headerData.title} />
        <Box
          sx={{
            display: 'flex',
          }}
        >
          {data?.data?.map((data, index) => {
            if (data.provided == false) {
              return (
                <Product
                  key={index}
                  name={data.product?.name}
                  quantity={data.quantity}
                  table_number={data.customer?.table_number}
                />
              );
            }
          })}
        </Box>
      </Box>
    );
  }
};

export default OrderedProduct;
