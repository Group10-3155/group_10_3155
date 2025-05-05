// src/components/Sidebar.jsx
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Box,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { Link, Link as RouterLink } from "react-router-dom";

const drawerWidth = 240;

// include the link paths here
const discoverItems = [
  { text: "Home", icon: <HomeIcon />, link: "/" },
  { text: "Browse", icon: <SearchIcon />, link: "/browse" },
];

export default function Sidebar({ events = [], onEventSelect }) {
  const theme = useTheme();

  // pick first 5 as “trending”
  const trending = events.slice(0, 4).map((evt) => ({
    ...evt,
    text: evt.name || evt.title || "Untitled",
    icon: <WhatshotIcon />,
  }));

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          pt: 2,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              <Box component="span" sx={{ color: theme.palette.primary.main }}>
                WYA
              </Box>
              <Box
                component="span"
                sx={{ color: theme.palette.secondary.main }}
              >
                Niners
              </Box>
            </Typography>
          </Link>

          <Typography variant="h5" sx={{ px: 2, pt: 1, fontWeight: "bold" }}>
            Discover
          </Typography>
          <List>
            {discoverItems.map(({ text, icon, link }) => (
              <ListItem button key={text} component={RouterLink} to={link}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} sx={{ color: "black" }} />
              </ListItem>
            ))}
          </List>

          <Typography variant="h5" sx={{ px: 2, pt: 1, fontWeight: "bold" }}>
            Trending Events
          </Typography>
          <List>
            {trending.length > 0 ? (
              trending.map((evt) => (
                <ListItem
                  button
                  key={evt.id ?? evt._id}
                  onClick={() => onEventSelect(evt)}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <ListItemIcon>{evt.icon}</ListItemIcon>
                  <ListItemText primary={evt.text} noWrap />
                </ListItem>
              ))
            ) : (
              <Typography
                sx={{
                  px: 2,
                  py: 1,
                  fontSize: "0.875rem",
                  color: "text.secondary",
                }}
              >
                No events to show
              </Typography>
            )}
          </List>
        </Box>

        <Box sx={{ pb: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/create-event"
            sx={{ width: "75%", height: 50, fontSize: "1.1em" }}
          >
            Add Event
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
