import { Box, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar.jsx";

export default function Browse() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h1">Browse Placeholder</Typography>
      </Box>
    </Box>
  );
}
