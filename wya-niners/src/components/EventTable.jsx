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

export default function EventTable({ searchQuery }) {
  const theme = useTheme();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParam = searchQuery ? `?search=${searchQuery}` : "";
        const response = await api.get(`/api/search/${queryParam}`);
        const formatted = response.data.map((event) => {
          const start = new Date(`1970-01-01T${event.start_time}`);
          const end = new Date(`1970-01-01T${event.end_time}`);
          const dateObj = new Date(event.date);

          const formattedDate = `${
            dateObj.getMonth() + 1
          }/${dateObj.getDate()}/${dateObj.getFullYear().toString().slice(-2)}`;

          return {
            name: event.title,
            date: formattedDate,
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
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

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
