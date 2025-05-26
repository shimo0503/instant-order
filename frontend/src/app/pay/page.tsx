'use client'

import { useGetApiCustomer } from "@/generated/backend/customer/customer";
import Header from "@/components/Header";
import { Box } from "@mui/material";
import Customer from "./_components/Customer";

const headerData = {
    title: "会計",
    description: "会計が終わった後、その卓のテーブル番号を押すと、その番号に関連するデータが削除され、その卓を次のお客さんが使えるようにします。売上データのみ保存されます。"
}

const PayPage = () => {
    const {data, isPending, error} = useGetApiCustomer()

    if (isPending) {
        return <Box>データを取得中</Box>
    }
    else if (error) {
        return <Box>客データ取得でエラーが発生しました。</Box>
    }
    else {
        return (
            <Box>
                <Header title={headerData.title} description={headerData.description}/>
                <Box
                    sx={{
                        display: "flex"
                    }}
                >
                    {data?.data?.map((data, index) => {
                        return (
                            <Customer
                                key={index}
                                table_number={data.table_number}
                                price={data.price}
                            />
                        )
                    })}
                </Box>
            </Box>
        )
    }
}
export default PayPage