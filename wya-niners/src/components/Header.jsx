import { Box, ButtonGroup, Button } from "@mui/material";

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
        <Button active>Map</Button>
        <Button>Trending Spots</Button>
        <Button>Notifications</Button>
      </ButtonGroup>
      <Button variant="contained">Login</Button>
    </Box>
  );
}
