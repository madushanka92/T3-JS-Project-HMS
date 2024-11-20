import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For accessing the user ID from the route
import { userService } from "../_services/apiService"; // Import the userService

const UserProfile = () => {
  const { id } = useParams(); // Get the user ID from the route
  const [user, setUser] = useState(null); // Store user data
  const [editMode, setEditMode] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getUserById(id); // Use the userService API
        setUser(response.data); // Set the fetched user data
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          contactNumber: response.data.contactNumber || "",
          address: response.data.address || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await userService.updateUser(id, formData); // Use the userService API
      setUser(response.data); // Update the user data
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h1>User Profile</h1>
      <div className="card mt-4">
        <div className="card-header d-flex justify-content-between">
          <h2>{editMode ? "Edit Profile" : "Profile Details"}</h2>
          {!editMode && (
            <button
              className="btn btn-primary"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
          <div className="mb-3">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
          <div className="mb-3">
            <label>Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              className="form-control"
              value={formData.contactNumber}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <textarea
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!editMode}
            ></textarea>
          </div>
          {editMode && (
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
