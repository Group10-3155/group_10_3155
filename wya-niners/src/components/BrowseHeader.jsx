import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  InputLabel,
  ButtonGroup,
} from "@mui/material";
import { Link } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export default function BrowseHeader() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          m: 2,
        }}
      >
        <Typography variant="h1">Event Search</Typography>
        <Link to="/login">
          <Button variant="contained">Login</Button>
        </Link>
      </Box>
      <Box sx={{ display: "flex", ml: 2, justifyContent: "space-between" }}>
        <TextField
          variant="outlined"
          placeholder="Search events..."
          size="small"
          sx={{ width: 450 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        ></TextField>
        <ButtonGroup
          variant="outlined"
          sx={{
            mr: 2,
            borderColor: "rgba(0, 0, 0, 0.23)",
            "& .MuiButton-root": {
              color: "grey",
              borderColor: "rgba(0, 0, 0, 0.23)",
              "&:hover": {
                borderColor: "rgba(0, 0, 0, 0.54)",
              },
            },
          }}
        >
          <Button startIcon={<FilterAltIcon />}>Filter</Button>
          <Button startIcon={<SwapVertIcon />}>Sort by</Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
