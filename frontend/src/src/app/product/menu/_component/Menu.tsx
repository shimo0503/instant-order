import { Box, Paper } from "@mui/material"

type menuProps = {
    name: string | undefined,
    price: number | undefined,
    rest: number | undefined
}

const Menu = (props: menuProps) => {
    const name = props.name
    const rest = props.rest
    const price = props.price
    if (name && price) {
        return (
            <Paper
                elevation={5}
                sx={{
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    m: 1,
                    p: 2,
                    width: 260,
                }}
            >
                <Box>{name}</Box>
                <Box>残り{rest}個</Box>
                <Box>金額:{price}円</Box>
            </Paper>
        )
    }
    else {
        return null
    }
}

export default Menu