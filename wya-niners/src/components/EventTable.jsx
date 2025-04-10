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

function createData(name, date, time, building, organization) {
  return { name, date, time, building, organization };
}

// Placeholder data
const rows = [
  createData("Event 1", "01/01/25", "0:00PM", "Student Union", "UNCC"),
  createData("Event 2", "01/01/25", "0:00PM", "Student Union", "UNCC"),
  createData("Event 3", "01/01/25", "0:00PM", "Student Union", "UNCC"),
  createData("Event 4", "01/01/25", "0:00PM", "Student Union", "UNCC"),
  createData("Event 5", "01/01/25", "0:00PM", "Student Union", "UNCC"),
  createData("Event 6", "01/01/25", "0:00PM", "Student Union", "UNCC"),
  createData("Event 7", "01/01/25", "0:00PM", "Student Union", "UNCC"),
  createData("Event 8", "01/01/25", "0:00PM", "Student Union", "UNCC"),
];

export default function EventTable() {
  const theme = useTheme();

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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                {row.name}
              </TableCell>
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
