import React, { useState, useEffect } from "react";
import { userService } from "../../_services/apiService";
import { useNavigate } from "react-router-dom";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch users on component mount
  useEffect(() => {
    userService
      .getAllUsers()
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with all users
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      });
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter users based on the search term
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        (user.departmentId?.departmentName || "").toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const handleEdit = (userId) => {
    navigate(`/users/edit/${userId}`);
  };

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      userService
        .deleteUser(userId)
        .then(() => {
          // After deleting, remove the user from the list without re-fetching
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
          setFilteredUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
          setError("Failed to delete the user.");
        });
    }
  };

  return (
    <div className="container user-list">
      <h2 className="text-start">All Users</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Search Field */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email, or department"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.roleId?.roleName}</td>
              <td>{user.departmentId?.departmentName}</td>
              <td>{user.contactNumber}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
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

export default UserListPage;
