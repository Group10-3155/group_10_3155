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

export default function EventTable({ events, searchQuery }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const formatEvent = (event) => {
    // normalize start/end
    const startISO = event.start_time
      ? `1970-01-01T${event.start_time}`
      : event.start;
    const endISO = event.end_time
      ? `1970-01-01T${event.end_time}`
      : event.end;
    const start = new Date(startISO);
    const end = new Date(endISO);

    // derive date
    const dateObj = event.date ? new Date(event.date) : start;
    const formattedDate = `${dateObj.getMonth() + 1}/${
      dateObj.getDate()
    }/${dateObj.getFullYear().toString().slice(-2)}`;

    return {
      id: event.id ?? startISO + endISO,
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
    if (events) {
      // use local JSON
      setRows(events.map(formatEvent));
    } else {
      // fallback: fetch from API if you still want searchQuery support
      (async () => {
        try {
          const qp = searchQuery ? `?search=${searchQuery}` : "";
          const res = await fetch(`/api/search/${qp}`);
          const data = await res.json();
          setRows(data.map(formatEvent));
        } catch (err) {
          console.error("Failed to fetch events:", err);
        }
      })();
    }
  }, [events, searchQuery]);

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
              <TableCell sx={{ fontWeight: "bold" }}>{r.name}</TableCell>
              <TableCell align="right">{r.date}</TableCell>
              <TableCell align="right">{r.time}</TableCell>
              <TableCell align="right">{r.building}</TableCell>
              <TableCell align="right">{r.organization}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
