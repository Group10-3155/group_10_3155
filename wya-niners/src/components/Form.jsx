// src/components/Form.jsx
import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";

export default function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Sign Up";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 2,
      }}
    >
      {/* Back to Home button in top-left corner, smaller size */}
      <Box sx={{ position: "absolute", top: 16, left: 16 }}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="small"
        >
          Back to Home
        </Button>
      </Box>

      <Card sx={{ width: 350, p: 2 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h4">{name}</Typography>
              <TextField
                label="Username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "center", mt: -1 }}>
                {loading && <CircularProgress />}
              </Box>
              <Button fullWidth type="submit" variant="contained">
                {name}
              </Button>
            </Box>
          </form>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            {method === "login" ? (
              <Typography variant="subtitle1">
                New to WYANiners?{" "}
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  Sign Up
                </Link>
              </Typography>
            ) : (
              <Typography variant="subtitle1">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  Log In
                </Link>
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
