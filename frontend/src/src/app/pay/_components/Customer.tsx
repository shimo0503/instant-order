import {Box, Button, Paper } from "@mui/material"
import { usePostApiPay } from "@/generated/backend/customer/customer"

type ProductProps = {
    table_number: number | undefined,
    price: number | undefined
}

const Customer = (props: ProductProps) => {
    const table_number = props.table_number
    const price = props.price

    const { mutate } = usePostApiPay()

    // 提供済みかどうかを反転する。
    const SubmitHandler = () => {
        if (table_number !== undefined) {
            mutate(
                {
                    data: {
                        table_number: table_number
                    }
                },
                {
                    onError: (error) => {
                        console.log(error)
                    }
                }
            )
        }
        window.location.reload();
    }

    if (table_number && price) {
        return (
            <Paper
                elevation={5}
                sx={{
                    p: 2,
                    m: 1,
                    width: 260,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box>テーブル番号: {table_number}</Box>
                <Box>{price}円</Box>
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        mt: 2
                    }}
                    onClick={SubmitHandler}
                >
                    会計
                </Button>
            </Paper>
        )
    }
    else {
        return null
    }
}

export default Customer