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

export default function EventTable({
  events,
  searchQuery,
  dateFilter,
  sortOrder,
}) {
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

    const dateObj = event.date
      ? new Date(event.date + "T12:00:00") // force noon local time
      : start;
    const formattedDate = `${
      dateObj.getMonth() + 1
    }/${dateObj.getDate()}/${dateObj.getFullYear().toString().slice(-2)}`;

    const eventIdFromUrl = event.url ? event.url.split("/").pop() : null;

    return {
      id: eventIdFromUrl ?? event.id ?? `${startISO}-${endISO}`,
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
        const allEvents = [...backendEvents, ...(events || [])];
        setRows(allEvents.map(formatEvent));
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setRows((events || []).map(formatEvent));
      }
    };

    fetchAndCombineEvents();
  }, [searchQuery, events]);

  const filterRowsByDate = (rows) => {
    if (dateFilter === "all") return rows;

    const now = new Date();
    return rows.filter((r) => {
      const [month, day, year] = r.date.split("/").map(Number);
      const eventDate = new Date(`20${year}`, month - 1, day);
      if (dateFilter === "today") {
        return eventDate.toDateString() === now.toDateString();
      }
      if (dateFilter === "thisWeek") {
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(now.getDate() + 7);
        return eventDate >= now && eventDate <= oneWeekFromNow;
      }
      return true;
    });
  };

  const sortRows = (rows) => {
    return [...rows].sort((a, b) => {
      const dateA = new Date(a.date + " " + a.time.split("–")[0]);
      const dateB = new Date(b.date + " " + b.time.split("–")[0]);

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const filteredRows = sortRows(filterRowsByDate(rows));

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
          {filteredRows.map((r) => (
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
