import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar.jsx";
import BrowseHeader from "../components/BrowseHeader.jsx";
import EventTable from "../components/EventTable.jsx";
import { useEffect, useState } from "react";
import events from "../data/events.json";
export default function Browse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

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
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <Box sx={{ flexGrow: 1, m: 2 }}>
          <EventTable
            searchQuery={searchQuery}
            events={events}
            dateFilter={dateFilter}
            sortOrder={sortOrder}
          />
        </Box>
      </Box>
    </Box>
  );
}
