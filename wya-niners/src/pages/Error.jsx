import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" sx={{ mb: 2 }}>
        404 Not Found
      </Typography>
      <Link to="/">
        <Button variant="contained">Return</Button>
      </Link>
    </Box>
  );
}
