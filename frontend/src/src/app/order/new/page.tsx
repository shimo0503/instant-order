'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import { AxiosError } from 'axios';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

import Header from '@/components/Header';
import { usePostApiOrderNew } from '@/generated/backend/menu/menu';
import { PostApiOrderAddBody } from '@/generated/backend/model';
import { useGetApiProduct } from '@/generated/backend/product/product';

// ヘッダー
const headerData = {
  description:
    '新規のお客さんの注文をします。注文済みのお客さんに対しての追加注文は、追加注文ページからお願いします。',
  title: '新規注文',
};

const ItemSchema = z.object({
  name: z.string().min(1, '1文字以上入力してください'),
  quantity: z.number().min(1, '注文数は1以上です'),
});
const Schema = z.object({
  data: z.array(ItemSchema).min(1, '商品が1つ以上必要です。'),
  table_number: z.preprocess(
    (val) => Number(val),
    z.number().min(1, 'テーブル番号は1以上です。'),
  ),
});

type params = z.infer<typeof Schema>;

const NewOrder = () => {
  const { data: productdata } = useGetApiProduct();
  const { data: orderResult, mutate, isPending, error } = usePostApiOrderNew();
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      data: [{ name: '', quantity: 1 }],
      table_number: 1,
    },
    resolver: zodResolver(Schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'data',
  });

  const handleSubmitPost: SubmitHandler<params> = (
    formData: PostApiOrderAddBody,
  ) => {
    mutate(
      {
        data: JSON.stringify({
          data: formData.data,
          table_number: formData.table_number,
        }),
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
        <Controller
          control={control}
          name="table_number"
          render={({ field, fieldState }) => {
            return (
              <TextField
                label="テーブル番号"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              ></TextField>
            );
          }}
        />

        {fields.map((field, index) => {
          const quantity = watch(`data.${index}.quantity`) || 1;
          return (
            <Box alignItems="center" display="flex" gap={1} key={field.id}>
              <Controller
                control={control}
                name={`data.${index}.name`}
                render={({ field, fieldState }) => {
                  return (
                    <TextField
                      label="商品名"
                      select
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      sx={{ width: 150 }}
                    >
                      {(productdata?.data ?? []).map((product, index) => (
                        <MenuItem key={index} value={product.name ?? ''}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                }}
              />

              <Controller
                control={control}
                name={`data.${index}.quantity`}
                render={({ field, fieldState }) => (
                  <Box alignItems="center" display="flex" gap={1}>
                    <Button
                      onClick={() =>
                        setValue(
                          `data.${index}.quantity`,
                          Math.max(1, quantity - 1),
                        )
                      }
                    >
                      −
                    </Button>
                    <TextField
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: 'center' },
                      }}
                      sx={{ width: 50 }}
                      value={quantity}
                    />
                    <Button
                      onClick={() =>
                        setValue(`data.${index}.quantity`, quantity + 1)
                      }
                    >
                      ＋
                    </Button>
                  </Box>
                )}
              />
              <Button onClick={() => remove(index)}>削除</Button>
            </Box>
          );
        })}
        <Button
          onClick={() => append({ name: '', quantity: 1 })}
          variant="outlined"
        >
          商品を追加
        </Button>

        <Button color="primary" type="submit" variant="contained">
          注文を送信
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
        <Box>{orderResult?.data}</Box>
      )}
    </Stack>
  );
};

export default NewOrder;
