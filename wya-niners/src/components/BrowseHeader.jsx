import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  InputLabel,
  ButtonGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import AuthButton from "./AuthButton";

export default function BrowseHeader({ input, setInput, onSearchClick }) {
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
              if (e.key === "Enter") {
                onSearchClick();
              }
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
          ></TextField>
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
          <Button startIcon={<FilterAltIcon />}>Filter</Button>
          <Button startIcon={<SwapVertIcon />}>Sort by</Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
