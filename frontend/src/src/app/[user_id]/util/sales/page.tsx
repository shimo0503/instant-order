import { Box } from '@mui/material';

import Header from '@/components/Header';

import Sales from './_components/Sales';

const headerData = {
  description: '今までの会計のデータが見れます',
  title: '売上',
};

const SalesPage = () => {
  return (
    <Box>
      <Header description={headerData.description} title={headerData.title} />
      <Sales />
    </Box>
  );
};

export default SalesPage;
