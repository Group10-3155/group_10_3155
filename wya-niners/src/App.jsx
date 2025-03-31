import { Box } from "@mui/material";
import Header from "./components/Header.jsx";

export default function App() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
      </Box>
    </Box>
  );
}
