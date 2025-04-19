import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export default function AuthButton() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp > now) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch {
        setLoggedIn(false);
      }
    }
  }, []);

  return loggedIn ? (
    <Link to="/logout">
      <Button variant="contained">Logout</Button>
    </Link>
  ) : (
    <Link to="/login">
      <Button variant="contained">Login</Button>
    </Link>
  );
}
