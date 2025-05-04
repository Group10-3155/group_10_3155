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

function HeatmapControl({ showHeatmap, setShowHeatmap }) {
  const map = useMap();
  useEffect(() => {
    const Control = L.Control.extend({
      options: { position: "topright" },
      onAdd() {
        const container = L.DomUtil.create("div", "leaflet-control-heatmap");
        Object.assign(container.style, {
          backgroundColor: "white",
          padding: "6px",
          borderRadius: "4px",
          boxShadow: "0 1px 5px rgba(0,0,0,0.4)",
        });
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = showHeatmap;
        input.style.marginRight = "8px";
        input.addEventListener("change", (e) =>
          setShowHeatmap(e.target.checked)
        );
        const label = document.createElement("label");
        Object.assign(label.style, {
          display: "flex",
          alignItems: "center",
          margin: 0,
          cursor: "pointer",
        });
        label.appendChild(input);
        label.appendChild(document.createTextNode("Heatmap"));
        container.appendChild(label);
        L.DomEvent.disableClickPropagation(container);
        return container;
      },
    });
    const control = new Control();
    map.addControl(control);
    return () => map.removeControl(control);
  }, [map, showHeatmap, setShowHeatmap]);
  return null;
}

function HeatmapLayer({
  points,
  visible,
  radius = 25,
  blur = 15,
  max = 1.0,
  gradient,
}) {
  const map = useMap();
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      map.removeLayer(ref.current);
      ref.current = null;
    }
    if (visible) {
      const data = points.map((p) => [p.lat, p.lng, p.intensity || 1]);
      ref.current = L.heatLayer(data, { radius, blur, max, gradient }).addTo(
        map
      );
    }
    return () => ref.current && map.removeLayer(ref.current);
  }, [map, points, visible, radius, blur, max, gradient]);
  return null;
}

export default function MapComponent({
  events,
  selectedEvent,
  setSelectedEvent,
  setShowHeatmap,
  showHeatmap,
}) {
  // prepare coordinates
  const valid = events
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
        <HeatmapControl
          showHeatmap={showHeatmap}
          setShowHeatmap={setShowHeatmap}
        />
        <HeatmapLayer
          points={valid.map(({ lat, lng }) => ({ lat, lng }))}
          visible={showHeatmap}
          gradient={{ 0.4: "blue", 0.6: "lime", 0.8: "yellow", 1.0: "red" }}
        />
        {valid.map((evt, i) => (
          <Marker
            key={i}
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
