import { Box } from "@mui/material";

import LinkCard from "@/components/LinkCard";
import SidebarData from "@/components/SidebarData";

const Home = () => {
  return (
    <Box sx={
      {
        display: "grid",
        gap: '64px',
        gridTemplateColumns: 'repeat(2, 1fr)'
      }
    }>
      {SidebarData.map(
        (data, index) => (
          <LinkCard index={index} key={index} link={data.link} title={data.title} />
        )
      )}
    </Box>
  )
}

export default Home