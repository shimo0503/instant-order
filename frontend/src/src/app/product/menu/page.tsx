"use client"

import Header from "@/components/Header"
import { useGetApiProduct } from "@/generated/backend/product/product"
import { Box } from "@mui/material"
import Menu from "./_component/Menu"

// ヘッダー
const headerData = {
    title: "メニュー一覧",
    description: "登録されたメニューとその残数、値段を表示します。"
}

const MenuPage = () => {
    const { data, isPending, error } = useGetApiProduct()
    if (isPending) {
        return <Box>データ取得中</Box>
    }
    else if (error) {
        return <Box>データ取得中にエラーが発生しました。</Box>
    }
    else {
        return (
            <Box>
                <Header title={headerData.title} description={headerData.description}/>
                {data?.data?.map((data, index) => (
                    <Menu key={index} name={data.name} rest={data.rest} price={data.price}/>
                ))}
            </Box>
        )
    }
}

export default MenuPage