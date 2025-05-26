import { Card, CardHeader } from "@mui/material"
import Link from "next/link"

type LinkCardProps = {
    title: string,
    index: number,
    link: string
}
const LinkCard = (props: LinkCardProps) => {
    const title = props.title
    const link = props.link
    const index = props.index
    return (
        <Link href={link}>
            <Card
            key={index}
            variant="outlined"
            sx={
                {
                    mt: '1',
                    mb: '1',
                    textAlign: 'center',
                    backgroundColor: '#b9f8eb'
                }
            }
            >
                <CardHeader title={title} key={index}>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default LinkCard