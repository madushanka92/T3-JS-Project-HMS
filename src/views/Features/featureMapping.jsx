import React, { useState, useEffect } from "react";
import {
  featureMappingService,
  roleService,
  featureService,
} from "../../_services/apiService";

const FeatureMappingPage = () => {
  const [featureMappings, setFeatureMappings] = useState([]);
  const [roles, setRoles] = useState([]);
  const [features, setFeatures] = useState([]);
  const [newMapping, setNewMapping] = useState({
    roleId: "",
    featureId: "",
    canCreate: false,
    canRead: true,
    canUpdate: false,
    canDelete: false,
  });
  const [editMapping, setEditMapping] = useState(null); // Track the mapping being edited

  useEffect(() => {
    const fetchFeatureMappings = async () => {
      try {
        const response = await featureMappingService.getAllMappings();
        setFeatureMappings(response.data);
      } catch (error) {
        console.error("Error fetching feature mappings", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await roleService.getAllRoles();
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles", error);
      }
    };

    const fetchFeatures = async () => {
      try {
        const response = await featureService.getAllFeatures();
        setFeatures(response.data);
      } catch (error) {
        console.error("Error fetching features", error);
      }
    };

    fetchFeatureMappings();
    fetchRoles();
    fetchFeatures();
  }, []);

  const handleAddMapping = async () => {
    if (!newMapping.roleId || !newMapping.featureId) {
      alert("Please select both Role and Feature.");
      return;
    }

    try {
      if (editMapping) {
        // Update existing mapping
        await featureMappingService.updateMapping(editMapping._id, newMapping);
        setEditMapping(null); // Reset edit mode
      } else {
        // Create new mapping
        await featureMappingService.createMapping(newMapping);
      }

      setNewMapping({
        roleId: "",
        featureId: "",
        canCreate: false,
        canRead: true,
        canUpdate: false,
        canDelete: false,
      });

      const response = await featureMappingService.getAllMappings();
      setFeatureMappings(response.data);
    } catch (error) {
      console.error("Error saving feature mapping", error);
    }
  };

  const handleDeleteMapping = async (id) => {
    try {
      await featureMappingService.deleteMapping(id);
      const response = await featureMappingService.getAllMappings();
      setFeatureMappings(response.data);
    } catch (error) {
      console.error("Error deleting feature mapping", error);
    }
  };

  const handleEditMapping = (mapping) => {
    setEditMapping(mapping); // Set the mapping to edit
    setNewMapping({
      roleId: mapping.roleId._id,
      featureId: mapping.featureId._id,
      canCreate: mapping.canCreate,
      canRead: mapping.canRead,
      canUpdate: mapping.canUpdate,
      canDelete: mapping.canDelete,
    });
  };

  return (
    <div className="container mt-4">
      <h1>Manage Feature Mappings</h1>
      <div className="mb-4">
        <h2>
          {editMapping ? "Edit Feature Mapping" : "Add New Feature Mapping"}
        </h2>
        <div className="mb-3">
          <select
            className="form-select"
            value={newMapping.roleId}
            onChange={(e) =>
              setNewMapping({ ...newMapping, roleId: e.target.value })
            }
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <select
            className="form-select"
            value={newMapping.featureId}
            onChange={(e) =>
              setNewMapping({ ...newMapping, featureId: e.target.value })
            }
            required
          >
            <option value="">Select Feature</option>
            {features.map((feature) => (
              <option key={feature._id} value={feature._id}>
                {feature.featureName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-check d-inline-flex mr-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={newMapping.canCreate}
            onChange={(e) =>
              setNewMapping({ ...newMapping, canCreate: e.target.checked })
            }
          />
          <label className="form-check-label">Can Create</label>
        </div>

        <div className="form-check d-inline-flex mr-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={newMapping.canRead}
            onChange={(e) =>
              setNewMapping({ ...newMapping, canRead: e.target.checked })
            }
          />
          <label className="form-check-label">Can Read</label>
        </div>

        <div className="form-check d-inline-flex mr-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={newMapping.canUpdate}
            onChange={(e) =>
              setNewMapping({ ...newMapping, canUpdate: e.target.checked })
            }
          />
          <label className="form-check-label">Can Update</label>
        </div>

        <div className="form-check d-inline-flex">
          <input
            type="checkbox"
            className="form-check-input"
            checked={newMapping.canDelete}
            onChange={(e) =>
              setNewMapping({ ...newMapping, canDelete: e.target.checked })
            }
          />
          <label className="form-check-label">Can Delete</label>
        </div>
        <br />
        <button className="btn btn-primary mt-3" onClick={handleAddMapping}>
          {editMapping ? "Update Mapping" : "Add Mapping"}
        </button>
      </div>

      <h3>Feature Mappings</h3>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Role</th>
            <th>Feature</th>
            <th>Create</th>
            <th>Read</th>
            <th>Update</th>
            <th>Delete</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {featureMappings.map((mapping) => (
            <tr key={mapping._id}>
              <td>{mapping.roleId.roleName}</td>
              <td>{mapping.featureId.featureName}</td>
              <td>{mapping.canCreate ? "Yes" : "No"}</td>
              <td>{mapping.canRead ? "Yes" : "No"}</td>
              <td>{mapping.canUpdate ? "Yes" : "No"}</td>
              <td>{mapping.canDelete ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditMapping(mapping)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDeleteMapping(mapping._id)}
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

export default FeatureMappingPage;
