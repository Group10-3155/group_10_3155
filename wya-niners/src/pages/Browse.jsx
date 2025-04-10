import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar.jsx";
import BrowseHeader from "../components/BrowseHeader.jsx";
import EventTable from "../components/EventTable.jsx";

export default function Browse() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <BrowseHeader />
        <Box sx={{ flexGrow: 1, m: 2 }}>
          <EventTable />
        </Box>
      </Box>
    </Box>
  );
}
