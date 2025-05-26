import { Box } from "@mui/material";
import SidebarData from "@/components/SidebarData";
import LinkCard from "@/components/LinkCard";

const Home = () => {
  return (
    <Box sx={
      {
        display: "grid",
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '64px'
      }
    }>
      {SidebarData.map(
        (data, index) => (
          <LinkCard title={data.title} index={index} link={data.link} key={index} />
        )
      )}
    </Box>
  )
}

export default Home