import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  roleService,
  departmentService,
  userService,
} from "../../_services/apiService";

const UserRegistrationForm = ({ message, onSubmit }) => {
  const { userId } = useParams(); // Get userId from URL parameters
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: "",
    departmentId: "",
    contactNumber: "",
    address: "",
  });

  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch user data if we are in edit mode (userId exists in URL)
    if (userId) {
      userService
        .getUserById(userId)
        .then((response) => {
          let data = { ...response.data };
          data.roleId = response.data.roleId?._id;
          data.departmentId = response.data.departmentId?._id;
          setUserData(data);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }

    // Fetch roles and departments (can be done in parallel)
    roleService
      .getAllRoles()
      .then((response) => {
        setRoles(response.data);
      })
      .catch((err) => {
        console.log("Error fetching roles:", err);
      });

    departmentService
      .getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((err) => {
        console.log("Error fetching departments:", err);
      });
  }, [userId]); // Only run if userId changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userId) {
      // Update existing user
      userService
        .updateUser(userId, userData)
        .then((response) => {
          console.log("User updated successfully:", response);
          navigate("/users/list");
          if (onSubmit) {
            onSubmit(response);
          }
        })
        .catch((err) => {
          console.error("Error updating user:", err);
        });
    } else {
      // Create new user if no userId
      userService
        .createUser(userData)
        .then((response) => {
          console.log("User created successfully:", response);
          navigate("/users/list");
          if (onSubmit) {
            onSubmit(response);
          }
        })
        .catch((err) => {
          console.error("Error creating user:", err);
        });
    }
  };

  return (
    <div className="container">
      <h2 className="text-start">
        {userId ? "Edit User" : "User Registration Form"}
      </h2>

      {message && <p style={{ color: "red" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="form-control"
                value={userData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="form-control"
                value={userData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="form-control"
                value={userData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="form-control"
                value={userData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="roleId"
                required
                className="form-control"
                value={userData.roleId}
                onChange={handleChange}
              >
                <option value="">Select a role</option>
                {roles?.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.roleName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <select
                required
                id="department"
                name="departmentId"
                className="form-control"
                value={userData.departmentId}
                onChange={handleChange}
              >
                <option value="">Select a department</option>
                {departments?.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                className="form-control"
                value={userData.contactNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <textarea
                id="address"
                name="address"
                className="form-control"
                value={userData.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {userId ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
