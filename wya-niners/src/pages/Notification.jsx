import { Box, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";

export default function Notification() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Typography variant="h1">Notification Placeholder</Typography>
      </Box>
    </Box>
  );
}
