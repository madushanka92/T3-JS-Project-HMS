import React, { useState, useEffect } from "react";
import { roleService } from "../../_services/apiService";
import { useNavigate } from "react-router-dom";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [mode, setMode] = useState("create");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // all roles
  useEffect(() => {
    roleService
      .getAllRoles()
      .then((response) => setRoles(response.data))
      .catch((err) => setError("Failed to load roles."));
  }, []);

  // Save new or edited role
  const handleSaveRole = () => {
    if (roleName.trim()) {
      const roleData = { roleName };

      if (mode === "create") {
        // New role
        roleService
          .createRole(roleData)
          .then(() => {
            setRoles((prevRoles) => [...prevRoles, { roleName }]);
            setRoleName("");
          })
          .catch(() => setError("Failed to add role."));
      } else if (mode === "edit" && selectedRole) {
        // Edit existing role
        roleService
          .updateRole(selectedRole._id, roleData)
          .then(() => {
            setRoles((prevRoles) =>
              prevRoles.map((role) =>
                role._id === selectedRole._id ? { ...role, roleName } : role
              )
            );
            setRoleName("");
            setSelectedRole(null);
            setMode("create");
          })
          .catch(() => setError("Failed to update role."));
      }
    }
  };

  // Edit button click
  const handleEditRole = (role) => {
    setSelectedRole(role);
    setRoleName(role.roleName);
    setMode("edit"); // Switch to edit mode
  };

  // Delete button click
  const handleDeleteRole = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      roleService
        .deleteRole(id)
        .then(() => {
          setRoles((prevRoles) => prevRoles.filter((role) => role._id !== id));
          setError("");
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            setError(error.response.data.message); // Display backend error message
          } else {
            setError("Failed to delete role.");
          }
        });
    }
  };

  // Cancel button click (reset state)
  const handleCancel = () => {
    setRoleName("");
    setSelectedRole(null);
    setMode("create");
  };

  return (
    <div className="container">
      <h2 className="text-start">
        {mode === "create" ? "Create" : "Edit"} Role
      </h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="form-group mb-3">
        <label htmlFor="roleName">Role Name</label>
        <input
          type="text"
          id="roleName"
          className="form-control"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="Enter role name"
        />
        <button className="btn btn-primary mt-2" onClick={handleSaveRole}>
          {mode === "create" ? "Add Role" : "Update Role"}
        </button>
        {mode === "edit" && (
          <button
            className="btn btn-secondary mt-2 ml-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role._id}>
              <td>{role.roleName}</td>
              <td>
                <button
                  className="btn btn-warning mr-3"
                  onClick={() => handleEditRole(role)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteRole(role._id)}
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

export default RolesPage;
