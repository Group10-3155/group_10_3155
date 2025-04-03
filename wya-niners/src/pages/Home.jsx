import { Box } from "@mui/material";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import MapComponent from '../components/MapComponent.jsx';
export default function Home() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Box sx={{ flexGrow: 1 }}>
          <MapComponent />
        </Box>
      </Box>
    </Box>
  );
}
