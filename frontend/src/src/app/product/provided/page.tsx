"use client"

import { Box } from "@mui/material"
import Header from "@/components/Header"
import { useGetApiOrderGet } from "@/generated/backend/menu/menu"
import Product from "../_components/Product"

const headerData = {
    title: "提供済み商品",
    description: "注文済みでかつ提供済み商品をテーブル番号と一緒に表示します。提供ボタンを押すと未提供に戻せます。"
}

const OrderedProduct = () => {
    const { data,  isPending, error } = useGetApiOrderGet()
    if (isPending) {
        return <Box>データ取得中</Box>
    }
    else if (error) {
        return <Box>エラーが発生しました</Box>
    }
    else {
        console.log(data)
        return (
            <Box>
                <Header title={headerData.title} description={headerData.description}/>
                <Box
                    sx={{
                        display: "flex"
                    }}
                >
                    {data?.data?.map((data, index) => {
                        if (data.provided == true) {
                            return (
                                <Product
                                    key={index}
                                    table_number={data.customer?.table_number}
                                    name={data.product?.name}
                                    quantity={data.quantity}
                                />
                            )
                        }
                    })}
                </Box>
            </Box>
        )
    }
}

export default OrderedProduct