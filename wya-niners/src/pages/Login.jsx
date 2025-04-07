import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
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
            <Typography variant="h4">Login</Typography>
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
            <Button variant="contained">Login</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
