import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function EventTable({ events, searchQuery }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const formatEvent = (event) => {
    const startISO = event.start_time
      ? `1970-01-01T${event.start_time}`
      : event.start;
    const endISO = event.end_time ? `1970-01-01T${event.end_time}` : event.end;
    const start = new Date(startISO);
    const end = new Date(endISO);

    const dateObj = event.date ? new Date(event.date) : start;
    const formattedDate = `${
      dateObj.getMonth() + 1
    }/${dateObj.getDate()}/${dateObj.getFullYear().toString().slice(-2)}`;

    // Extract event ID from URL
    const eventIdFromUrl = event.url ? event.url.split("/").pop() : null;

    return {
      id: eventIdFromUrl ?? event.id ?? `${startISO}-${endISO}`, // Prefer the ID from URL
      name: event.title ?? event.name ?? "Untitled",
      date: formattedDate,
      time: `${start.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })} – ${end.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}`,
      building: event.location,
      organization: event.host_organization ?? event.host ?? "",
    };
  };

  useEffect(() => {
    const fetchAndCombineEvents = async () => {
      try {
        const qp = searchQuery ? `?search=${searchQuery}` : "";
        const res = await api.get(`/api/search/${qp}`);
        const backendEvents = res.data;

        // Combine backend + local JSON events
        const allEvents = [...backendEvents, ...(events || [])];
        setRows(allEvents.map(formatEvent));
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setRows((events || []).map(formatEvent)); // fallback to local JSON only
      }
    };

    fetchAndCombineEvents();
  }, [searchQuery]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="events table">
        <TableHead>
          <TableRow>
            {["Event", "Date", "Time", "Building", "Organization"].map(
              (h, i) => (
                <TableCell
                  key={i}
                  align={i === 0 ? "left" : "right"}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {h}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow
              key={r.id}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/events/${r.id}`)}
            >
              <TableCell sx={{ fontWeight: "bold", width: "15%" }}>
                {r.name}
              </TableCell>
              <TableCell align="right" sx={{ width: "10%" }}>
                {r.date}
              </TableCell>
              <TableCell align="right" sx={{ width: "20%" }}>
                {r.time}
              </TableCell>
              <TableCell align="right" sx={{ width: "25%" }}>
                {r.building}
              </TableCell>
              <TableCell align="right" sx={{ width: "30%" }}>
                {r.organization}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
