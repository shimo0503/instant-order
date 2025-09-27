'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, ListItem, TextField } from '@mui/material';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import Header from '@/components/Header';
import { usePostApiMenuNew } from '@/generated/backend/menu/menu';
import { PostApiMenuNewBody } from '@/generated/backend/model';

// ヘッダー
const headerData = {
  description:
    'まだ登録されていないメニューを追加します。残数は0で設定されるので、残数登録は残数登録ページで行ってください。',
  title: 'メニュー追加',
};

// スキーマ
const Schema = z.object({
  name: z.string().min(1, '1文字以上入力してください。'),
  price: z.number().min(1, '1文字以上入力してください。'),
});
type params = z.infer<typeof Schema>;

const Add = () => {
  const { data, mutate, isPending, error } = usePostApiMenuNew();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });
  const handleSubmitPost: SubmitHandler<params> = (
    formData: PostApiMenuNewBody,
  ) => {
    mutate(
      {
        data: {
          name: formData.name,
          price: formData.price,
        },
      },
      {
        onError: (error) => [console.log(error)],
      },
    );
  };
  return (
    <Box>
      <Header description={headerData.description} title={headerData.title} />
      <Box component="form" onSubmit={handleSubmit(handleSubmitPost)}>
        <ListItem
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <TextField
            label="商品名"
            {...register('name')}
            error={!!errors.name?.message}
            helperText={errors.name?.message}
            placeholder="商品名を入力してください"
            sx={{
              ml: 1,
              mr: 1,
            }}
            variant="outlined"
          ></TextField>
          <TextField
            label="値段"
            {...register('price', { valueAsNumber: true })}
            error={!!errors.price?.message}
            helperText={errors.price?.message}
            placeholder="値段を入力してください"
            sx={{
              ml: 1,
              mr: 1,
            }}
            variant="outlined"
          ></TextField>
        </ListItem>
        <Button
          color="primary"
          sx={{
            fontSize: '20px',
            height: '50px',
            ml: 3,
            width: '120px',
          }}
          type="submit"
          variant="contained"
        >
          送信
        </Button>
      </Box>
      {isPending ? (
        <Box>送信中</Box>
      ) : error ? (
        <Box>
          {(error as AxiosError<{ data: string }>)?.response?.data?.data ??
            'エラーが発生しました'}
        </Box>
      ) : (
        <Box>{data?.data}</Box>
      )}
    </Box>
  );
};

export default Add;
