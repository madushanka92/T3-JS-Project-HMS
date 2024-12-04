import React, { useState, useEffect } from "react";
import { roomService } from "../../_services/apiService";
import { useNavigate, useParams } from "react-router-dom";

const RoomForm = () => {
  const [room, setRoom] = useState({
    roomNumber: "",
    roomType: "General",
    availabilityStatus: "Available",
    floorNumber: "",
    dailyRate: "",
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      roomService
        .getRoomById(id)
        .then((response) => setRoom(response.data))
        .catch(() => setError("Failed to load room details."));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiCall = id
      ? roomService.updateRoom(id, room)
      : roomService.createRoom(room);

    apiCall
      .then(() => navigate("/rooms/list"))
      .catch(() => setError("Failed to save room details."));
  };

  return (
    <div className="container">
      <h2>{id ? "Edit Room" : "Add Room"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roomNumber">Room Number</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={room.roomNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomType">Room Type</label>
          <select
            id="roomType"
            name="roomType"
            value={room.roomType}
            onChange={handleChange}
            className="form-control"
          >
            <option value="ICU">ICU</option>
            <option value="General">General</option>
            <option value="VIP">VIP</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="availabilityStatus">Availability Status</label>
          <select
            id="availabilityStatus"
            name="availabilityStatus"
            value={room.availabilityStatus}
            onChange={handleChange}
            className="form-control"
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="floorNumber">Floor Number</label>
          <input
            type="number"
            id="floorNumber"
            name="floorNumber"
            value={room.floorNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dailyRate">Daily Rate</label>
          <input
            type="number"
            id="dailyRate"
            name="dailyRate"
            value={room.dailyRate}
            onChange={handleChange}
            className="form-control"
            min="0"
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          {id ? "Update Room" : "Create Room"}
        </button>
      </form>
    </div>
  );
};

export default RoomForm;
