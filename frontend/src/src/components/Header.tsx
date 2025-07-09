import { Box, Typography } from "@mui/material"

type headerProps = {
    description: string,
    title: string
}

const Header = (props: headerProps) => {
    const title = props.title
    const description = props.description
    return (
        <Box
            border={1}
            borderColor="grey.400"
            borderRadius={2}
            padding={2}
            sx={{
                mb: 3,
            }}
        >
            <Typography variant="h4">{title}</Typography>
            <Box
                sx={{
                    color: 'grey.600'
                }}
            >
                {description}
            </Box>
        </Box>
    )
}

export default Header