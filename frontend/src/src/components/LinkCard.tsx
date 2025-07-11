import { Card, CardHeader } from '@mui/material';
import Link from 'next/link';

type LinkCardProps = {
  index: number;
  link: string;
  title: string;
};
const LinkCard = (props: LinkCardProps) => {
  const title = props.title;
  const link = props.link;
  const index = props.index;
  return (
    <Link href={link}>
      <Card
        key={index}
        sx={{
          backgroundColor: '#b9f8eb',
          mb: '1',
          mt: '1',
          textAlign: 'center',
        }}
        variant="outlined"
      >
        <CardHeader key={index} title={title}></CardHeader>
      </Card>
    </Link>
  );
};

export default LinkCard;
