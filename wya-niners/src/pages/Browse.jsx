import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar.jsx";
import BrowseHeader from "../components/BrowseHeader.jsx";
import EventTable from "../components/EventTable.jsx";
import { useEffect, useState } from "react";
import events from "../data/events.json";
export default function Browse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <BrowseHeader
          input={searchInput}
          setInput={setSearchInput}
          onSearchClick={handleSearch}
        />
        <Box sx={{ flexGrow: 1, m: 2 }}>
          <EventTable searchQuery={searchQuery} events={events} />
        </Box>
      </Box>
    </Box>
  );
}
