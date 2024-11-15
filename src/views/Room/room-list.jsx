import React, { useEffect, useState } from "react";
import { roomService } from "../../_services/apiService";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    roomService
      .getAllRooms()
      .then((response) => setRooms(response.data))
      .catch(() => setError("Failed to load rooms."));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      roomService
        .deleteRoom(id)
        .then(() => setRooms((prev) => prev.filter((room) => room._id !== id)))
        .catch(() => setError("Failed to delete room."));
    }
  };

  return (
    <div className="container">
      <h2 className="text-start">Room List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/rooms/create")}
      >
        Add Room
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Status</th>
            <th>Floor Number</th>
            <th>Daily Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.roomNumber}</td>
              <td>{room.roomType}</td>
              <td>{room.availabilityStatus}</td>
              <td>{room.floorNumber}</td>
              <td>{room.dailyRate}</td>
              <td>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => navigate(`/rooms/edit/${room._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(room._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;
