'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { Box, Button, ListItem, TextField } from "@mui/material"
import { usePostApiMenuNew } from "@/generated/backend/menu/menu"
import { PostApiMenuNewBody } from "@/generated/backend/model"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import Header from "@/components/Header"
import { AxiosError } from "axios"

// ヘッダー
const headerData = {
    title: "メニュー追加",
    description: "まだ登録されていないメニューを追加します。残数は0で設定されるので、残数登録は残数登録ページで行ってください。"
}

// スキーマ
const Schema = z.object({
    name: z.string().min(1, '1文字以上入力してください。'),
    price: z.number().min(1, '1文字以上入力してください。'),
})
type params = z.infer<typeof Schema>

const Add = () => {
    const { data, mutate, isPending, error } = usePostApiMenuNew()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(Schema)
    })
    const handleSubmitPost: SubmitHandler<params> = (formData:PostApiMenuNewBody ) => {
        mutate(
            {
                data: {
                    name: formData.name,
                    price: formData.price
                }
            },
            {
                onError: (error) => [
                    console.log(error)
                ]
            }
        )
    }
    return (
        <Box>
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
                    <TextField
                        label='商品名'
                        {...register('name')}
                        variant='outlined'
                        placeholder='商品名を入力してください'
                        error={!!errors.name?.message}
                        helperText={errors.name?.message}
                        sx= {{
                            ml: 1,
                            mr: 1
                        }}
                    >
                    </TextField>
                    <TextField
                        label='値段'
                        {...register('price', { valueAsNumber: true })}
                        variant='outlined'
                        placeholder='値段を入力してください'
                        error={!!errors.price?.message}
                        helperText={errors.price?.message}
                        sx= {{
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
                <Box>送信中</Box>
            ) : error ? (
                <Box>
                    {
                        (error as AxiosError<{ data: string }>)?.response?.data?.data ?? 'エラーが発生しました'
                    }
                </Box>
            ) : (
                <Box>{data?.data}</Box>
            )}
        </Box>
    )
}

export default Add