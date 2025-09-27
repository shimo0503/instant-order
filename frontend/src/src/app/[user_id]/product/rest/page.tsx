'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, ListItem, Stack, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import Header from '@/components/Header';
import { PostApiRestBody } from '@/generated/backend/model';
import {
  useGetApiProduct,
  usePostApiRest,
} from '@/generated/backend/product/product';

//ヘッダー情報
const headerData = {
  description: '商品が今いくつ残っているかを登録できます。',
  title: '残数登録',
};

// スキーマ
const Schema = z.object({
  name: z.string().min(1, '1文字以上入力してください。'),
  rest: z.number().min(1, '1文字以上入力してください。'),
});

type params = z.infer<typeof Schema>;

const RestRegister = () => {
  const { data } = useGetApiProduct();
  const { data: result, mutate, isPending, isError } = usePostApiRest();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });
  const handleSubmitPost: SubmitHandler<params> = (
    formData: PostApiRestBody,
  ) => {
    mutate(
      {
        data: {
          name: formData.name,
          rest: formData.rest,
        },
      },
      {
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };
  return (
    <Stack>
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
          <Box
            component="select"
            {...register('name')}
            sx={{
              borderRadius: '4px',
              fontSize: '20px',
              height: '60px',
              ml: 1,
              mr: 1,
              width: '220px',
            }}
          >
            {data?.data?.map((product, index) => {
              return (
                <option key={index} value={product.name}>
                  {product.name}
                </option>
              );
            })}
          </Box>
          <TextField
            label="残数"
            {...register('rest', { valueAsNumber: true })}
            error={!!errors.rest?.message}
            helperText={errors.rest?.message}
            placeholder="残数を入力してください"
            sx={{
              ml: 1,
              mr: 1,
              width: '220px',
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
        <Box sx={{ color: 'red' }}>送信中</Box>
      ) : isError ? (
        <Box sx={{ color: 'red' }}>残数の登録に失敗しました。</Box>
      ) : (
        <Box>{result?.data}</Box>
      )}
    </Stack>
  );
};

export default RestRegister;
