import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  ButtonGroup,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AuthButton from "./AuthButton";
import { useState } from "react";

export default function BrowseHeader({
  input,
  setInput,
  onSearchClick,
  dateFilter,
  setDateFilter,
  sortOrder,
  setSortOrder,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (filterValue) => {
    setDateFilter(filterValue);
    handleClose();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", m: 2 }}>
        <Typography variant="h1">Event Search</Typography>
        <AuthButton />
      </Box>

      <Box sx={{ display: "flex", ml: 2, justifyContent: "space-between" }}>
        <Box>
          <TextField
            variant="outlined"
            placeholder="Search events..."
            size="small"
            sx={{ width: 450 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearchClick();
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            variant="contained"
            sx={{ ml: 1, pb: 1 }}
            onClick={onSearchClick}
          >
            Search
          </Button>
        </Box>

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
          <Button startIcon={<FilterAltIcon />} onClick={handleOpen}>
            Filter
          </Button>
          <Button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {sortOrder === "asc" ? (
                <ArrowUpwardIcon />
              ) : (
                <ArrowDownwardIcon />
              )}
              Sort
            </Box>
          </Button>
        </ButtonGroup>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleSelect("all")}>All Dates</MenuItem>
          <MenuItem onClick={() => handleSelect("today")}>Today</MenuItem>
          <MenuItem onClick={() => handleSelect("thisWeek")}>
            This Week
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
