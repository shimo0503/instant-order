'use client';

import { Box } from '@mui/material';

import Header from '@/components/Header';
import { useGetApiProduct } from '@/generated/backend/product/product';

import Menu from './_component/Menu';

// ヘッダー
const headerData = {
  description: '登録されたメニューとその残数、値段を表示します。',
  title: 'メニュー一覧',
};

const MenuPage = () => {
  const { data, isPending, error } = useGetApiProduct();
  if (isPending) {
    return <Box>データ取得中</Box>;
  } else if (error) {
    return <Box>データ取得中にエラーが発生しました。</Box>;
  } else {
    return (
      <Box>
        <Header description={headerData.description} title={headerData.title} />
        {data?.data?.map((data, index) => (
          <Menu
            key={index}
            name={data.name}
            price={data.price}
            rest={data.rest}
          />
        ))}
      </Box>
    );
  }
};

export default MenuPage;
