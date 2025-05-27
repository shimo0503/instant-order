"use client"

import { AxiosError } from "axios"
import { usePostApiOrderAdd } from "@/generated/backend/menu/menu"
import { useGetApiProduct } from "@/generated/backend/product/product"
import { PostApiOrderAddBody } from "@/generated/backend/model"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray, Controller, SubmitHandler } from "react-hook-form"
import { Box, Stack, TextField, MenuItem, Button } from "@mui/material"
import Header from "@/components/Header"

// ヘッダー
const headerData = {
    title: "新規注文",
    description: "既存のお客さんの注文をします。新規のお客さんに対しての注文は、新規注文ページからお願いします。"
}


const ItemSchema = z.object({
    name: z.string().min(1, '1文字以上入力してください'),
    quantity: z.number().min(1, '注文数は1以上です')
})
const Schema = z.object({
    table_number: z.preprocess((val) => Number(val), z.number().min(1, 'テーブル番号は1以上です。')),
    data: z.array(ItemSchema).min(1, '商品が1つ以上必要です。')
})

type params = z.infer<typeof Schema>

const NewOrder = () => {
    const { data: productdata } = useGetApiProduct()
    const { data: orderResult, mutate, isPending, error } = usePostApiOrderAdd()
    const { control, handleSubmit, setValue, watch } = useForm({
        resolver: zodResolver(Schema),
        defaultValues: {
            table_number: 1,
            data: [{ name: '', quantity: 1 }]
        }
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'data'
    })

    const handleSubmitPost: SubmitHandler<params> = (formData:PostApiOrderAddBody) => {
        mutate(
            {
                data: {
                    table_number: formData.table_number,
                    data: formData.data
                }
            },
            {
                onError: (error) => {
                    console.log(error)
                }
            }
        )
    }

    return(
        <Stack>
            <Header title={headerData.title} description={headerData.description}/>
            <Box
                component='form'
                onSubmit={handleSubmit(handleSubmitPost)}
            >
                <Controller
                    name="table_number"
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <TextField
                                label="テーブル番号"
                                {...field}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                            </TextField>
                        )
                    }}
                />

                {fields.map((field, index) => {
                    const quantity = watch(`data.${index}.quantity`) || 1
                    return (
                        <Box key={field.id} display="flex" gap={1} alignItems="center">
                            <Controller
                                name={`data.${index}.name`}
                                control={control}
                                render={({ field, fieldState }) => {
                                    return(
                                        <TextField
                                            select
                                            label="商品名"
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
                                    )
                                }}
                            />

                            <Controller
                                name={`data.${index}.quantity`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Button
                                            onClick={() =>
                                            setValue(`data.${index}.quantity`, Math.max(1, quantity - 1))
                                            }
                                        >−</Button>
                                        <TextField
                                            {...field}
                                            value={quantity}
                                            inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                            sx={{ width: 50 }}
                                        />
                                            <Button
                                            onClick={() =>
                                                setValue(`data.${index}.quantity`, quantity + 1)
                                            }
                                            >＋</Button>
                                    </Box>
                                    )
                                }
                            />
                            <Button onClick={() => remove(index)}>削除</Button>
                        </Box>
                    )
                })}
                <Button
                    variant='outlined'
                    onClick={() => append({name: '', quantity: 1})}
                >
                    商品を追加
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    注文を送信
                </Button>
            </Box>

            {isPending ? (
                <Box>送信中</Box>
            ) : error ? (
                <Box>
                    {
                        (error as AxiosError<{ data: string }>)?.response?.data?.data ?? 'エラーが発生しました'
                    }
                </Box>
            ) : (
                <Box>{orderResult?.data}</Box>
            )}
        </Stack>
    )
}

export default NewOrder