'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import { Box, Button, ListItem, Stack, TextField } from "@mui/material"
import { useGetApiProduct, usePostApiRest } from "@/generated/backend/product/product"
import { PostApiRestBody } from "@/generated/backend/model"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import Header from "@/components/Header"

//ヘッダー情報
const headerData = {
    title: "残数登録",
    description: "商品が今いくつ残っているかを登録できます。"
}

// スキーマ
const Schema = z.object({
    name: z.string().min(1, '1文字以上入力してください。'),
    rest: z.number().min(1, '1文字以上入力してください。'),
})

type params = z.infer<typeof Schema>

const RestRegister = () => {
    const { data } = useGetApiProduct()
    const { data: result, mutate, isPending, isError} = usePostApiRest()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(Schema)
    })
    const handleSubmitPost: SubmitHandler<params> = (formData:PostApiRestBody ) => {
        mutate(
            {
                data: {
                    name: formData.name,
                    rest: formData.rest
                }
            },
            {
                onError: (error) => {
                    console.log(error)
                }
            }
        )
    }
    return (
        <Stack>
            <Header title={headerData.title} description={headerData.description}/>
            <Box
                component='form'
                onSubmit={(handleSubmit(handleSubmitPost))}
            >
                <ListItem
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 1
                    }}
                >
                    <Box
                        component='select'
                        {...register('name')}
                        sx={{
                            width: '220px',
                            height: '60px',
                            fontSize: '20px',
                            borderRadius: '4px',
                            ml: 1,
                            mr: 1,
                        }}
                    >
                    {data?.data?.map((product, index) => {
                        return <option key={index} value={product.name}>{product.name}</option>
                    })}

                    </Box>
                    <TextField
                        label='残数'
                        {...register('rest', { valueAsNumber: true })}
                        variant='outlined'
                        placeholder='残数を入力してください'
                        error={!!errors.rest?.message}
                        helperText={errors.rest?.message}
                        sx= {{
                            width: '220px',
                            ml: 1,
                            mr: 1
                        }}
                    >
                    </TextField>
                </ListItem>
                <Button
                    type='submit'
                    variant="contained"
                    color='primary'
                    sx={{
                        width: '120px',
                        height: '50px',
                        fontSize: '20px',
                        ml: 3
                    }}
                >
                    送信
                </Button>
            </Box>
            {isPending ? (
                <Box sx={{color: 'red'}}>送信中</Box>
            ) : isError ? (
                <Box sx={{color: 'red'}}>残数の登録に失敗しました。</Box>
            ) : (
                <Box>{result?.data}</Box>
            )}
        </Stack>
    )
}

export default RestRegister