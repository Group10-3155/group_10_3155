// src/pages/Home.jsx
import { Box } from "@mui/material";
import { useState } from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import MapComponent from "../components/MapComponent.jsx";
import events from "../data/events.json";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showHeatmap, setShowHeatMap] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar events={events} onEventSelect={setSelectedEvent} />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header setShowHeatMap={setShowHeatMap} />
        <Box sx={{ flexGrow: 1 }}>
          <MapComponent
            events={events}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            setShowHeatMap={setShowHeatMap}
            showHeatmap={showHeatmap}
          />
        </Box>
      </Box>
    </Box>
  );
}
