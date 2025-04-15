import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Register() {
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
      <Card sx={{ width: 350, p: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h4">Register</Typography>
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              sx={{ pb: 1 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              required
              sx={{ pb: 1 }}
            />
            <Button variant="contained">Register</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
