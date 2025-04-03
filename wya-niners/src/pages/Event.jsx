import { Box, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { useParams } from "react-router-dom";

export default function Event() {
  const params = useParams();
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Typography variant="h1">Event {params.eventId}</Typography>
      </Box>
    </Box>
  );
}
