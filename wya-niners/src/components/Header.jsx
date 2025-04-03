import { Box, ButtonGroup, Button } from "@mui/material";
import { Link } from "react-router";

export default function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        m: 2,
        "& .MuiButton-root": { textTransform: "none" },
      }}
    >
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Link to="/">
          <Button>Map</Button>
        </Link>
        <Link to="/">
          <Button>Trending</Button>
        </Link>
        <Link to="/notifications">
          <Button>Notifications</Button>
        </Link>
      </ButtonGroup>
      <Link to="/login">
        <Button variant="contained">Login</Button>
      </Link>
    </Box>
  );
}
