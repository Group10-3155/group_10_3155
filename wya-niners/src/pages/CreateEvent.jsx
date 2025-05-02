import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import Sidebar from "../components/Sidebar.jsx";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import buildingLocations from "../data/buildingLocations.json";
import api from "../api.js";
import { useNavigate } from "react-router";

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [host, setHost] = useState("");
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [eventPhoto, setEventPhoto] = useState(null);
  const [eventPhotoName, setEventPhotoName] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventPhoto(file);
      setEventPhotoName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", eventName);
      formData.append("host_organization", host);
      formData.append("date", date?.toDate().toISOString().split("T")[0]);
      formData.append("start_time", startTime?.format("HH:mm:ss"));
      formData.append("end_time", endTime?.format("HH:mm:ss"));
      formData.append("location", location);
      formData.append("description", description);
      if (eventPhoto) {
        formData.append("event_photo", eventPhoto);
      }

      const res = await api.post("/api/events/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/browse");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1">Create Event</Typography>

        {loading && <CircularProgress />}

        <Box component="form" sx={{ width: "50%" }}>
          <Typography variant="h6">Event Photo</Typography>
          <Box
            sx={{
              border: "1px solid #C4C4C4",
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 80,
              position: "relative",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0, // Makes it invisible but still functional
                cursor: "pointer",
              }}
            />
            <PhotoCameraIcon />
            <Typography>Upload Photo</Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            {eventPhotoName && (
              <Typography sx={{ fontStyle: "italic" }}>
                Selected File: {eventPhotoName}
              </Typography>
            )}
          </Box>

          {/* Event Name */}
          <label htmlFor="event-name">
            <Typography variant="h6">Event Name</Typography>
          </label>
          <TextField
            placeholder="Enter event name"
            id="event-name"
            sx={{ width: "100%", mb: 1 }}
            size="small"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          ></TextField>

          {/* Host Organization */}
          <label htmlFor="host-name">
            <Typography variant="h6">Host</Typography>
          </label>
          <TextField
            placeholder="Enter host organization"
            id="host-name"
            sx={{ width: "100%", mb: 1 }}
            size="small"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          ></TextField>

          {/* Date, Start Time, End Time Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mb: 1,
            }}
          >
            {/* Date Section */}
            <Box sx={{ width: "33%" }}>
              <Typography variant="h6">Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Box>

            {/* Start Time */}
            <Box sx={{ width: "33%", px: 2 }}>
              <Typography variant="h6">Start Time</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={startTime}
                  onChange={(newStartTime) => setStartTime(newStartTime)}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Box>

            {/* End Time */}
            <Box sx={{ width: "33%" }}>
              <Typography variant="h6">End Time</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={endTime}
                  onChange={(newEndTime) => setEndTime(newEndTime)}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Box>
          </Box>

          {/* Location */}
          <label htmlFor="location">
            <Typography variant="h6">Location</Typography>
          </label>
          <TextField
            id="location"
            sx={{ width: "100%", mb: 1 }}
            size="small"
            select
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          >
            <MenuItem disabled value="">
              Choose location
            </MenuItem>
            {buildingLocations.buildings.map((building, index) => (
              <MenuItem key={index} value={building.name}>
                {building.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Description */}
          <label>
            <Typography variant="h6">Description</Typography>
          </label>
          <TextField
            placeholder="Add event description"
            id="event-name"
            sx={{ width: "100%", mb: 1 }}
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></TextField>
          <Button onClick={handleSubmit} variant="contained">
            Create Event
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
