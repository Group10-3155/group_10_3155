import { Box, ButtonGroup, Button } from "@mui/material";
import { Link, useLocation } from "react-router";
import AuthButton from "./AuthButton";

export default function Header() {
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
          <Button>Map</Button>
        </Link>
        <Link to="/">
          <Button>Trending</Button>
        </Link>
        <Link to="/notifications">
          <Button>Notifications</Button>
        </Link>
      </ButtonGroup>
      <AuthButton />
    </Box>
  );
}
