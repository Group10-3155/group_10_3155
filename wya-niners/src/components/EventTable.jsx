import { useEffect, useState } from "react";
import api from "../api";
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

export default function EventTable() {
  const theme = useTheme();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api
      .get("/api/events/")
      .then((response) => {
        const formatted = response.data.map((event) => {
          const start = new Date(`1970-01-01T${event.start_time}Z`);
          const end = new Date(`1970-01-01T${event.end_time}Z`);

          return {
            name: event.title,
            date: event.date,
            time: `${start.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })} - ${end.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}`,
            building: event.location,
            organization: event.host_organization,
          };
        });

        setRows(formatted);
      })
      .catch((error) => {
        console.error("Failed to fetch events:", error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Events
            </TableCell>
            <TableCell
              align="right"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Date
            </TableCell>
            <TableCell
              align="right"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Time
            </TableCell>
            <TableCell
              align="right"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Building
            </TableCell>
            <TableCell
              align="right"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Organization
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={{ fontWeight: "bold" }}>{row.name}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.building}</TableCell>
              <TableCell align="right">{row.organization}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
