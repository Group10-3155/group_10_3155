import { Box, ButtonGroup, Button } from "@mui/material";
import { Link, useLocation } from "react-router";
import AuthButton from "./AuthButton";

export default function Header({ setShowHeatMap }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        m: 2,
      }}
    >
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Link to="/">
          <Button onClick={() => setShowHeatMap(false)}>Map</Button>
        </Link>
        <Link to="/">
          <Button onClick={() => setShowHeatMap(true)}>Heatmap</Button>
        </Link>
        <Link to="/notifications">
          <Button>My Events</Button>
        </Link>
      </ButtonGroup>
      <AuthButton />
    </Box>
  );
}
