import { Box } from '@mui/material';

import LinkCard from '@/components/LinkCard';
import SidebarData from '@/components/SidebarData';

const Home = () => {
  return (
    <div className="flex gap-4 mx-4">
      <div className="w-1/2 flex flex-col gap-1">
        <div className="text-3xl font-bold underline">Column Left Row 1</div>
        <div className="bg-green-400">Column Left Row 2</div>
        <div className="bg-green-400">Column Left Row 3</div>
      </div>
      <div className="w-1/2  flex flex-col gap-1">
        <div className="bg-blue-100">Column Right Row 1</div>
        <div className="bg-blue-500">Column Right Row 2</div>
        <div className="bg-blue-500">Column Right Row 3</div>
      </div>
    </div>
  )
};

export default Home;
