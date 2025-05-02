import { Box, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationPinIcon from "@mui/icons-material/LocationPin";

export default function Event() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/events/${eventId}/`);
        setEvent(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        {event ? (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                {event.event_photo && (
                  <Box
                    component="img"
                    src={event.event_photo_url}
                    alt="Event"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  pr: 2,
                }}
              >
                <Typography variant="h2">{event.title}</Typography>
                <Typography sx={{ mb: 2 }} variant="h5">
                  Hosted by: {event.host_organization}
                </Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Details
                </Typography>
                <Typography variant="h6">
                  <EventIcon />{" "}
                  {new Date(event.date + "T12:00:00").toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </Typography>
                <Typography variant="h6">
                  <AccessTimeIcon />{" "}
                  {new Date(
                    `1970-01-01T${event.start_time}`
                  ).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  -{" "}
                  {new Date(`1970-01-01T${event.end_time}`).toLocaleTimeString(
                    [],
                    {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </Typography>
                <Typography sx={{ mb: 2 }} variant="h6">
                  <LocationPinIcon /> {event.location}
                </Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Description
                </Typography>
                <Typography>{event.description}</Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography sx={{ p: 4 }}>Loading event...</Typography>
        )}
      </Box>
    </Box>
  );
}
