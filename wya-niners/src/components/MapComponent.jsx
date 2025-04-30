import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import events from "../data/events.json";

export default function MapComponent() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // normalize & filter coordinates once
  const validEvents = events
    .map((evt) => {
      // try both possible key names
      const rawLat = evt.lat ?? evt.latitude;
      const rawLng = evt.lng ?? evt.longitude;

      const lat = parseFloat(rawLat);
      const lng = parseFloat(rawLng);

      return { ...evt, lat, lng };
    })
    .filter((evt) => !isNaN(evt.lat) && !isNaN(evt.lng));

  return (
    <>
      <MapContainer
        center={[35.308767, -80.733780]}
        zoom={17}
        style={{ height: "100%", width: "100%" }}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={1.0}
        maxZoom={18}
        minZoom={2}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {validEvents.map((evt, i) => (
          <Marker
            key={i}
            position={[evt.lat, evt.lng]}
            eventHandlers={{
              click: () => setSelectedEvent(evt),
            }}
          />
        ))}
      </MapContainer>

      <Drawer
        anchor="right"
        open={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      >
        <Box p={2} width={300}>
          {selectedEvent && (
            <>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">
                  {selectedEvent.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setSelectedEvent(null)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              <Typography variant="body2" gutterBottom>
                {new Date(selectedEvent.start).toLocaleString()} –{" "}
                {new Date(selectedEvent.end).toLocaleString()}
              </Typography>
              <Typography variant="body2" paragraph>
                {selectedEvent.description}
              </Typography>
              <Typography variant="body2">
                <strong>Location:</strong> {selectedEvent.location}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Host:</strong> {selectedEvent.host}
              </Typography>

              <Box mt={2} display="flex" flexDirection="column" gap={1}>
                <Link href={selectedEvent.url} target="_blank">
                  View Event Page
                </Link>
                <Link href={selectedEvent.ical} target="_blank">
                  Add to Calendar (iCal)
                </Link>
                <Link href={selectedEvent.gcal} target="_blank">
                  Add to Calendar (Google)
                </Link>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}
