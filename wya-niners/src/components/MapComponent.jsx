// src/components/MapComponent.jsx
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// (Still here, but no longer used in the render)
function HeatmapControl({ showHeatmap, setShowHeatmap }) {
  // …definition left intact…
  return null;
}

function HeatmapLayer({
  points,
  visible,
  radius = 25,
  blur = 15,
  max = 1.0,
  gradient = { 0.4: "blue", 0.6: "lime", 0.8: "yellow", 1.0: "red" },
}) {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }
    if (visible) {
      const data = points.map((p) => [p.lat, p.lng, p.intensity || 1]);
      layerRef.current = L.heatLayer(data, { radius, blur, max, gradient }).addTo(map);
    }
    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [map, points, visible, radius, blur, max, gradient]);

  return null;
}

export default function MapComponent({
  events,
  selectedEvent,
  setSelectedEvent,
  showHeatmap,      // passed in from your top-bar toggle
}) {
  const validEvents = events
    .map((evt) => {
      const lat = parseFloat(evt.lat ?? evt.latitude);
      const lng = parseFloat(evt.lng ?? evt.longitude);
      return isNaN(lat) || isNaN(lng) ? null : { ...evt, lat, lng };
    })
    .filter(Boolean);

  return (
    <>
      <MapContainer
        center={[35.308767, -80.73378]}
        zoom={17}
        style={{ height: "100%", width: "100%" }}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={1.0}
        minZoom={2}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* no more HeatmapControl here */}

        <HeatmapLayer
          points={validEvents.map(({ lat, lng }) => ({ lat, lng }))}
          visible={showHeatmap}
        />

        {validEvents.map((evt, idx) => (
          <Marker
            key={idx}
            position={[evt.lat, evt.lng]}
            eventHandlers={{ click: () => setSelectedEvent(evt) }}
          />
        ))}
      </MapContainer>

      <Drawer
        anchor="right"
        open={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      >
        {selectedEvent && (
          <Box p={2} width={300}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">{selectedEvent.name}</Typography>
              <IconButton size="small" onClick={() => setSelectedEvent(null)}>
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
              <MuiLink href={selectedEvent.url} target="_blank">
                View Event Page
              </MuiLink>
              <MuiLink href={selectedEvent.ical} target="_blank">
                Add to Calendar (iCal)
              </MuiLink>
              <MuiLink href={selectedEvent.gcal} target="_blank">
                Add to Calendar (Google)
              </MuiLink>
            </Box>
          </Box>
        )}
      </Drawer>
    </>
  );
}
