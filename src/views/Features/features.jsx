import React, { useState, useEffect } from "react";
import { featureService } from "../../_services/apiService";

const FeaturePage = () => {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({
    featureName: "",
    description: "",
  });
  const [editFeature, setEditFeature] = useState(null);

  const [error, setError] = useState(""); // To store error messages
  const [successMessage, setSuccessMessage] = useState(""); // To store success messages

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await featureService.getAllFeatures();
        setFeatures(response.data);
      } catch (error) {
        console.error("Error fetching features", error);
      }
    };

    fetchFeatures();
  }, []);

  const handleAddFeature = async () => {
    try {
      await featureService.createFeature(newFeature);
      setNewFeature({ featureName: "", description: "" }); // Clear the input fields
      const response = await featureService.getAllFeatures(); // Refresh the list
      setFeatures(response.data);
    } catch (error) {
      console.error("Error creating feature", error);
    }
  };

  const handleEditFeature = (feature) => {
    setEditFeature(feature);
    setNewFeature({
      featureName: feature.featureName,
      description: feature.description,
    });
  };

  const handleUpdateFeature = async () => {
    try {
      await featureService.updateFeature(editFeature._id, newFeature);
      setNewFeature({ featureName: "", description: "" }); // Clear input fields
      setEditFeature(null); // Clear the edit state
      const response = await featureService.getAllFeatures(); // Refresh the list
      setFeatures(response.data);
    } catch (error) {
      console.error("Error updating feature", error);
    }
  };

  const handleDeleteFeature = async (id) => {
    try {
      await featureService.deleteFeature(id);
      const response = await featureService.getAllFeatures(); // Refresh the list

      setSuccessMessage("Feature deleted successfully.");
      setError("");
      setFeatures(response.data);
    } catch (error) {
      console.error("Error deleting feature", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while deleting the feature.");
      }
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="container mt-4">
      <h1>Manage Features</h1>
      <div className="card mt-4">
        <div className="card-header">
          <h2>{editFeature ? "Edit Feature" : "Add New Feature"}</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={newFeature.featureName}
              placeholder="Feature Name"
              onChange={(e) =>
                setNewFeature({ ...newFeature, featureName: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={newFeature.description}
              placeholder="Description"
              onChange={(e) =>
                setNewFeature({ ...newFeature, description: e.target.value })
              }
            ></textarea>
          </div>

          <div className="d-flex justify-content-end">
            {editFeature ? (
              <button className="btn btn-warning" onClick={handleUpdateFeature}>
                Update Feature
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleAddFeature}>
                Add Feature
              </button>
            )}
          </div>
        </div>
      </div>
      <h3 className="mt-4">Features List</h3>
      {error && <div className="alert alert-danger">{error}</div>}{" "}
      {/* Display error message */}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}{" "}
      {/* Display success message */}
      <div className="list-group">
        {features.map((feature) => (
          <div
            className="list-group-item d-flex justify-content-between align-items-center"
            key={feature._id}
          >
            <div>
              <strong>{feature.featureName}</strong>
              <p>{feature.description}</p>
            </div>
            <div>
              <button
                className="btn btn-secondary btn-sm mx-2"
                onClick={() => handleEditFeature(feature)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteFeature(feature._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturePage;
