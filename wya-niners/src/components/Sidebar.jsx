import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  useTheme,
  Button,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const discoverButtonList = [
  { text: "Home", icon: <HomeIcon />, link: "/" },
  { text: "Browse", icon: <SearchIcon />, link: "/browse" },
];

// add dynamic updating
const trendingButtonList = [
  { text: "Event 1", icon: <WhatshotIcon />, eventId: "1" },
  { text: "Event 2", icon: <WhatshotIcon />, eventId: "2" },
  { text: "Event 3", icon: <WhatshotIcon />, eventId: "3" },
];

export default function Sidebar() {
  const theme = useTheme();
  const location = useLocation();

  // Hide Add Event Button in certain pages
  const pagesNoEventButton = ["/create-event"];
  const hideEventButton = !pagesNoEventButton.includes(location.pathname);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          paddingTop: 2,
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                mb: 1,
                mt: 1,
                color: theme.palette.primary.main,
              }}
            >
              WYANiners
            </Typography>
          </Link>

          <Typography sx={{ px: 2, pt: 2, fontWeight: "bold" }}>
            Discover
          </Typography>
          <List>
            {discoverButtonList.map(({ text, icon, link }) => (
              <Link
                to={link}
                style={{
                  textDecoration: "none",
                  width: "100%",
                  color: "black",
                }}
              >
                <ListItem button key={text}>
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                      mr: 1,
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>

          <Typography sx={{ px: 2, pt: 2, fontWeight: "bold" }}>
            Trending Events
          </Typography>
          <List>
            {/* Temporary Trending Events */}
            {trendingButtonList.map(({ text, icon, eventId }) => (
              <Link
                to={`/events/${eventId}`}
                style={{
                  textDecoration: "none",
                  width: "100%",
                  color: "black",
                }}
              >
                <ListItem button key={text}>
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                      mr: 1,
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
        <Link to="/create-event" style={{ textDecoration: "none" }}>
          {hideEventButton && (
            <Box sx={{ pb: 4, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{ height: 50, width: "75%", fontSize: "1.1em" }}
              >
                Add Event
              </Button>
            </Box>
          )}
        </Link>
      </Box>
    </Drawer>
  );
}
