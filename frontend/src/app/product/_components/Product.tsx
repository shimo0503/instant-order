import {Box, Button, Paper } from "@mui/material"
import { usePostApiProvide } from "@/generated/backend/product/product"

type ProductProps = {
    table_number: number | undefined,
    name: string | undefined,
    quantity: number |undefined
}

const Product = (props: ProductProps) => {
    const table_number = props.table_number
    const name = props.name
    const quantity = props.quantity

    const { mutate } = usePostApiProvide()

    // 提供済みかどうかを反転する。
    const SubmitHandler = () => {
        if (name !== undefined) {
            mutate(
                {
                    data: {
                        name: name
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

    if (table_number && name && quantity) {
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
                <Box>{name}</Box>
                <Box>{quantity}個</Box>
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        mt: 2
                    }}
                    onClick={SubmitHandler}
                >
                    提供
                </Button>
            </Paper>
        )
    }
    else {
        return null
    }
}

export default Product