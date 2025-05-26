import Header from "@/components/Header";
import { Box } from "@mui/material";
import Sales from "./_components/Sales";

const headerData = {
    title: "売上",
    description: "今までの会計のデータが見れます"
}

const SalesPage = () => {
    return (
        <Box>
            <Header title={headerData.title} description={headerData.description}/>
            <Sales/>
        </Box>
    )
}

export default SalesPage