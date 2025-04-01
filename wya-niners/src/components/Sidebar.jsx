import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const drawerWidth = 240;

// add dynamic updating
const discoverButtonList = [
  { text: "Home", icon: <HomeIcon /> },
  { text: "Browse", icon: <SearchIcon /> },
];

// add dynamic updating
const trendingButtonList = [
  { text: "Event 1", icon: <WhatshotIcon /> },
  { text: "Event 2", icon: <WhatshotIcon /> },
  { text: "Event 3", icon: <WhatshotIcon /> },
];

export default function Sidebar() {
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
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 1, mt: 1 }}
      >
        WYANiners
      </Typography>

      <Typography sx={{ px: 2, pt: 2, fontWeight: "bold" }}>
        Discover
      </Typography>
      <List>
        {discoverButtonList.map(({ text, icon }) => (
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
        ))}
      </List>

      <Typography sx={{ px: 2, pt: 2, fontWeight: "bold" }}>
        Trending Events
      </Typography>
      <List>
        {trendingButtonList.map(({ text, icon }) => (
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
        ))}
      </List>
    </Drawer>
  );
}
